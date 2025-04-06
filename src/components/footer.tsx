import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 text-center">
      <Link
        href="https://warpcast.com/igoryuzo.eth"
        target="_blank"
        className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
      >
        <span>Made with ❤️ by @igoryuzo.eth</span>
      </Link>
    </footer>
  )
}
