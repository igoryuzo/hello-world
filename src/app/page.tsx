'use client'

import { Steps } from "@/components/steps"
import { TypingAnimation } from "@/components/typing-animation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const frameMetadata = {
  version: 'next',
  imageUrl: 'https://hello-world-dusky-tau.vercel.app/images/hello-world.gif',
  button: {
    title: 'Build Mini App',
    action: {
      type: 'launch_frame',
      url: 'https://hello-world-dusky-tau.vercel.app',
      name: 'Hello World',
      splashImageUrl: 'https://hello-world-dusky-tau.vercel.app/images/farcaster-logo.png',
      splashBackgroundColor: '#855dcd'
    }
  }
}

export default function Home() {
  return (
    <>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
      </head>
      <main className="flex min-h-screen flex-col p-4 pb-20">
        <Header />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Vibe code a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-1 text-white">
                <TypingAnimation text="Hello World" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-md transform -rotate-1"></span>
            </span>{" "}
            Mini App
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">A step-by-step guide to creating a Farcaster mini app by prompting an LLM.</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">What are Farcaster Mini Apps?</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Mini Apps enable developers to distribute native-like apps to Farcaster users. They are the easiest way to
              deliver engaging, high-retention, and easy-to-monetize applications.
            </p>
            <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                <strong>Note:</strong> Vibe coding lets anyone create software using natural language prompts. This guide
                is designed for both developers and non-developers to help them build with the power of AI models.
              </p>
            </div>
          </section>

          <Steps />
        </div>

        <Footer />
      </main>
    </>
  )
}
