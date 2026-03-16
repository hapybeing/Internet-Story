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
  description: 'An immersive journey through the evolution of the internet — from 1990 to 2035.',
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
