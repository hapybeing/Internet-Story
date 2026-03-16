'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

// Each transition has its own visual character:
//   0→1  (90s→00s):  Pixelated tile dissolve + fake Windows shutdown text
//   1→2  (00s→10s):  Loading bar progress sweep
//   2→3  (10s→20s):  Flat color block wipe
//   3→4  (20s→Future): Glass shatter → neural particles

const TRANSITIONS = [
  {
    from: 0, to: 1,
    label: 'It is now safe to turn off your computer.',
    sublabel: 'Windows 95 — Shutting down...',
    bg: '#000080',
    textColor: '#c0c0c0',
    font: 'var(--font-press-start)',
    fontSize: 'clamp(10px,1.4vw,14px)',
  },
  {
    from: 1, to: 2,
    label: 'Web 2.0 Loading... Please Wait',
    sublabel: 'Powered by AJAX™ & Web Standards',
    bg: '#0a1628',
    textColor: '#4a9fd6',
    font: 'Trebuchet MS, Arial, sans-serif',
    fontSize: 'clamp(11px,1.5vw,16px)',
  },
  {
    from: 2, to: 3,
    label: 'Entering the Glass Age',
    sublabel: 'Minimalism. Always.',
    bg: '#007AFF',
    textColor: '#fff',
    font: 'var(--font-outfit)',
    fontSize: 'clamp(13px,1.6vw,18px)',
  },
  {
    from: 3, to: 4,
    label: 'NEURAL HANDSHAKE INITIATED',
    sublabel: 'SYNCHRONIZING WITH 2035...',
    bg: '#000408',
    textColor: '#00d4ff',
    font: 'var(--font-orbitron)',
    fontSize: 'clamp(10px,1.3vw,14px)',
  },
]

