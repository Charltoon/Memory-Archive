import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  const memories = await prisma.memory.findMany({
    include: {
      author: true,
      likes: { include: { user: { select: { id: true, name: true, image: true } } } },
      friends: true,
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  })
  const memoriesWithLiked = memories.map(memory => ({
    ...memory,
    comments: memory._count.comments, // use the count for comments
    liked: userId ? memory.likes.some((like: any) => like.userId === userId) : false
  }))
  return NextResponse.json(memoriesWithLiked)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  const memory = await prisma.memory.create({
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      date: new Date(data.date),
      location: data.location,
      category: data.category,
      authorId: userId,
      friends: {
        create: (data.friends || []).map((name: string) => ({ name })),
      },
    },
    include: {
      author: true,
      friends: true,
      likes: true,
      comments: true,
    },
  })
  return NextResponse.json(memory)
} 