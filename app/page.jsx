'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import LoadingScreen  from '@/components/engine/LoadingScreen'
import EraTransitions from '@/components/engine/EraTransitions'
import DecadeProgress from '@/components/engine/DecadeProgress'
import Nineties       from '@/components/eras/Nineties'
import TwoThousands   from '@/components/eras/TwoThousands'
import TwentyTens     from '@/components/eras/TwentyTens'
import TwentyTwenties from '@/components/eras/TwentyTwenties'

// Future is dynamically imported with ssr:false to prevent Three.js
// from running during Next.js server-side pre-render.
// Three.js accesses browser globals (self, window) at module-init level
// which crashes the server build even with 'use client' on the component.
const Future = dynamic(() => import('@/components/eras/Future'), {
  ssr: false,
  loading: () => (
    <section
      style={{
        width: '100%',
        height: '100vh',
        background: '#00040a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '10px', color: 'rgba(0,212,255,0.4)', letterSpacing: '0.3em' }}>
        INITIALIZING…
      </div>
    </section>
  ),
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  // Lock scroll while the loading screen is active.
  // Without this, users on trackpads can scroll past era sections
  // before the experience officially starts, breaking the timeline.
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [loaded])

  const handleLoadComplete = () => {
    // 1. Snap to top before revealing — prevents mid-timeline reveal
    //    if the user managed to scroll during the loading screen
    window.scrollTo({ top: 0, behavior: 'instant' })

    // 2. Reveal content
    setLoaded(true)

    // 3. Refresh ScrollTrigger AFTER the DOM becomes visible.
    //    useLayoutEffect in era components fires while main is hidden,
    //    so GSAP's pin spacer measurements may be slightly off.
    //    A refresh after visibility is restored corrects them.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Double rAF ensures the browser has painted the newly visible content
        // before ScrollTrigger recalculates all trigger positions.
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh()
        })
      })
    })
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <EraTransitions />

      <main
        className="relative w-full"
        style={{
          visibility: loaded ? 'visible' : 'hidden',
          // Keep the full page height allocated while hidden so
          // GSAP pin spacers can measure correctly before reveal
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
