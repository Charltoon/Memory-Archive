import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare, hash } from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 