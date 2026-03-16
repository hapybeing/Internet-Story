'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

export default function TwentyTens() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          onEnter: () =>
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 2 } })),
          onEnterBack: () =>
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 2 } })),
        },
      }).from(contentRef.current, { opacity: 0, y: 40, duration: 0.8 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-10s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#f5f5f5' }}
    >
      <div className="era-watermark" style={{ color: '#ff6b35' }}>2010s</div>

      <div ref={contentRef} className="relative h-full flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
        <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(11px, 1.2vw, 14px)', letterSpacing: '0.3em', color: '#ff6b35', marginBottom: '16px', textTransform: 'uppercase' }}>
          2010 — 2020
        </div>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(32px, 6vw, 80px)', color: '#1a1a1a', textAlign: 'center', lineHeight: 1.05 }}>
          THE FLAT<br />EARTH ERA
        </h1>
        <p style={{ marginTop: '20px', color: '#666', fontFamily: 'var(--font-outfit)', fontSize: '14px', letterSpacing: '0.05em' }}>
          Full experience coming next session…
        </p>
      </div>
    </section>
  )
}
