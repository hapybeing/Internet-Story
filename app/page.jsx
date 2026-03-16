'use client'

import DecadeProgress from '@/components/engine/DecadeProgress'
import Nineties from '@/components/eras/Nineties'
import TwoThousands from '@/components/eras/TwoThousands'
import TwentyTens from '@/components/eras/TwentyTens'
import TwentyTwenties from '@/components/eras/TwentyTwenties'
import Future from '@/components/eras/Future'

export default function Home() {
  return (
    <main className="relative w-full">
      <DecadeProgress />
      <Nineties />
      <TwoThousands />
      <TwentyTens />
      <TwentyTwenties />
      <Future />
    </main>
  )
}
