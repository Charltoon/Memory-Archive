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
  if (!commentId) return NextResponse.json({ error: "Missing commentId" }, { status: 400 })

  // Check if user already reacted
  const existing = await prisma.commentReaction.findUnique({
    where: { userId_commentId: { userId, commentId } },
  })
  let reacted
  if (existing) {
    await prisma.commentReaction.delete({ where: { userId_commentId: { userId, commentId } } })
    reacted = false
  } else {
    await prisma.commentReaction.create({ data: { userId, commentId } })
    reacted = true
  }
  // Return updated reactions
  const reactions = await prisma.commentReaction.findMany({
    where: { commentId },
    include: { user: { select: { id: true, name: true, image: true } } },
  })
  return NextResponse.json({ reacted, reactions })
} 