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
  const { type } = await req.json();
  if (!type || !['like', 'heart', 'haha', 'care', 'wow', 'sad', 'angry'].includes(type)) {
    return NextResponse.json({ error: "Invalid reaction type" }, { status: 400 })
  }
  const existing = await prisma.like.findUnique({ where: { userId_memoryId: { userId, memoryId } } })
  let reacted = false
  let currentType = null
  if (existing) {
    if (existing.type === type) {
      await prisma.like.delete({ where: { id: existing.id } })
    } else {
      await prisma.like.update({ where: { id: existing.id }, data: { type } })
      reacted = true
      currentType = type
    }
  } else {
    await prisma.like.create({ data: { userId, memoryId, type } })
    reacted = true
    currentType = type
  }
  // Return all reactors with type and user info
  const reactors = await prisma.like.findMany({
    where: { memoryId },
    include: { user: { select: { id: true, name: true } } },
  })
  return NextResponse.json({ reacted, currentType, reactors })
} 