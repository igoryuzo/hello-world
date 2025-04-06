"use client"

import { useState } from "react"
import { CodeSnippet } from "./code-snippet"
import { ChevronDown, ChevronUp, FileText, Download, Copy, Check } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Install Cursor",
    description: "Setting up Cursor, an AI-powered code editor.",
    explanation:
      "Cursor is an AI-powered code editor that integrates Claude Sonnet 3.7, a powerful language model. It allows you to write code using natural language prompts, making it perfect for vibe coding. Cursor helps both developers and non-developers create software more efficiently by leveraging AI to generate, explain, and debug code.",
  },
  {
    id: 2,
    title: "Initial Setup and Prompt",
    description: "Setting up the Next.js project with Farcaster Frame SDK",
    prompt: `I'm looking to build a simple Hello World mini app. Please use nextjs. Make sure to carefully read through the Farcaster LLM text file, which will serve as your documentation. I will paste it below. The meta tags need to be correct for the image to successfully render once the mini app URL is pasted into Warpcast. Include a public/images folder. I will add an imageURL and splashImageUrl. Use yarn for installations. Create a simple Hello, World page for the mini app. Make Hello, World text white with a page background #855dcd. Don't forget to add sdk.actions.ready() so our mini app loads.`,
    code: `cd /Users/igoryuzo/projects && yarn create next-app hello-world-mini-app --typescript --tailwind --eslint

cd hello-world-mini-app && yarn add @farcaster/frame-sdk

mkdir -p public/images`,
  },
  {
    id: 3,
    title: "Add Required Images",
    description: "",
    explanation:
      "For your Farcaster mini app to work properly, you need to add two image files to your project. The first image (image_url.png) will be displayed when your mini app is shared on Farcaster. The second image (splash_image_url.png) will be shown after a user interacts with your mini app.",
  },
  {
    id: 4,
    title: "Testing via localhost:3000",
    description: "",
    prompt: `I've added imageUrl "image_url.png" and splashImageUrl "splash_image_url.png" and my app url is localhost:3000.`,
    code: `# Start the development server
yarn dev`,
  },
  {
    id: 5,
    title: "Deploying to Vercel",
    description: "Deploying your mini app to production",
    code: `# Add your GitHub repository as a remote
git remote add origin git@github.com:<user-name>/<repo-name>.git

# Verify the remote connection
git remote -v

# Stage all files for commit
git add .

# Commit your changes
git commit -m "Hello, world mini app"

# Push to GitHub
git push -u origin main`,
    explanation:
      "To deploy your mini app to production, first push your code to GitHub using the commands above. Then, create an account on Vercel and log in with your GitHub account. Vercel will automatically detect your repository and deploy your app to production.",
  },
  {
    id: 6,
    title: "Update to production URLs",
    description: "Update your http://localhost:3000/ with the Vercel URL Domain",
    explanation:
      "After deploying to Vercel, you need to update all URLs in your code to use your Vercel URL. This ensures that your mini app works correctly in production. e.g: https://hello-world-mini-app.vercel.app/ Once you push changes to Github, you can paste your Vercel production domain into a new cast. Your Hello, World mini app is production ready to share!",
  },
]

// Component for copy button with feedback
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-500" />}
    </button>
  )
}

