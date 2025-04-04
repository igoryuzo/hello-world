import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hello World Mini App',
  description: 'A simple Hello World mini app for Farcaster',
}

const frameMetadata = {
  version: 'next',
  imageUrl: 'https://hello-world-dusky-tau.vercel.app/images/cursor-command.gif',
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
  return (
    <>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
      </head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            Hello World! 👋
          </h1>
          <p className="text-center text-xl">
            Welcome to my first Farcaster mini app!
          </p>
        </div>
      </main>
    </>
  )
}
