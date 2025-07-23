"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Share2, Plus, Camera, MapPin, Calendar, Users, Grid3X3, Menu, ChevronDown, MoreVertical, Bookmark, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import clsx from "clsx"

interface Memory {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  category: string
  likes: number
  comments: number
  author: {
    name: string
    avatar: string
  }
  friends: string[]
  liked: boolean
}

// Add Cloudinary config at the top
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dinfslhp6/image/upload'; // Replace with your actual cloud name
const CLOUDINARY_PRESET = 'unsigned_preset';

async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);
  const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
  const data = await res.json();
  return data.secure_url;
}

export default function MemoryApp() {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/"
    }
  }, [status])
  const [memories, setMemories] = useState<Memory[]>([])
  const [loadingMemories, setLoadingMemories] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isAddingMemory, setIsAddingMemory] = useState(false)
  const [newMemory, setNewMemory] = useState({
    title: "",
    description: "",
    location: "",
    category: "Adventure",
    friends: "",
    image: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [reactorsOpen, setReactorsOpen] = useState<string | null>(null)
  const [selectedReactors, setSelectedReactors] = useState<any[]>([])
  // Add state for delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string | null, open: boolean }>({ id: null, open: false })
  // Add state for comment modal
  const [commentModal, setCommentModal] = useState<{ id: string | null, open: boolean }>({ id: null, open: false })
  const [comments, setComments] = useState<any[]>([])
  const [commentInput, setCommentInput] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)

  // Fetch memories from API
  useEffect(() => {
    async function fetchMemories() {
      setLoadingMemories(true)
      setError(null)
      try {
        const res = await fetch("/api/memories")
        if (!res.ok) throw new Error("Failed to fetch memories")
        const data = await res.json()
        setMemories(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoadingMemories(false)
      }
    }
    fetchMemories()
  }, [])

  // Update handleFileSelect to upload to Cloudinary
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // Upload to Cloudinary
      setImagePreview(null); // Optionally show a loading spinner
      const imageUrl = await uploadToCloudinary(file);
      setImagePreview(imageUrl);
      setNewMemory((prev) => ({ ...prev, image: imageUrl }));
      setSelectedFile(null);
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null)
    setImagePreview(null)
  }

  // In handleAddMemory, use newMemory.image (Cloudinary URL)
  const handleAddMemory = async () => {
    if (!newMemory.title.trim()) {
      alert("Please enter a title for your memory");
      return;
    }
    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newMemory.title,
          description: newMemory.description,
          image: newMemory.image || "/default-post.jpg",
          date: new Date().toISOString(),
          location: newMemory.location,
          category: newMemory.category,
          friends: newMemory.friends
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f),
        }),
      });
      if (!res.ok) throw new Error("Failed to add memory");
      const memory = await res.json();
      setMemories((prev) => [memory, ...prev]);
      setNewMemory({ title: "", description: "", location: "", category: "Adventure", friends: "", image: "" });
      resetFileInput();
      setIsAddingMemory(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/memories/${id}/like`, { method: "POST" })
      if (!res.ok) throw new Error("Failed to like memory")
      const data = await res.json()
      setMemories((prev) =>
        prev.map((memory) =>
          memory.id === id
            ? { ...memory, likes: data.likeCount, liked: data.liked }
            : memory
        )
      )
    } catch (e: any) {
      alert(e.message)
    }
  }

  const performDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/memories/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete memory")
      setMemories((prev) => prev.filter((m) => m.id !== id))
      setMenuOpen(null)
      setDeleteConfirm({ id: null, open: false })
    } catch (e: any) {
      alert(e.message)
    }
  }

  // Function to open comment modal and fetch comments
  const openCommentModal = async (id: string) => {
    setCommentModal({ id, open: true })
    setCommentLoading(true)
    try {
      const res = await fetch(`/api/memories/${id}/comment`)
      if (!res.ok) throw new Error("Failed to fetch comments")
      const data = await res.json()
      setComments(data)
    } catch (e: any) {
      setComments([])
    } finally {
      setCommentLoading(false)
    }
  }

  // Function to post a comment
  const postComment = async () => {
    if (!commentInput.trim() || !commentModal.id) return
    setCommentLoading(true)
    try {
      const res = await fetch(`/api/memories/${commentModal.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentInput })
      })
      if (!res.ok) throw new Error("Failed to post comment")
      const newComment = await res.json()
      setComments((prev) => [...prev, newComment])
      setCommentInput("")
    } catch (e: any) {
      // Optionally show error
    } finally {
      setCommentLoading(false)
    }
  }

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.relative')) setMenuOpen(null)
    }
    window.addEventListener("click", closeMenu)
    return () => window.removeEventListener("click", closeMenu)
  }, [])

  const getCategoryColor = (category: string) => {
    const colors = {
      Adventure: "bg-green-100 text-green-800",
      Celebration: "bg-purple-100 text-purple-800",
      Travel: "bg-blue-100 text-blue-800",
      Food: "bg-orange-100 text-orange-800",
      Sports: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/90 shadow-md border-b sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Left: Logo/Title */}
          <div className="flex items-center gap-3">
            <Camera className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Memories</h1>
          </div>
          {/* Center: Navigation */}
          {/* <nav className="hidden md:flex items-center gap-2">
            <Link href="/gallery">
              <Button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-none border border-blue-200">
                <Grid3X3 className="h-4 w-4" />
                <span>Gallery</span>
              </Button>
            </Link>
          </nav> */}
          {/* Right: Actions */}
          <div className="flex items-center gap-2 relative">
            <Button
              onClick={() => setIsAddingMemory(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-5 py-2 rounded-full shadow-md transition"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Memory</span>
            </Button>
            {session?.user ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={() => setUserMenuOpen((v) => !v)}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user.image || "/default-profile.png"} />
                    <AvatarFallback>{(session.user.name || session.user.email || "U")[0]}</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50 animate-fade-in">
                    <div className="px-4 py-2 text-gray-800 font-semibold border-b">{session.user.name || session.user.email}</div>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={async () => {
                        setUserMenuOpen(false)
                        await signOut({ callbackUrl: "/" })
                      }}
                    >
                      Logout
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => {
                        setUserMenuOpen(false)
                        alert("Settings coming soon!")
                      }}
                    >
                      Settings
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Add Memory Modal Dialog, rendered only when open */}
      {isAddingMemory && (
        <Dialog open={isAddingMemory} onOpenChange={setIsAddingMemory}>
          <DialogContent className="w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-4">
            <DialogHeader>
              <DialogTitle>Create New Memory</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your memory a title..."
                  value={newMemory.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMemory({ ...newMemory, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell the story behind this memory..."
                  value={newMemory.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMemory({ ...newMemory, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo</Label>
                <div className="space-y-3">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="relative">
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        <Image
                          src={imagePreview || "/default-post.jpg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={resetFileInput}
                        className="mt-2 bg-transparent"
                      >
                        Remove Photo
                      </Button>
                    </div>
                  )}
                  {!imagePreview && (
                    <div className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Select a photo to upload</p>
                        <p className="text-xs text-gray-400">Max size: 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Where did this happen?"
                  value={newMemory.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMemory({ ...newMemory, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newMemory.category}
                  onValueChange={(value: string) => setNewMemory({ ...newMemory, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Celebration">Celebration</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="friends">Friends (comma separated)</Label>
                <Input
                  id="friends"
                  placeholder="Who was with you?"
                  value={newMemory.friends}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMemory({ ...newMemory, friends: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMemory} className="w-full" disabled={!newMemory.title.trim()}>
                  Create Memory
                </Button>
                <Button
                  type="button"
                  className="w-full bg-gray-200 text-gray-700"
                  onClick={() => {
                    setIsAddingMemory(false);
                    setNewMemory({ title: "", description: "", location: "", category: "Adventure", friends: "", image: "" });
                    resetFileInput();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {loadingMemories ? (
            <div className="text-center text-gray-500 py-12">Loading memories...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : memories.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories yet</h3>
              <p className="text-gray-600 mb-4">Start capturing and sharing your special moments!</p>
              <Button onClick={() => setIsAddingMemory(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Memory
              </Button>
            </div>
          ) : (
            memories.map((memory) => (
            <Card key={memory.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-9 w-9 min-w-[2.25rem]">
                      <AvatarImage src={memory.author.avatar || "/default-profile.jpg"} />
                      <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-gray-900 truncate text-base sm:text-lg">{memory.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {session?.user?.name === memory.author.name && (
                      <div className="relative">
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                          onClick={e => { e.stopPropagation(); setMenuOpen(memory.id); }}
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                        {menuOpen === memory.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-50 animate-fade-in">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                              onClick={e => { e.stopPropagation(); setDeleteConfirm({ id: memory.id, open: true }); setMenuOpen(null); }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                        )}
                      </div>
                    </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(memory.date).toLocaleDateString()}</span>
                  </div>
                  {memory.location && (
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[8rem] sm:max-w-xs">{memory.location}</span>
                    </div>
                  )}
                  <Badge className={getCategoryColor(memory.category)}>{memory.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{memory.title}</h3>
                    <p className="text-gray-700">{memory.description}</p>
                  </div>

                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src={memory.image || "/default-post.jpg"} alt={memory.title} fill className="object-cover" />
                  </div>

                  {memory.friends && memory.friends.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">With {memory.friends.map((f: any) => f.name).join(", ")}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-4 mb-1">
                      <button
                        onClick={() => handleLike(memory.id)}
                        className="focus:outline-none"
                      >
                        {memory.liked ? (
                          <Heart className="h-6 w-6 text-red-600 fill-red-600" />
                        ) : (
                          <Heart className="h-6 w-6 text-gray-900 stroke-2" />
                        )}
                      </button>
                      <button className="focus:outline-none" onClick={() => openCommentModal(memory.id)}>
                        <MessageCircle className="h-6 w-6 text-gray-900" />
                      </button>
                      <button className="focus:outline-none">
                        <Share2 className="h-6 w-6 text-gray-900" />
                      </button>
                      <div className="flex-1" />
                      <button className="focus:outline-none">
                        <Bookmark className="h-6 w-6 text-gray-900" />
                      </button>
                    </div>
                    <div>
                      <span
                        className="font-bold text-gray-900 text-sm cursor-pointer hover:underline"
                        onClick={() => {
                          setSelectedReactors(Array.isArray(memory.likes) ? memory.likes.map((like: any) => like.user) : [])
                          setReactorsOpen(memory.id)
                        }}
                      >
                        {Array.isArray(memory.likes) ? memory.likes.length : memory.likes} likes
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </main>
      {reactorsOpen && (
        <Dialog open={!!reactorsOpen} onOpenChange={() => setReactorsOpen(null)}>
          <DialogContent className="max-w-xs relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setReactorsOpen(null)}
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
            <DialogHeader>
              <DialogTitle>Reactions</DialogTitle>
            </DialogHeader>
            <div className="divide-y divide-gray-200">
              {selectedReactors.length === 0 ? (
                <div className="text-gray-500 text-center py-4">No reactions yet.</div>
              ) : (
                selectedReactors.map((user, idx) => (
                  <div key={user.id || idx} className="flex items-center gap-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || "/default-profile.jpg"} />
                      <AvatarFallback>{user.name?.[0] || "?"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={deleteConfirm.open} onOpenChange={open => setDeleteConfirm(d => ({ ...d, open }))}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Delete Memory</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-gray-700">Are you sure you want to delete this memory? This action cannot be undone.</div>
          <div className="flex gap-2 mt-4">
            <Button className="w-full bg-gray-200 text-gray-700" onClick={() => setDeleteConfirm({ id: null, open: false })}>Cancel</Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (deleteConfirm.id) performDelete(deleteConfirm.id) }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={commentModal.open} onOpenChange={open => setCommentModal(d => ({ ...d, open }))}>
        <DialogContent
          className={clsx(
            "p-0 border-none bg-transparent shadow-none fixed inset-0 z-50 flex justify-center items-center",
            "min-h-screen min-w-full"
          )}
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {/* Desktop/tablet: true two-column layout, centered */}
          <div className="hidden md:flex w-full max-w-3xl h-[70vh] bg-white rounded-lg overflow-hidden shadow-lg mx-auto my-auto">
            {/* Left: Post Image */}
            <div className="w-1/2 h-full bg-black flex items-center justify-center">
              {(() => {
                const memory = memories.find(m => m.id === commentModal.id)
                if (!memory) return null
                return (
                  <Image src={memory.image || "/default-post.jpg"} alt={memory.title} width={600} height={600} className="object-contain max-h-full max-w-full" />
                )
              })()}
            </div>
            {/* Right: Comments/Meta */}
            <div className="w-1/2 h-full flex flex-col bg-white">
              <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b">
                <DialogTitle className="text-lg font-bold">Comments</DialogTitle>
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setCommentModal({ id: null, open: false })}
                  aria-label="Close"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Post meta/caption at the top */}
              {(() => {
                const memory = memories.find(m => m.id === commentModal.id)
                if (!memory) return null
                return (
                  <div className="flex items-center gap-2 px-4 py-3 border-b">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={memory.author.avatar || "/default-profile.jpg"} />
                      <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-base truncate">{memory.author.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{new Date(memory.date).toLocaleDateString()}</span>
                    <Badge className={getCategoryColor(memory.category)}>{memory.category}</Badge>
                  </div>
                )
              })()}
              {/* Comments */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                {commentLoading ? (
                  <div className="text-center text-gray-500 py-4">Loading...</div>
                ) : comments.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No comments yet.</div>
                ) : (
                  comments.map((c, idx) => (
                    <div key={c.id || idx} className="flex items-start gap-3">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={c.user?.image || "/default-profile.jpg"} />
                        <AvatarFallback>{c.user?.name?.[0] || "?"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{c.user?.name || "Unknown"}</div>
                        <div className="text-gray-700 text-sm">{c.text}</div>
                        <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t bg-white px-4 py-3 flex gap-2 sticky bottom-0">
                <Input
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1"
                  onKeyDown={e => { if (e.key === "Enter") postComment() }}
                />
                <Button onClick={postComment} disabled={commentLoading || !commentInput.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
          {/* Mobile: bottom sheet */}
          <div className="md:hidden w-full max-w-sm bg-white rounded-t-lg flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b">
              <DialogTitle className="text-lg font-bold">Comments</DialogTitle>
              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setCommentModal({ id: null, open: false })}
                aria-label="Close"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {commentLoading ? (
                <div className="text-center text-gray-500 py-4">Loading...</div>
              ) : comments.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No comments yet.</div>
              ) : (
                comments.map((c, idx) => (
                  <div key={c.id || idx} className="flex items-start gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={c.user?.image || "/default-profile.jpg"} />
                      <AvatarFallback>{c.user?.name?.[0] || "?"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{c.user?.name || "Unknown"}</div>
                      <div className="text-gray-700 text-sm">{c.text}</div>
                      <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t bg-white px-4 py-3 flex gap-2 sticky bottom-0">
              <Input
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
                onKeyDown={e => { if (e.key === "Enter") postComment() }}
              />
              <Button onClick={postComment} disabled={commentLoading || !commentInput.trim()}>
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 