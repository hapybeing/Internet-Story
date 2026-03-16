'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

const APPS = [
  { name: 'Instagram', bg: 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)', emoji: '📸' },
  { name: 'Snapchat',  bg: '#FFFC00',                                          emoji: '👻' },
  { name: 'Twitter',   bg: '#1DA1F2',                                          emoji: '🐦' },
  { name: 'WhatsApp',  bg: '#25D366',                                          emoji: '💬' },
  { name: 'Uber',      bg: '#000000',                                          emoji: '🚕' },
  { name: 'Netflix',   bg: '#E50914',                                          emoji: '🎬' },
  { name: 'Spotify',   bg: '#1DB954',                                          emoji: '🎵' },
  { name: 'Tinder',    bg: 'linear-gradient(135deg,#fd297b,#ff6036)',          emoji: '🔥' },
  { name: 'Slack',     bg: '#4A154B',                                          emoji: '⚡' },
]

const MILESTONES = [
  { year: '2010', event: 'INSTAGRAM',      color: '#E1306C', desc: 'Photo sharing launches; $1B Facebook acquisition 2 years later' },
  { year: '2012', event: 'iOS 7 FLAT',     color: '#007AFF', desc: "Jony Ive kills skeuomorphism. Flat design takes over overnight"  },
  { year: '2013', event: 'SNAPCHAT',       color: '#FFCC00', desc: 'Disappearing messages introduce ephemeral content to the web'    },
  { year: '2016', event: 'POKÉMON GO',     color: '#FF3B30', desc: '50M downloads in 19 days. Augmented reality goes mainstream'     },
  { year: '2016', event: 'FILTER BUBBLES', color: '#FF9500', desc: 'Algorithms radicalize feeds. Social media polarizes nations'     },
  { year: '2017', event: 'BITCOIN $20K',   color: '#F7931A', desc: 'Crypto mania. Every startup becomes a blockchain company'       },
]

const STATS = [
  { value: '3.5B', label: 'Social users'  },
  { value: '4.5B', label: 'Smartphones'   },
  { value: '3M+',  label: 'Apps in stores' },
]

export default function TwentyTens() {
  const sectionRef    = useRef(null)
  const subtitleRef   = useRef(null)
  const titleRef      = useRef(null)
  const statsRef      = useRef(null)
  const appIconRefs   = useRef([])
  const milestoneRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          onEnter:     () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 2 } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 2 } })),
          onLeave:     () => window.dispatchEvent(new CustomEvent('era-transition-2-3')),
        },
      })

      tl.fromTo(sectionRef.current, { filter: 'brightness(3) saturate(0)' }, { filter: 'brightness(1) saturate(1)', duration: 0.35 }, 0)
      tl.from(subtitleRef.current, { opacity: 0, duration: 0.2 }, 0.22)
      tl.from(titleRef.current,    { opacity: 0, x: -40, duration: 0.5, ease: 'power3.out' }, 0.32)
      tl.from(statsRef.current,    { opacity: 0, y: 16, duration: 0.35 }, 0.55)

      appIconRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { scale: 0, opacity: 0, duration: 0.28, ease: 'back.out(2.5)' }, 0.7 + i * 0.065)
      })

      milestoneRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { opacity: 0, y: 28, duration: 0.4, ease: 'power2.out' }, 1.0 + i * 0.16)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-10s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right,#FF3B30,#FF9500,#FFCC00,#34C759,#007AFF,#5856D6,#FF2D55)', zIndex: 20, pointerEvents: 'none' }} />
      <div className="era-watermark" style={{ fontFamily: 'var(--font-outfit)', color: '#1a1a1a', fontWeight: 900 }}>2010s</div>

      <div className="relative h-full grid" style={{ gridTemplateColumns: '1fr 1fr', zIndex: 10 }}>
        {/* LEFT */}
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(24px,5vw,64px) clamp(16px,4vw,48px)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
          <div ref={subtitleRef} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,1vw,12px)', letterSpacing: '0.35em', color: '#007AFF', marginBottom: '14px', textTransform: 'uppercase', fontWeight: '600' }}>
            2010 — 2020
          </div>

          <h1 ref={titleRef} style={{ fontFamily: 'var(--font-outfit)', fontWeight: '900', fontSize: 'clamp(32px,5.5vw,72px)', color: '#1a1a1a', lineHeight: 1.0, marginBottom: '24px', letterSpacing: '-0.03em' }}>
            FLAT.<br />FAST.<br />MOBILE.
          </h1>

          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px,3.5vw,40px)', marginBottom: '32px' }}>
            {STATS.map(s => (
              <div key={s.value}>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(20px,2.5vw,32px)', color: '#1a1a1a', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,0.9vw,11px)', color: '#999', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(8px,1.5vw,18px)', maxWidth: 'clamp(180px,22vw,260px)' }}>
            {APPS.map((app, i) => (
              <div key={app.name} ref={el => (appIconRefs.current[i] = el)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 'clamp(44px,6vw,62px)', height: 'clamp(44px,6vw,62px)', borderRadius: '22%', background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(22px,2.8vw,30px)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                  {app.emoji}
                </div>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(7px,0.7vw,9px)', color: '#666', textAlign: 'center', fontWeight: '500' }}>{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center overflow-hidden" style={{ padding: 'clamp(16px,3vw,48px) clamp(16px,3.5vw,48px) clamp(16px,3vw,48px) clamp(12px,2.5vw,32px)' }}>
          <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(8px,0.9vw,11px)', color: '#bbb', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Decade Milestones
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MILESTONES.map((m, i) => (
              <div key={`${m.year}-${m.event}`} ref={el => (milestoneRefs.current[i] = el)} style={{ display: 'flex', background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '3px', background: m.color, flexShrink: 0 }} />
                <div style={{ padding: '9px 12px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(12px,1.4vw,16px)', color: m.color }}>{m.year}</span>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(8px,0.85vw,11px)', color: '#1a1a1a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.event}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,0.95vw,12px)', color: '#777', lineHeight: 1.45 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
