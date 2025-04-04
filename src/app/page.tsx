'use client'

import { useEffect, useState } from 'react'

const frameMetadata = {
  version: 'next',
  imageUrl: 'https://hello-world-dusky-tau.vercel.app/images/hello-world-type.gif',
  button: {
    title: '👋 Say Hello',
    action: {
      type: 'launch_frame',
      url: 'https://hello-world-dusky-tau.vercel.app',
      name: 'Hello World',
      splashImageUrl: 'https://hello-world-dusky-tau.vercel.app/images/splash.png',
      splashBackgroundColor: '#fdebc9'
    }
  }
}

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const text = 'Hello World! '

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(intervalId)
        // Show emoji after text is complete
        setShowEmoji(true)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
      </head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
          <h1 className="text-4xl text-center">
            {displayText}{showEmoji && '👋'}
            <span className="cursor">|</span>
          </h1>
        </div>
      </main>
      <style jsx>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
    </>
  )
}
