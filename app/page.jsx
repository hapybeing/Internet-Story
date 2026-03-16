'use client'

import { useState } from 'react'
import LoadingScreen  from '@/components/engine/LoadingScreen'
import EraTransitions from '@/components/engine/EraTransitions'
import DecadeProgress from '@/components/engine/DecadeProgress'
import Nineties       from '@/components/eras/Nineties'
import TwoThousands   from '@/components/eras/TwoThousands'
import TwentyTens     from '@/components/eras/TwentyTens'
import TwentyTwenties from '@/components/eras/TwentyTwenties'
import Future         from '@/components/eras/Future'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loading screen unmounts itself after the CRT power-off animation */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Era transition overlays — mounted always, shown on demand via custom events */}
      <EraTransitions />

      {/* Main scroll experience */}
      <main
        className="relative w-full"
        style={{
          // Prevent any paint while loading screen is still up
          visibility: loaded ? 'visible' : 'hidden',
        }}
      >
        <DecadeProgress />
        <Nineties />
        <TwoThousands />
        <TwentyTens />
        <TwentyTwenties />
        <Future />
      </main>
    </>
  )
}
