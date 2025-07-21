"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Share2, Plus, Camera, MapPin, Calendar, Users, Grid3X3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
}

const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "Beach Day Adventure",
    description:
      "Perfect sunny day at the beach with the crew! Nothing beats good friends, good vibes, and endless laughter. 🏖️",
    image: "/default-post.jpg",
    date: "2024-01-15",
    location: "Santa Monica Beach",
    category: "Adventure",
    likes: 24,
    comments: 8,
    author: {
      name: "Alex Johnson",
      avatar: "/default-profile.jpg",
    },
    friends: ["Sarah", "Mike", "Emma"],
  },
  {
    id: "2",
    title: "Birthday Celebration",
    description: "Another year older, another year of amazing memories with these incredible people! 🎉",
    image: "/default-post.jpg",
    date: "2024-01-10",
    location: "Downtown Restaurant",
    category: "Celebration",
    likes: 42,
    comments: 15,
    author: {
      name: "Sarah Chen",
      avatar: "/default-profile.jpg",
    },
    friends: ["Alex", "Mike", "Emma", "Jake"],
  },
  {
    id: "3",
    title: "Hiking Adventure",
    description: "Conquered the mountain trail today! The view from the top was absolutely breathtaking. 🏔️",
    image: "/default-post.jpg",
    date: "2024-01-08",
    location: "Rocky Mountain Trail",
    category: "Adventure",
    likes: 31,
    comments: 12,
    author: {
      name: "Mike Rodriguez",
      avatar: "/default-profile.jpg",
    },
    friends: ["Alex", "Sarah"],
  },
]

export default function MemoryApp() {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories)
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

  const handleAddMemory = () => {
    if (!newMemory.title.trim()) {
      alert("Please enter a title for your memory")
      return
    }

    const memory: Memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      description: newMemory.description,
      image: imagePreview || "/default-post.jpg",
      date: new Date().toISOString().split("T")[0],
      location: newMemory.location,
      category: newMemory.category,
      likes: 0,
      comments: 0,
      author: {
        name: "You",
        avatar: "/default-profile.jpg",
      },
      friends: newMemory.friends
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
    }

    setMemories([memory, ...memories])
    setNewMemory({ title: "", description: "", location: "", category: "Adventure", friends: "" })
    resetFileInput()
    setIsAddingMemory(false)
  }

  const handleLike = (id: string) => {
    setMemories(memories.map((memory) => (memory.id === id ? { ...memory, likes: memory.likes + 1 } : memory)))
  }

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
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* LEFT GROUP: App title and Gallery button */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Camera className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Memories</h1>
              </div>
              <Link href="/gallery">
                <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
                  <Grid3X3 className="h-4 w-4" />
                  <span>Gallery</span>
                </Button>
              </Link>
            </div>
            {/* RIGHT GROUP: Add Memory button */}
            <Button
              onClick={() => setIsAddingMemory(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
            >
              <Plus className="h-4 w-4" />
              <span>Add Memory</span>
            </Button>
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
                          src={imagePreview || "/default-post.png"}
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
          {memories.map((memory) => (
            <Card key={memory.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={memory.author.avatar || "/default-profile.png"} />
                      <AvatarFallback>{memory.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{memory.author.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(memory.date).toLocaleDateString()}</span>
                        {memory.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{memory.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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

                  {memory.friends.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">With {memory.friends.join(", ")}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => handleLike(memory.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{memory.likes}</span>
                      </Button>
                      <Button className="flex items-center space-x-2 text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span>{memory.comments}</span>
                      </Button>
                    </div>
                    <Button className="text-gray-600">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {memories.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories yet</h3>
            <p className="text-gray-600 mb-4">Start capturing and sharing your special moments!</p>
            <Button onClick={() => setIsAddingMemory(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Memory
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
