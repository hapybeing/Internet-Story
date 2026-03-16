import { Press_Start_2P, VT323, Outfit, Orbitron } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata = {
  title: 'The Internet Time Machine',
  description:
    'An immersive scroll journey through the evolution of the internet — from the dial-up 1990s to the neural web of 2035. Interact with historical interfaces: Windows 95, early Google, MySpace, and the original iPhone.',
  keywords: [
    'internet history', 'web design history', 'interactive storytelling',
    'scroll experience', 'windows 95', 'web 1.0', 'web 2.0', 'future internet',
  ],
  authors: [{ name: 'Internet Time Machine' }],
  // Open Graph — controls how the link looks when shared on social media
  openGraph: {
    title: 'The Internet Time Machine',
    description: 'Scroll through 30 years of internet history. Interact with Windows 95, early Google, MySpace, and the 2007 iPhone.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Internet Time Machine',
    description: 'Scroll through 30 years of internet history.',
  },
  // Prevents search engines from finding placeholder/unfinished deploys
  // Change to 'index, follow' when ready to go public
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} ${outfit.variable} ${orbitron.variable}`}
    >
      <body className="overflow-x-hidden bg-black">{children}</body>
    </html>
  )
}
