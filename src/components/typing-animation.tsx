"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
}

export function TypingAnimation({ text }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, 50) // Adjust typing speed here

      return () => clearTimeout(timeout)
    }
  }, [index, text])

  return <span>{displayedText}</span>
} 