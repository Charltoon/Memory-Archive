import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionClientProvider from "@/components/SessionClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memoriae - Share Your Special Moments",
  description: "A beautiful app to capture and share memories with friends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionClientProvider>
          {children}
        </SessionClientProvider>
      </body>
    </html>
  )
}
