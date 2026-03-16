'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

export default function Future() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          onEnter: () =>
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 4 } })),
          onEnterBack: () =>
            window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 4 } })),
        },
      }).from(contentRef.current, { opacity: 0, scale: 0.96, duration: 1 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-future"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#000408' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 65%)' }} />
      <div className="era-watermark" style={{ fontFamily: 'var(--font-orbitron)', color: '#00d4ff' }}>2035</div>

      <div ref={contentRef} className="relative h-full flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(8px, 0.9vw, 11px)', letterSpacing: '0.4em', color: 'rgba(0,212,255,0.5)', marginBottom: '20px', textTransform: 'uppercase' }}>
          2035 — ∞
        </div>
        <h1 style={{ fontFamily: 'var(--font-orbitron)', fontWeight: '900', fontSize: 'clamp(28px, 5.5vw, 72px)', color: '#00d4ff', textAlign: 'center', lineHeight: 1.1, textShadow: '0 0 30px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)' }}>
          THE NEURAL<br />WEB
        </h1>
        <p style={{ marginTop: '20px', color: 'rgba(0,212,255,0.35)', fontFamily: 'var(--font-orbitron)', fontSize: '10px', letterSpacing: '0.2em' }}>
          INITIALIZING NEURAL INTERFACE…
        </p>
      </div>
    </section>
  )
}
