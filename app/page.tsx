"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Share2, Plus, Camera, MapPin, Calendar, Users, Grid3X3, Mail, Lock, User as UserIcon, Loader2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

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

export default function LandingPage() {
  const { data: session, status } = useSession()
  // Redirect logged-in users to /feed
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/feed"
    }
  }, [status])

  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ email: '', password: '', name: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (tab === 'signup' && form.password !== form.confirm) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
      name: tab === 'signup' ? form.name : undefined,
      isSignUp: tab === 'signup',
    })
    setLoading(false)
    if (res?.ok) {
      window.location.href = '/feed'
    } else {
      setError(res?.error || 'Authentication failed')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="w-full py-8 px-4 flex flex-col items-center bg-white/80 shadow-sm">
        <div className="max-w-2xl text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-14 h-14 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v10m0 0H9m6 0a2 2 0 002-2v-8m-2 10a2 2 0 01-2-2H9a2 2 0 01-2-2v-8m0 0L4.447 7.724A2 2 0 014 6.382V5" /></svg>
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Memoriae</h1>
          </div>
          <p className="text-lg text-gray-700 mb-6">Capture, organize, and share your special moments with friends. Relive your adventures, celebrations, and everyday joys—all in one beautiful site.</p>
          <Button
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
            onClick={() => setModalOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Login/Signup Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md p-0 bg-white border border-gray-200 rounded-xl shadow-sm animate-fade-in relative">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-gray-900 text-2xl font-semibold text-center tracking-tight">
              {tab === 'login' ? 'Sign In to Memories' : 'Create an Account'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-2 mb-6 border-b border-gray-200">
            <button
              className={`flex-1 py-2 text-base font-medium border-b-2 transition-colors duration-200 ${tab === 'login' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
              onClick={() => setTab('login')}
              disabled={tab === 'login'}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 text-base font-medium border-b-2 transition-colors duration-200 ${tab === 'signup' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
              onClick={() => setTab('signup')}
              disabled={tab === 'signup'}
            >
              Sign Up
            </button>
          </div>
          <form className="space-y-5 px-8 pb-8" onSubmit={handleAuth}>
            {tab === 'signup' && (
              <div>
                <Label htmlFor="name" className="mb-1 text-gray-700 font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="rounded-md border border-gray-300 focus:border-blue-600 focus:ring-0 text-base px-3 py-2 bg-white"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                className="rounded-md border border-gray-300 focus:border-blue-600 focus:ring-0 text-base px-3 py-2 bg-white"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                className="rounded-md border border-gray-300 focus:border-blue-600 focus:ring-0 text-base px-3 py-2 bg-white"
                placeholder="Password"
              />
            </div>
            {tab === 'signup' && (
              <div>
                <Label htmlFor="confirm" className="mb-1 text-gray-700 font-medium">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  required
                  className="rounded-md border border-gray-300 focus:border-blue-600 focus:ring-0 text-base px-3 py-2 bg-white"
                  placeholder="Confirm password"
                />
              </div>
            )}
            {error && (
              <div className="bg-red-50 text-red-600 px-3 py-2 rounded text-sm text-center border border-red-200">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200 text-base mt-2 flex items-center justify-center gap-2" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? (tab === 'login' ? 'Signing in...' : 'Signing up...') : (tab === 'login' ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v10m0 0H9m6 0a2 2 0 002-2v-8m-2 10a2 2 0 01-2-2H9a2 2 0 01-2-2v-8m0 0L4.447 7.724A2 2 0 014 6.382V5" /></svg>
            </span>
            <h3 className="font-bold text-lg mb-2">Capture Memories</h3>
            <p className="text-gray-600">Easily add photos, stories, and locations to remember every special moment.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <span className="bg-purple-100 text-purple-600 rounded-full p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zm-6 0v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5m6 0a3 3 0 01-3-3H4a3 3 0 01-3 3v2h5" /></svg>
            </span>
            <h3 className="font-bold text-lg mb-2">Share with Friends</h3>
            <p className="text-gray-600">Tag friends and share your memories together. Comment and like each other's moments.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <span className="bg-green-100 text-green-600 rounded-full p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V7a2 2 0 012-2h2a2 2 0 012 2v10" /></svg>
            </span>
            <h3 className="font-bold text-lg mb-2">Organize by Category</h3>
            <p className="text-gray-600">Sort your memories by adventure, celebration, travel, food, pets, and more.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm bg-white/80 mt-auto">
        &copy; {new Date().getFullYear()} Memoriae. tonton-dev.
      </footer>
    </div>
  )
}
