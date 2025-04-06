'use client'

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready()
      } catch (error) {
        console.error('Error initializing Frame:', error)
      }
    }
    init()
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-courier`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-gray-900 pb-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
