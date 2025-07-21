import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare, hash } from "bcryptjs"
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true },
        isSignUp: { label: "Sign Up", type: "hidden", optional: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // Sign Up
        if (credentials.isSignUp === "true") {
          const existing = await prisma.user.findUnique({ where: { email: credentials.email } })
          if (existing) throw new Error("Email already in use")
          const hashed = await hash(credentials.password, 10)
          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name,
              password: hashed,
            },
          })
          return { id: user.id, email: user.email, name: user.name }
        }
        // Sign In
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) throw new Error("No user found")
        const valid = await compare(credentials.password, user.password)
        if (!valid) throw new Error("Invalid password")
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  pages: {
    signIn: "/", // We'll use a modal, so this can be the landing page
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 