// Single transition panel
function TransitionPanel({ config, index }) {
  const panelRef     = useRef(null)
  const textRef      = useRef(null)
  const subRef       = useRef(null)
  const barWrapRef   = useRef(null)
  const barFillRef   = useRef(null)
  const tilesRef     = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const showTransition = () => {
      const tl = gsap.timeline()

      if (config.from === 0) {
        // Windows shutdown: tiles dissolve in, text appears, tiles dissolve out
        const tiles = tilesRef.current?.children
        if (tiles) {
          tl.set(panel, { display: 'flex', opacity: 1 })
          tl.from(Array.from(tiles), {
            opacity: 0,
            scale: 0,
            duration: 0.04,
            stagger: { amount: 0.3, from: 'random' },
            ease: 'none',
          })
          tl.from(textRef.current,  { opacity: 0, duration: 0.2 }, 0.25)
          tl.from(subRef.current,   { opacity: 0, duration: 0.2 }, 0.38)
          tl.to(panel, { opacity: 0, duration: 0.4, delay: 0.5 })
          tl.set(panel, { display: 'none' })
        }
      } else if (config.from === 1) {
        // Web 2.0 loading bar sweep
        tl.set(panel, { display: 'flex', opacity: 1 })
        tl.from(textRef.current,   { opacity: 0, y: 10, duration: 0.25 })
        tl.from(barWrapRef.current,{ opacity: 0, duration: 0.2 }, 0.2)
        tl.from(barFillRef.current,{ scaleX: 0, transformOrigin: 'left', duration: 0.7, ease: 'power1.inOut' }, 0.3)
        tl.from(subRef.current,    { opacity: 0, duration: 0.2 }, 0.6)
        tl.to(panel, { opacity: 0, duration: 0.3, delay: 0.35 })
        tl.set(panel, { display: 'none' })
      } else if (config.from === 2) {
        // Flat color block wipe
        tl.set(panel, { display: 'flex', scaleX: 0, transformOrigin: 'left', opacity: 1 })
        tl.to(panel,  { scaleX: 1, duration: 0.3, ease: 'power3.inOut' })
        tl.from(textRef.current, { opacity: 0, duration: 0.15 }, 0.2)
        tl.from(subRef.current,  { opacity: 0, duration: 0.15 }, 0.3)
        tl.to(panel, { scaleX: 0, transformOrigin: 'right', duration: 0.3, ease: 'power3.inOut', delay: 0.3 })
        tl.set(panel, { display: 'none', scaleX: 1 })
      } else {
        // Neural shatter
        tl.set(panel, { display: 'flex', opacity: 0 })
        tl.to(panel,  { opacity: 1, duration: 0.25, ease: 'power2.in' })
        tl.from(textRef.current, { opacity: 0, letterSpacing: '1em', duration: 0.4 }, 0.15)
        tl.from(subRef.current,  { opacity: 0, duration: 0.25 }, 0.4)
        tl.to(panel, {
          opacity: 0,
          filter: 'blur(12px)',
          scale: 1.04,
          duration: 0.45,
          delay: 0.45,
          ease: 'power2.in',
        })
        tl.set(panel, { display: 'none', filter: 'blur(0px)', scale: 1 })
      }
    }

    window.addEventListener(`era-transition-${config.from}-${config.to}`, showTransition)
    return () => window.removeEventListener(`era-transition-${config.from}-${config.to}`, showTransition)
  }, [config])

  // Build 8×6 tile grid for the Windows transition
  const COLS = 12, ROWS = 8
  const tiles = Array.from({ length: COLS * ROWS })

  return (
    <div
      ref={panelRef}
      style={{
        display: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: config.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Pixel tiles overlay (used only for 90s→00s) */}
      {config.from === 0 && (
        <div
          ref={tilesRef}
          style={{
            position: 'absolute', inset: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS},1fr)`,
            gridTemplateRows: `repeat(${ROWS},1fr)`,
            pointerEvents: 'none', zIndex: 1,
          }}
        >
          {tiles.map((_, i) => (
            <div key={i} style={{ background: '#000080' }} />
          ))}
        </div>
      )}

      {/* Scanlines for 90s transition only */}
      {config.from === 0 && (
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)',
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <div
          ref={textRef}
          style={{
            fontFamily: config.font,
            fontSize: config.fontSize,
            color: config.textColor,
            letterSpacing: '0.08em',
            lineHeight: 1.5,
            marginBottom: '12px',
          }}
        >
          {config.label}
        </div>

        {/* Loading bar (Web 2.0 transition only) */}
        {config.from === 1 && (
          <div ref={barWrapRef} style={{ width: 'clamp(200px,30vw,380px)', margin: '0 auto 14px' }}>
            <div
              style={{
                height: '16px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(74,159,214,0.5)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                ref={barFillRef}
                style={{
                  height: '100%',
                  width: '100%',
                  background: 'linear-gradient(to bottom,rgba(255,255,255,0.6) 0%,rgba(74,159,214,0.9) 50%,rgba(30,80,160,1) 100%)',
                  boxShadow: '0 0 10px rgba(74,159,214,0.9)',
                }}
              />
            </div>
          </div>
        )}

        {/* Neural grid (Future transition) */}
        {config.from === 3 && (
          <div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(rgba(0,212,255,0.06) 1px,transparent 1px),' +
                'linear-gradient(90deg,rgba(0,212,255,0.06) 1px,transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}

        <div
          ref={subRef}
          style={{
            fontFamily: config.font,
            fontSize: `calc(${config.fontSize} * 0.7)`,
            color: `${config.textColor}99`,
            letterSpacing: '0.15em',
          }}
        >
          {config.sublabel}
        </div>
      </div>
    </div>
  )
}

// Mount all 4 transition panels; ScrollTrigger in each era fires the event
export default function EraTransitions() {
  return (
    <>
      {TRANSITIONS.map((config, i) => (
        <TransitionPanel key={i} config={config} index={i} />
      ))}
    </>
  )
}
