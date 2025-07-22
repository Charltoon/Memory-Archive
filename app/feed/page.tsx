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
import { Heart, MessageCircle, Share2, Plus, Camera, MapPin, Calendar, Users, Grid3X3, Menu, ChevronDown, MoreVertical, ThumbsUp, Heart as HeartIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import ReactDOM from "react-dom";
import { useRef } from "react";

interface Memory {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  category: string
  likes: any[] // now an array of like objects
  comments: number
  author: {
    id: string
    name: string
    avatar: string
  }
  friends: string[]
  liked: boolean
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
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [popoverMemoryId, setPopoverMemoryId] = useState<string | null>(null);
  const [popoverHover, setPopoverHover] = useState(false);
  const popoverTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetFileInput = () => {
    setSelectedFile(null)
    setImagePreview(null)
  }

  const handleAddMemory = async () => {
    if (!newMemory.title.trim()) {
      alert("Please enter a title for your memory")
      return
    }
    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newMemory.title,
          description: newMemory.description,
          image: imagePreview || "/default-post.jpg",
          date: new Date().toISOString(),
          location: newMemory.location,
          category: newMemory.category,
          friends: newMemory.friends
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f),
        }),
      })
      if (!res.ok) throw new Error("Failed to add memory")
      const memory = await res.json()
      setMemories((prev) => [memory, ...prev])
      setNewMemory({ title: "", description: "", location: "", category: "Adventure", friends: "" })
      resetFileInput()
      setIsAddingMemory(false)
    } catch (e: any) {
      alert(e.message)
    }
  }

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

  // New: handle reaction (like/heart)
  const handleReact = async (id: string, type: "like" | "heart") => {
    try {
      const res = await fetch(`/api/memories/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) throw new Error("Failed to react");
      const data = await res.json();
      setMemories((prev) =>
        prev.map((memory) =>
          memory.id === id
            ? { ...memory, likes: data.reactors }
            : memory
        )
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

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

  // PortalTooltip component
  function PortalTooltip({ show, anchorRef, children }: { show: boolean, anchorRef: any, children: React.ReactNode }) {
    const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
    useEffect(() => {
      if (show && anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setCoords({ left: rect.left + rect.width / 2, top: rect.top });
      } else {
        setCoords(null);
      }
    }, [show, anchorRef]);
    if (!show || !coords) return null;
    return ReactDOM.createPortal(
      <div style={{
        position: 'fixed',
        left: Math.max(8, coords.left),
        top: Math.max(8, coords.top - 40),
        zIndex: 9999,
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }}>
        <div className="bg-gray-900 text-white text-xs rounded px-3 py-1 whitespace-nowrap shadow-lg pointer-events-auto">
          {children}
        </div>
        <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto mt-[-4px]"></div>
      </div>,
      document.body
    );
  }

  // ReactionBar component for Facebook-style reactions
  interface ReactionBarProps {
    memory: any;
    session: any;
    onReact: (id: string, type: "like" | "heart") => void;
    popoverMemoryId: string | null;
    setPopoverMemoryId: (id: string | null) => void;
  }
  // Reaction image map
  const REACTION_IMAGES: Record<string, string> = {
    like: '/Like.png',
    heart: '/Heart.png',
    haha: '/Haha.png',
    care: '/Care.png',
    wow: '/Wow.png',
    sad: '/Sad.png',
    angry: '/Angry.png',
  };
  const REACTION_LABELS: Record<string, string> = {
    like: 'Like',
    heart: 'Love',
    haha: 'Haha',
    care: 'Care',
    wow: 'Wow',
    sad: 'Sad',
    angry: 'Angry',
  };
  const REACTION_TYPES = ['like', 'heart', 'haha', 'care', 'wow', 'sad', 'angry'];
  function ReactionBar({ memory, session, onReact, popoverMemoryId, setPopoverMemoryId }: ReactionBarProps) {
    // Group reactors by type
    const reactorsByType: Record<string, any[]> = {};
    REACTION_TYPES.forEach(type => {
      reactorsByType[type] = memory.likes?.filter((l: any) => l.type === type) || [];
    });
    const totalCount = memory.likes?.length || 0;
    const userReaction = memory.likes?.find((l: any) => l.user?.id === (session?.user as any)?.id)?.type;

    // Helper to format names for tooltip
    const formatNames = (arr: any[]) => {
      if (arr.length === 0) return '';
      if (arr.length === 1) return arr[0].user?.name || 'Unknown';
      if (arr.length === 2) return `${arr[0].user?.name}, ${arr[1].user?.name}`;
      return `${arr[0].user?.name}, ${arr[1].user?.name} and ${arr.length - 2} more`;
    };

    const likeRef = useRef(null);
    const heartRef = useRef(null);
    const [showLikeTooltip, setShowLikeTooltip] = useState(false);
    const [showHeartTooltip, setShowHeartTooltip] = useState(false);

    // Add a ref for the Like button container
    const likeButtonRef = useRef<HTMLDivElement>(null);
    const [showReactionPopover, setShowReactionPopover] = useState(false);
    const [reactionPopoverCoords, setReactionPopoverCoords] = useState<{ left: number; top: number } | null>(null);

    return (
      <div className="border-t pt-0">
        <div className="flex items-center justify-between px-2 py-1">
          {/* Inline reaction icons and count */}
          <div className="flex items-center gap-1 relative">
            {REACTION_TYPES.map((type, idx) =>
              reactorsByType[type].length > 0 && (
                <div
                  key={type}
                  className="relative"
                  ref={type === 'like' ? likeRef : type === 'heart' ? heartRef : undefined}
                  onMouseEnter={() => {
                    if (type === 'like') setShowLikeTooltip(true);
                    if (type === 'heart') setShowHeartTooltip(true);
                  }}
                  onMouseLeave={() => {
                    if (type === 'like') setShowLikeTooltip(false);
                    if (type === 'heart') setShowHeartTooltip(false);
                  }}
                  onTouchStart={() => {
                    if (type === 'like') setShowLikeTooltip(v => !v);
                    if (type === 'heart') setShowHeartTooltip(v => !v);
                  }}
                  style={{ zIndex: 7 - idx }}
                >
                  <img
                    src={REACTION_IMAGES[type]}
                    alt={REACTION_LABELS[type]}
                    className={`w-8 h-8 rounded-full border-2 border-white shadow-sm -ml-3 first:ml-0 bg-white object-contain`}
                    draggable={false}
                  />
                  {type === 'like' && (
                    <PortalTooltip show={showLikeTooltip} anchorRef={likeRef}>
                      {formatNames(reactorsByType[type])}
                    </PortalTooltip>
                  )}
                  {type === 'heart' && (
                    <PortalTooltip show={showHeartTooltip} anchorRef={heartRef}>
                      {formatNames(reactorsByType[type])}
                    </PortalTooltip>
                  )}
                </div>
              )
            )}
            {totalCount > 0 && (
              <span className="ml-1 text-xs text-gray-600 font-medium select-none">{totalCount}</span>
            )}
          </div>
        </div>
        <div className="flex items-center divide-x divide-gray-200 border-t">
          {/* Like Button with Reaction Popover */}
          <div className="flex-1 flex justify-center">
            <div
              className="relative w-full flex justify-center"
              ref={likeButtonRef}
              onMouseEnter={() => {
                if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
                setPopoverMemoryId(memory.id);
                if (likeButtonRef.current) {
                  const rect = likeButtonRef.current.getBoundingClientRect();
                  setReactionPopoverCoords({ left: rect.left + rect.width / 2, top: rect.top });
                }
                setShowReactionPopover(true);
              }}
              onMouseLeave={() => {
                popoverTimeout.current = setTimeout(() => {
                  if (!popoverHover) {
                    setPopoverMemoryId(null);
                    setShowReactionPopover(false);
                  }
                }, 120);
              }}
              onTouchStart={() => {
                if (popoverMemoryId === memory.id) {
                  setPopoverMemoryId(null);
                  setShowReactionPopover(false);
                } else {
                  setPopoverMemoryId(memory.id);
                  if (likeButtonRef.current) {
                    const rect = likeButtonRef.current.getBoundingClientRect();
                    setReactionPopoverCoords({ left: rect.left + rect.width / 2, top: rect.top });
                  }
                  setShowReactionPopover(true);
                }
              }}
            >
              <button
                className={`w-full flex items-center justify-center gap-2 py-2 transition font-medium bg-transparent hover:bg-gray-100 rounded-none ${userReaction ? (userReaction === 'like' ? 'text-blue-600' : userReaction === 'heart' ? 'text-pink-600' : 'text-yellow-600') : 'text-gray-600'}`}
                aria-label="React"
                onClick={() => {
                  if (userReaction) {
                    // Undo the reaction
                    onReact(memory.id, userReaction);
                  } else {
                    // Default to like
                    onReact(memory.id, 'like');
                  }
                }}
              >
                {userReaction ? (
                  <img src={REACTION_IMAGES[userReaction]} alt={REACTION_LABELS[userReaction]} className="w-7 h-7 object-contain" />
                ) : (
                  <img src={REACTION_IMAGES['like']} alt="Like" className="w-7 h-7 object-contain" />
                )}
                <span className="text-sm font-semibold">{REACTION_LABELS[userReaction || 'like']}</span>
              </button>
              {/* Portal-based reaction popover */}
              {popoverMemoryId === memory.id && showReactionPopover && reactionPopoverCoords &&
                ReactDOM.createPortal(
                  <div
                    onMouseEnter={() => {
                      if (popoverTimeout.current) clearTimeout(popoverTimeout.current);
                      setPopoverHover(true);
                    }}
                    onMouseLeave={() => {
                      setPopoverHover(false);
                      popoverTimeout.current = setTimeout(() => {
                        setPopoverMemoryId(null);
                        setShowReactionPopover(false);
                      }, 120);
                    }}
                    style={{
                      position: 'fixed',
                      left: Math.max(8, reactionPopoverCoords.left),
                      top: Math.max(8, reactionPopoverCoords.top - 120),
                      zIndex: 9999,
                      transform: 'translateX(-50%)',
                      pointerEvents: 'auto',
                    }}
                  >
                    <div className="flex gap-5 bg-white border rounded-full shadow-lg px-6 py-4 animate-fade-in">
                      {REACTION_TYPES.map(type => (
                        <button
                          key={type}
                          className="hover:scale-125 focus:scale-125 transition-transform rounded-full p-1"
                          style={{ width: 72, height: 72 }}
                          onClick={() => { setPopoverMemoryId(null); setShowReactionPopover(false); onReact(memory.id, type as any); }}
                          aria-label={REACTION_LABELS[type]}
                        >
                          <img src={REACTION_IMAGES[type]} alt={REACTION_LABELS[type]} className="w-16 h-16 object-contain" />
                        </button>
                      ))}
                    </div>
                  </div>,
                  document.body
                )
              }
            </div>
          </div>
          {/* Comment Button */}
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-100 text-sm font-medium">
            <MessageCircle className="h-5 w-5" />
            <span>Comment</span>
          </button>
          {/* Share Button */}
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-100 text-sm font-medium">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    );
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
          <DialogContent className="sm:max-w-md">
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
                    setNewMemory({ title: "", description: "", location: "", category: "Adventure", friends: "" });
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
                  {/* Left: Avatar, Name, Date, Location */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar>
                      <AvatarImage src={memory.author.avatar || "/default-profile.jpg"} />
                      <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 truncate max-w-[120px]">{memory.author.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500 whitespace-nowrap">{new Date(memory.date).toLocaleDateString()}</span>
                        {memory.location && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap">
                              <MapPin className="h-3 w-3" />
                              {memory.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Right: Category badge and settings */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={getCategoryColor(memory.category)}>{memory.category}</Badge>
                    {session?.user && (session.user as any).id === memory.author.id && (
                      <div className="relative">
                        <button
                          className="ml-1 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          aria-label="Post options"
                          onClick={() => setOpenMenuId(openMenuId === memory.id ? null : memory.id)}
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                        {openMenuId === memory.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10 animate-fade-in">
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded"
                              onClick={async () => {
                                setOpenMenuId(null);
                                if (!confirm("Are you sure you want to delete this post?")) return;
                                await fetch(`/api/memories/${memory.id}`, { method: "DELETE" });
                                setMemories((prev) => prev.filter((m) => m.id !== memory.id));
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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

                  {/* Reaction Bar */}
                  <ReactionBar
                    memory={memory}
                    session={session}
                    onReact={handleReact}
                    popoverMemoryId={popoverMemoryId}
                    setPopoverMemoryId={setPopoverMemoryId}
                  />
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </main>
    </div>
  )
} 