import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Image src="/images/farcaster-logo.png" alt="Farcaster Logo" width={32} height={32} className="rounded-lg" />
        <span className="font-semibold">Mini App Guide</span>
      </div>
      <Link
        href="https://github.com/igoryuzo/hello-world-mini-app"
        target="_blank"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
      >
        <Github size={16} />
        <span>Source</span>
      </Link>
    </header>
  )
}
