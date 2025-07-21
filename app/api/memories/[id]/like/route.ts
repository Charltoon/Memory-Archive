import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const memoryId = params.id
  const existing = await prisma.like.findUnique({ where: { userId_memoryId: { userId, memoryId } } })
  let liked = false
  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } })
  } else {
    await prisma.like.create({ data: { userId, memoryId } })
    liked = true
  }
  const likeCount = await prisma.like.count({ where: { memoryId } })
  return NextResponse.json({ liked, likeCount })
} 