"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Camera,
  Grid3X3,
  Calendar,
  MapPin,
  Search,
  Filter,
  Heart,
  Users,
  ArrowLeft,
  Sparkles,
  Clock,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
    image: "/placeholder.svg?height=400&width=600&text=Beach+Adventure",
    date: "2024-01-15",
    location: "Santa Monica Beach",
    category: "Adventure",
    likes: 24,
    comments: 8,
    author: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40&text=AJ" },
    friends: ["Sarah", "Mike", "Emma"],
  },
  {
    id: "2",
    title: "Birthday Celebration",
    description: "Another year older, another year of amazing memories with these incredible people! 🎉",
    image: "/placeholder.svg?height=400&width=600&text=Birthday+Party",
    date: "2024-01-10",
    location: "Downtown Restaurant",
    category: "Celebration",
    likes: 42,
    comments: 15,
    author: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC" },
    friends: ["Alex", "Mike", "Emma", "Jake"],
  },
  {
    id: "3",
    title: "Hiking Adventure",
    description: "Conquered the mountain trail today! The view from the top was absolutely breathtaking. 🏔️",
    image: "/placeholder.svg?height=400&width=600&text=Mountain+Hiking",
    date: "2024-01-08",
    location: "Rocky Mountain Trail",
    category: "Adventure",
    likes: 31,
    comments: 12,
    author: { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR" },
    friends: ["Alex", "Sarah"],
  },
  {
    id: "4",
    title: "Food Festival Fun",
    description: "Trying all the amazing food trucks and discovering new flavors with the best company!",
    image: "/placeholder.svg?height=400&width=600&text=Food+Festival",
    date: "2024-01-05",
    location: "City Food Festival",
    category: "Food",
    likes: 18,
    comments: 6,
    author: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40&text=EW" },
    friends: ["Alex", "Sarah", "Mike"],
  },
  {
    id: "5",
    title: "Concert Night",
    description: "Epic night at the concert! The energy was incredible and we danced until our feet hurt.",
    image: "/placeholder.svg?height=400&width=600&text=Concert+Night",
    date: "2024-01-03",
    location: "Madison Square Garden",
    category: "Celebration",
    likes: 35,
    comments: 11,
    author: { name: "Jake Thompson", avatar: "/placeholder.svg?height=40&width=40&text=JT" },
    friends: ["Alex", "Sarah", "Emma"],
  },
  {
    id: "6",
    title: "Road Trip Adventure",
    description: "Cross-country road trip with endless laughs, great music, and unforgettable stops along the way!",
    image: "/placeholder.svg?height=400&width=600&text=Road+Trip",
    date: "2023-12-28",
    location: "Route 66",
    category: "Travel",
    likes: 56,
    comments: 23,
    author: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40&text=AJ" },
    friends: ["Sarah", "Mike", "Emma", "Jake"],
  },
]

