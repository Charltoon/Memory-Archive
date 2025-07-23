import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Fetch all top-level comments for the memory, including user, reactions, and replies (threaded)
  const comments = await prisma.comment.findMany({
    where: { memoryId: params.id, parentId: null },
    include: {
      user: true,
      reactions: { include: { user: { select: { id: true, name: true, image: true } } } },
      replies: {
        include: {
          user: true,
          reactions: { include: { user: { select: { id: true, name: true, image: true } } } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  })
  return NextResponse.json(comments)
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  console.log('DEBUG session:', session)
  console.log('DEBUG userId:', userId)
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  const createData: any = {
      text: data.text,
      userId,
      memoryId: params.id,
  }
  if (data.parentId) createData.parentId = data.parentId
  const comment = await prisma.comment.create({
    data: createData,
    include: { user: true, reactions: true, replies: true },
  })
  return NextResponse.json(comment)
}

// Handler for toggling reaction on a comment
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  const commentId = data.commentId
  const newText = data.text
  if (!commentId || typeof newText !== 'string') {
    return NextResponse.json({ error: "Missing commentId or text" }, { status: 400 })
  }
  // Only allow editing own comment
  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment || comment.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { text: newText },
    include: { user: true, reactions: true, replies: true },
  })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await req.json()
  const commentId = data.commentId
  if (!commentId) {
    return NextResponse.json({ error: "Missing commentId" }, { status: 400 })
  }
  // Only allow deleting own comment
  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment || comment.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  await prisma.comment.delete({ where: { id: commentId } })
  return NextResponse.json({ success: true })
} 