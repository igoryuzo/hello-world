'use client'

import { useEffect, useState } from 'react'

const frameMetadata = {
  version: 'next',
  imageUrl: 'https://hello-world-dusky-tau.vercel.app/images/hello-world.gif',
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
  const [isTyping, setIsTyping] = useState(false)
  const text = 'hello, world'

  useEffect(() => {
    // Add initial delay before typing starts
    const startDelay = setTimeout(() => {
      setIsTyping(true)
      let i = 0
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(intervalId)
        }
      }, 100)

      return () => clearInterval(intervalId)
    }, 1000) // Wait 1 second before starting to type

    return () => clearTimeout(startDelay)
  }, [])

  return (
    <>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
      </head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24" style={{ backgroundColor: '#8963d2' }}>
        <div className="z-10 max-w-5xl w-full items-center justify-center text-sm">
          <h1 className="text-4xl text-center relative text-white" style={{ fontFamily: 'Courier, monospace' }}>
            <span>{displayText}</span>
            <span className={`cursor absolute ${isTyping ? 'typing' : ''}`}>|</span>
          </h1>
        </div>
      </main>
      <style jsx>{`
        .cursor {
          animation: blink 1s step-end infinite;
          left: 50%;
          transform: translateX(-50%);
          transition: left 0.1s ease;
          color: white;
          font-family: Courier, monospace;
        }

        .cursor.typing {
          left: calc(50% + ${displayText.length * 12}px);
        }

        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
    </>
  )
}