export function Steps() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  const toggleStep = (stepId: number) => {
    if (expandedStep === stepId) {
      setExpandedStep(null)
    } else {
      setExpandedStep(stepId)
    }
  }

  // Helper function to determine the label for code sections
  const getCodeSectionLabel = (stepId: number) => {
    if (stepId === 2 || stepId === 4 || stepId === 5) {
      return "Commands:"
    }
    return "Code:"
  }

  return (
    <div className="space-y-6">
      {steps.map((step) => (
        <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleStep(step.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 text-left"
          >
            <div>
              <span className="text-purple-600 font-semibold">Step {step.id}:</span>
              <h3 className="font-medium text-gray-900">{step.title}</h3>
            </div>
            {expandedStep === step.id ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </button>

          {expandedStep === step.id && (
            <div className="p-4 space-y-4">
              {step.description && <p className="text-gray-700">{step.description}</p>}

              {step.prompt && step.id !== 1 && (
                <>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Prompt Used:</h4>
                      <CopyButton text={step.prompt} />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-800 border border-gray-200">
                      {step.prompt}
                    </div>
                  </div>

                  {step.id === 2 && (
                    <div className="mt-3 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                      <div className="flex items-start gap-2">
                        <FileText className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
                        <div>
                          <h4 className="text-sm font-medium text-amber-800">Important Note:</h4>
                          <p className="text-sm text-amber-700">
                            Copy and paste the entire text file below the initial prompt above. The Farcaster LLM text
                            file is crucial for building mini apps correctly. It helps LLMs get clear context.
                            <a
                              href="https://miniapps.farcaster.xyz/llms-full.txt"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-1 text-purple-600 hover:text-purple-800 underline"
                            >
                              Farcaster LLM Text File
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {step.code && step.id !== 1 && step.id !== 3 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{getCodeSectionLabel(step.id)}</h4>
                  {step.id === 2 ? (
                    <div className="space-y-2">
                      <div className="bg-[#1e1e1e] text-white p-3 rounded-md text-sm font-mono">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1"></div>
                          <div className="text-xs text-gray-400">terminal</div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-yellow-500 mr-2">$</span>
                          <span>
                            cd /Users/igoryuzo/projects && yarn create next-app hello-world-mini-app --typescript
                            --tailwind --eslint
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#1e1e1e] text-white p-3 rounded-md text-sm font-mono">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1"></div>
                          <div className="text-xs text-gray-400">terminal</div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-yellow-500 mr-2">$</span>
                          <span>cd hello-world-mini-app && yarn add @farcaster/frame-sdk</span>
                        </div>
                      </div>
                      <div className="bg-[#1e1e1e] text-white p-3 rounded-md text-sm font-mono">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1"></div>
                          <div className="text-xs text-gray-400">terminal</div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-yellow-500 mr-2">$</span>
                          <span>mkdir -p public/images</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CodeSnippet code={step.code} />
                  )}
                </div>
              )}

              {step.id === 3 && (
                <div className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">File Structure:</h4>
                    <div className="bg-[#1e1e1e] text-white p-4 rounded-md text-sm font-mono">
                      <div className="flex items-start">
                        <span className="text-[#64D2FF] mr-2">▼</span>
                        <span className="text-[#64D2FF]">public</span>
                      </div>
                      <div className="flex items-start ml-4">
                        <span className="text-[#64D2FF] mr-2">▼</span>
                        <span className="text-[#64D2FF]">images</span>
                      </div>
                      <div className="flex items-start ml-8">
                        <span className="text-[#B180D7] mr-2">🖼</span>
                        <span className="text-[#64D2FF]">image_url.png</span>
                      </div>
                      <div className="flex items-start ml-8">
                        <span className="text-[#B180D7] mr-2">🖼</span>
                        <span className="text-[#64D2FF]">splash_image_url.png</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      Drag and drop two image files into your <code>public/images</code> folder:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
                      <li>
                        <code>image_url.png</code> - The main image displayed when sharing your mini app
                      </li>
                      <li>
                        <code>splash_image_url.png</code> - The image shown after interaction
                      </li>
                    </ul>
                    <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-700">
                        <strong>Note:</strong> Make sure your images have a 1.91:1 aspect ratio for optimal display, and
                        the splash image should be 200 by 200px.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step.id === 4 && (
                <div className="mt-6">
                  <div className="w-full aspect-square bg-[#855dcd] rounded-md flex items-center justify-center mb-3">
                    <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
                  </div>
                  <p className="text-center text-gray-700">
                    You should see this when visiting{" "}
                    <span className="font-semibold text-purple-600 px-1 py-0.5 bg-purple-50 rounded">
                      http://localhost:3000
                    </span>
                  </p>
                </div>
              )}

              {step.id !== 2 && step.id !== 3 && step.explanation && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Explanation:</h4>
                  <p className="text-sm text-blue-700 whitespace-pre-line">{step.explanation}</p>
                </div>
              )}

              {step.id === 1 && (
                <>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-700">
                      After installing Cursor, access Chat in the sidebar with ⌘+L (Mac) or Ctrl+L (Windows/Linux). Make
                      sure to select &quot;Agent&quot; in the dropdown as shown below.
                    </p>
                    <div className="rounded-md overflow-hidden border border-gray-300">
                      <Image
                        src="/images/cursor-chat.png"
                        alt="Cursor chat interface with Agent selected"
                        width={630}
                        height={200}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <a
                      href="https://www.cursor.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-lg"
                    >
                      <Download size={20} />
                      <span>Download Cursor</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="mt-10 p-6 bg-purple-50 rounded-lg border border-purple-100">
        <p className="text-purple-800 text-center">
          The purpose of this simple guide is to show that AI models, LLMs, make it possible for everyone to create
          software. I hope you found it useful. Reach out with any questions.
        </p>
      </div>
    </div>
  )
} 