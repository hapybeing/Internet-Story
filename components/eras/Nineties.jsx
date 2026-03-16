'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import Windows95Desktop from '@/components/artifacts/Windows95Desktop'

const TERMINAL_LINES = [
  { text: 'C:\\> CONNECT TO INTERNET',        color: '#00ff41' },
  { text: 'Initializing modem...',             color: 'rgba(0,255,65,0.7)' },
  { text: 'SKREEEEEEEEE HONK HONK SKREEEEEEE', color: '#ffff00' },
  { text: 'Connected at 56,000 bps.',          color: '#00ff41' },
  { text: 'You have 3 new messages.',          color: '#00ff41' },
  { text: 'Loading Netscape Navigator...',     color: 'rgba(0,255,65,0.7)' },
  { text: 'Welcome to the World Wide Web.',    color: '#00ff41' },
]

const MILESTONES = [
  { year: '1991', event: 'WORLD WIDE WEB', desc: 'Tim Berners-Lee publishes the first website at CERN, Switzerland' },
  { year: '1993', event: 'MOSAIC BROWSER', desc: 'First graphical browser makes the internet accessible to everyone' },
  { year: '1995', event: 'WINDOWS 95',     desc: 'Microsoft ships Windows 95, putting a PC in 40M homes' },
  { year: '1998', event: 'GOOGLE LAUNCH',  desc: 'Brin & Page launch a search engine from a Stanford dorm' },
]

const STATS = [
  { value: '16M', label: 'Users in 1995' },
  { value: '56K', label: 'Modem speed'   },
  { value: '23K', label: "Websites '95"  },
]