export default function MemoryGallery() {
  const { status } = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/"
    }
  }, [status])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState("grid")
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const filteredAndSortedMemories = useMemo(() => {
    const filtered = sampleMemories.filter((memory) => {
      const matchesSearch =
        memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || memory.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "likes":
          return b.likes - a.likes
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [searchTerm, selectedCategory, sortBy])

  const stats = useMemo(() => {
    const totalMemories = sampleMemories.length
    const totalLikes = sampleMemories.reduce((sum, memory) => sum + memory.likes, 0)
    const categories = Array.from(new Set(sampleMemories.map((m) => m.category)))
    const locations = Array.from(new Set(sampleMemories.map((m) => m.location)))

    return {
      totalMemories,
      totalLikes,
      categoriesCount: categories.length,
      locationsCount: locations.length,
      categories,
      locations,
    }
  }, [])

  const getCategoryColor = (category: string) => {
    const colors = {
      Adventure: "bg-green-100 text-green-800 border-green-200",
      Celebration: "bg-purple-100 text-purple-800 border-purple-200",
      Travel: "bg-blue-100 text-blue-800 border-blue-200",
      Food: "bg-orange-100 text-orange-800 border-orange-200",
      Sports: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getMonthYear = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const groupByMonth = (memories: Memory[]) => {
    return memories.reduce(
      (groups, memory) => {
        const monthYear = getMonthYear(memory.date)
        if (!groups[monthYear]) {
          groups[monthYear] = []
        }
        groups[monthYear].push(memory)
        return groups
      },
      {} as Record<string, Memory[]>,
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/feed">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Feed
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Memory Gallery
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalMemories}</div>
              <div className="text-sm opacity-90">Total Memories</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalLikes}</div>
              <div className="text-sm opacity-90">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.locationsCount}</div>
              <div className="text-sm opacity-90">Locations</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.categoriesCount}</div>
              <div className="text-sm opacity-90">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search memories..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="w-full md:w-48 bg-white/80">
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {stats.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <div className="w-full md:w-48 bg-white/80">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  <SelectItem value="date">Latest First</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* View Modes */}
        <div className="w-full">
          <div className="grid grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm">
            <Button
              onClick={() => setViewMode("grid")}
              className={`flex items-center space-x-2 ${viewMode === "grid" ? "bg-purple-100 text-purple-800" : ""}`}
            >
              <Grid3X3 className="h-4 w-4" />
              <span>Grid View</span>
            </Button>
            <Button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center space-x-2 ${viewMode === "timeline" ? "bg-purple-100 text-purple-800" : ""}`}
            >
              <Clock className="h-4 w-4" />
              <span>Timeline</span>
            </Button>
            <Button
              onClick={() => setViewMode("mosaic")}
              className={`flex items-center space-x-2 ${viewMode === "mosaic" ? "bg-purple-100 text-purple-800" : ""}`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Mosaic</span>
            </Button>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedMemories.map((memory) => (
                <Card
                  key={memory.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setFullscreenImage(memory.image || "/placeholder.svg")}>
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className={`absolute top-3 right-3 ${getCategoryColor(memory.category)}`}>
                      {memory.category}
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-bold text-lg mb-1">{memory.title}</h3>
                      <div className="flex items-center space-x-2 text-sm opacity-90">
                        <MapPin className="h-3 w-3" />
                        <span>{memory.location}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{memory.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={memory.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{memory.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{memory.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{memory.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{memory.friends.length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          {memory.comments > 0 ? <span>{memory.comments}</span> : <span className="text-gray-400">No comments</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Timeline View */}
          {viewMode === "timeline" && (
            <div className="space-y-8">
              {Object.entries(groupByMonth(filteredAndSortedMemories)).map(([monthYear, memories]) => (
                <div key={monthYear}>
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                      {monthYear}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent ml-4" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-8">
                    {memories.map((memory) => (
                      <Card
                        key={memory.id}
                        className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-l-4 border-l-purple-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => setFullscreenImage(memory.image || "/placeholder.svg")}>
                              <Image
                                src={memory.image || "/placeholder.svg"}
                                alt={memory.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 truncate">{memory.title}</h3>
                                <Badge className={`ml-2 ${getCategoryColor(memory.category)} text-xs`}>
                                  {memory.category}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{memory.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{memory.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(memory.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mosaic View */}
          {viewMode === "mosaic" && (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredAndSortedMemories.map((memory, index) => (
                <Card
                  key={memory.id}
                  className={`break-inside-avoid group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 overflow-hidden ${
                    index % 3 === 0 ? "transform rotate-1" : index % 3 === 1 ? "transform -rotate-1" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => setFullscreenImage(memory.image || "/placeholder.svg")}>
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 right-3">
                      <Badge className={`${getCategoryColor(memory.category)} mb-2`}>{memory.category}</Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-2">{memory.title}</h3>
                      <p className="text-sm opacity-90 mb-3 line-clamp-3">{memory.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={memory.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{memory.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{memory.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{memory.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate max-w-20">{memory.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            {memory.comments > 0 ? <span>{memory.comments}</span> : <span className="text-gray-400">No comments</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {filteredAndSortedMemories.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
      {fullscreenImage && (
        <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
          <DialogContent className="flex flex-col items-center justify-center bg-transparent shadow-none max-w-3xl w-full p-0">
            <button className="absolute top-4 right-4 text-white text-2xl z-10" onClick={() => setFullscreenImage(null)}>&times;</button>
            <div className="w-full h-full flex items-center justify-center">
              <Image src={fullscreenImage} alt="Full Screen" width={900} height={600} className="object-contain max-h-[80vh] max-w-full rounded-lg shadow-xl" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
