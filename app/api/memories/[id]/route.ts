import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const memory = await prisma.memory.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      likes: { include: { user: { select: { id: true, name: true, image: true } } } },
      comments: true,
      friends: true,
    },
  })
  if (!memory) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(memory)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  const memory = await prisma.memory.update({
    where: { id: params.id, authorId: userId },
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      date: new Date(data.date),
      location: data.location,
      category: data.category,
      friends: {
        deleteMany: {},
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await prisma.memory.delete({ where: { id: params.id, authorId: userId } })
  return NextResponse.json({ success: true })
} 