"use client"

import { useState } from "react"

interface CodeSnippetProps {
  code: string
}

export function CodeSnippet({ code }: CodeSnippetProps) {
  // For future use with copy functionality or code loading animations
  const [isLoading] = useState(false)

  // Determine language based on code content
  const getLanguage = (code: string) => {
    if (code.includes("yarn") || code.includes("mkdir") || code.includes("git ")) {
      return "bash"
    } else if (code.includes("import") && (code.includes("from") || code.includes("export"))) {
      return "typescript"
    } else {
      return "javascript"
    }
  }

  // Format code for display
  const formatCode = (code: string) => {
    return code.split("\n").map((line, index) => (
      <div key={index} className="flex">
        <span className="text-gray-500 w-8 text-right pr-2 select-none">{index + 1}</span>
        <span className="flex-1">{line || " "}</span>
      </div>
    ))
  }

  // Determine background color based on language
  const getBgColor = (language: string) => {
    switch (language) {
      case "bash":
        return "bg-gray-900"
      case "typescript":
        return "bg-blue-900"
      default:
        return "bg-gray-800"
    }
  }

  const language = getLanguage(code)
  const bgColor = getBgColor(language)

  return (
    <div className={`rounded-md overflow-auto ${bgColor} text-white p-4 text-sm font-courier`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400 font-courier">
          {isLoading ? "Loading..." : language}
        </div>
      </div>
      <div className="overflow-x-auto">
        <pre className="whitespace-pre font-courier">{formatCode(code)}</pre>
      </div>
    </div>
  )
} 