'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

export default function TwentyTwenties() {
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
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 3 } })),
          onEnterBack: () =>
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 3 } })),
        },
      }).from(contentRef.current, { opacity: 0, y: 30, duration: 0.8 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-20s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1030 50%, #0a0f20 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />
      <div className="era-watermark" style={{ color: '#a78bfa' }}>2020s</div>

      <div ref={contentRef} className="relative h-full flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
        <div className="glass-card" style={{ padding: '40px 56px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(167,139,250,0.7)', marginBottom: '16px', textTransform: 'uppercase' }}>
            2020 — 2025
          </div>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(28px, 5vw, 64px)', color: '#fff', lineHeight: 1.1 }}>
            THE GLASS<br />AGE
          </h1>
          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            Full experience coming next session…
          </p>
        </div>
      </div>
    </section>
  )
}