export default function Nineties() {
  const sectionRef       = useRef(null)
  const crtOverlayRef    = useRef(null)
  const titleRef         = useRef(null)
  const subtitleRef      = useRef(null)
  const terminalRef      = useRef(null)
  const terminalLinesRef = useRef([])
  const win95Ref         = useRef(null)
  const milestoneRefs    = useRef([])
  const statsRef         = useRef(null)
  const artifactBtnRef   = useRef(null)

  const [artifactOpen, setArtifactOpen] = useState(false)

  const openArtifact = () => {
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === sectionRef.current) st.disable()
    })
    setArtifactOpen(true)
  }

  const closeArtifact = () => {
    setArtifactOpen(false)
    setTimeout(() => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.enable()
      })
    }, 120)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          onEnter:     () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 0 } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 0 } })),
          onLeave:     () => window.dispatchEvent(new CustomEvent('era-transition-0-1')),
        },
      })

      tl.fromTo(crtOverlayRef.current, { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0)
      tl.fromTo(sectionRef.current, { filter: 'brightness(0)' }, { filter: 'brightness(1)', duration: 0.4 }, 0)
      tl.from(subtitleRef.current, { opacity: 0, duration: 0.3 }, 0.25)
      tl.from(titleRef.current,    { opacity: 0, y: 24, duration: 0.6 }, 0.4)
      tl.from(terminalRef.current, { opacity: 0, duration: 0.3 }, 0.7)

      terminalLinesRef.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { opacity: 0, duration: 0.12 }, 0.85 + i * 0.1)
      })

      tl.from(win95Ref.current,       { x: '110%', opacity: 0, duration: 0.9, ease: 'power2.out' }, 1.2)
      tl.from(statsRef.current,       { opacity: 0, y: 16, duration: 0.4 }, 1.5)
      tl.from(artifactBtnRef.current, { opacity: 0, y: 10, duration: 0.4 }, 1.65)

      milestoneRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { opacity: 0, y: 48, duration: 0.6, ease: 'power2.out' }, 1.8 + i * 0.25)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-90s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden crt-flicker"
      style={{ background: '#060d06' }}
    >
      <div ref={crtOverlayRef} className="absolute inset-0 bg-black pointer-events-none" style={{ zIndex: 60 }} />

      {artifactOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 70 }}>
          <Windows95Desktop onExit={closeArtifact} />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40, background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40, background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.92) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30, background: 'rgba(0,20,0,0.25)', mixBlendMode: 'multiply' }} />

      <div className="era-watermark" style={{ fontFamily: 'var(--font-press-start)', color: '#00ff41' }}>1990s</div>

      <div className="relative h-full grid" style={{ gridTemplateColumns: '1fr 1fr', zIndex: 10 }}>
        {/* LEFT */}
        <div className="flex flex-col justify-center overflow-hidden" style={{ padding: 'clamp(24px,5vw,64px) clamp(16px,4vw,48px)' }}>
          <div ref={subtitleRef} style={{ fontFamily: 'var(--font-press-start)', fontSize: 'clamp(7px,0.9vw,11px)', color: 'rgba(0,255,65,0.55)', letterSpacing: '0.35em', marginBottom: '20px', textTransform: 'uppercase' }}>
            1990 — 2000
          </div>

          <h1 ref={titleRef} className="phosphor-pulse" style={{ fontFamily: 'var(--font-press-start)', fontSize: 'clamp(16px,3.2vw,46px)', color: '#00ff41', lineHeight: 1.45, marginBottom: '28px' }}>
            THE WILD<br />WEST OF<br />THE WEB
          </h1>

          <div ref={terminalRef} style={{ fontFamily: 'var(--font-vt323)', fontSize: 'clamp(14px,1.6vw,20px)', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(0,255,65,0.25)', padding: '14px 16px', maxWidth: '480px', lineHeight: 1.5 }}>
            {TERMINAL_LINES.map((line, i) => (
              <div key={i} ref={el => (terminalLinesRef.current[i] = el)} style={{ color: line.color, minHeight: '1.5em' }}>
                {line.text}
              </div>
            ))}
            <div style={{ color: '#00ff41', minHeight: '1.5em' }}>
              C:\&gt; <span className="cursor-blink">█</span>
            </div>
          </div>

          <div ref={statsRef} style={{ marginTop: '24px', display: 'flex', gap: 'clamp(16px,3vw,32px)', fontFamily: 'var(--font-vt323)' }}>
            {STATS.map(s => (
              <div key={s.value}>
                <div style={{ color: '#00ff41', fontSize: 'clamp(20px,2.4vw,32px)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: 'rgba(0,255,65,0.5)', fontSize: 'clamp(11px,1.2vw,15px)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            ref={artifactBtnRef}
            onClick={openArtifact}
            style={{ marginTop: '20px', alignSelf: 'flex-start', fontFamily: 'var(--font-press-start)', fontSize: 'clamp(6px,0.75vw,9px)', color: '#00ff41', background: 'transparent', border: '1px solid rgba(0,255,65,0.4)', padding: '8px 14px', cursor: 'pointer', letterSpacing: '0.12em', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,65,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            ► OPEN WINDOWS 95 DESKTOP
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center overflow-hidden gap-4" style={{ padding: 'clamp(16px,3vw,40px) clamp(12px,3vw,40px) clamp(16px,3vw,40px) 0' }}>
          <div ref={win95Ref} style={{ maxWidth: '500px', width: '100%' }}>
            <div className="win95-window">
              <div className="win95-titlebar">
                <span style={{ fontSize: '13px' }}>🌐</span>
                <span className="win95-title-text">Netscape Navigator – [Yahoo! – The Web Directory]</span>
                <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                  <button className="win95-btn">_</button>
                  <button className="win95-btn">□</button>
                  <button className="win95-btn">✕</button>
                </div>
              </div>
              <div className="win95-menubar">
                {['File','Edit','View','Go','Bookmarks','Options','Help'].map(m => <span key={m} className="win95-menu-item">{m}</span>)}
              </div>
              <div className="win95-addressbar">
                <span style={{ flexShrink: 0 }}>Address:</span>
                <div className="win95-inset" style={{ flex: 1 }}>
                  <span style={{ color: '#000080', fontSize: '11px' }}>http://www.yahoo.com/</span>
                </div>
                <button className="win95-btn" style={{ width: 'auto', padding: '0 6px' }}>Go</button>
              </div>
              <div style={{ background: '#fff', padding: '10px 12px', fontSize: '11px', color: '#000' }}>
                <div style={{ textAlign: 'center', fontSize: 'clamp(18px,3vw,28px)', fontWeight: '900', color: '#6600cc', fontFamily: 'Times New Roman, serif', marginBottom: '6px' }}>
                  <span style={{ color: '#ff0000' }}>Y</span><span style={{ color: '#ff6600' }}>a</span><span style={{ color: '#ffcc00' }}>h</span><span style={{ color: '#009900' }}>o</span><span style={{ color: '#0066ff' }}>o</span><span style={{ color: '#6600cc' }}>!</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'center', marginBottom: '8px' }}>
                  {['Arts & Humanities','Business & Economy','Computers & Internet','Education','Entertainment','Government','Health','News & Media','Science','Sports'].map(cat => (
                    <span key={cat} style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px' }}>{cat}</span>
                  ))}
                </div>
                <div style={{ textAlign: 'center', fontSize: '10px', color: '#333' }}>
                  You are visitor number <b style={{ color: '#cc0000' }}>1,337,042</b> · <span style={{ color: '#990000' }}>Best viewed in Netscape 3.0 at 800×600</span>
                </div>
              </div>
              <div className="win95-statusbar">
                <span className="win95-statusbar-panel">Document: Done</span>
                <span className="win95-statusbar-panel">🔒 Connected 14.4K</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxWidth: '500px', width: '100%' }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} ref={el => (milestoneRefs.current[i] = el)} style={{ background: 'rgba(0,255,65,0.04)', border: '1px solid rgba(0,255,65,0.2)', padding: '10px 12px' }}>
                <div style={{ fontFamily: 'var(--font-vt323)', fontSize: 'clamp(18px,2.2vw,26px)', color: '#00ff41', lineHeight: 1, marginBottom: '4px' }}>{m.year}</div>
                <div style={{ fontFamily: 'var(--font-press-start)', fontSize: 'clamp(6px,0.7vw,9px)', color: '#00ff41', marginBottom: '5px', lineHeight: 1.4 }}>{m.event}</div>
                <div style={{ fontFamily: 'var(--font-vt323)', fontSize: 'clamp(12px,1.3vw,16px)', color: 'rgba(0,255,65,0.6)', lineHeight: 1.35 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
