import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zyana - Cosmic Tarot & Spiritual Guidance',
  description: 'Enter the cosmic portal for tarot readings, spiritual guidance, and mystical insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  )
}
