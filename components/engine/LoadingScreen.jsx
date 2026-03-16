'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-config'

const BOOT_LINES = [
  { text: 'BIOS v2.31 — Internet Time Machine Systems', delay: 0 },
  { text: 'Copyright (C) 1991-2035 ITM Corp.', delay: 120 },
  { text: '', delay: 200 },
  { text: 'Detecting memory... 640K OK', delay: 380 },
  { text: 'Loading temporal index...', delay: 560 },
  { text: 'Calibrating decade markers... [1990–2035]', delay: 740 },
  { text: 'Initializing CRT subsystem...', delay: 920 },
  { text: 'Mounting historical archive... OK', delay: 1080 },
  { text: '', delay: 1160 },
  { text: 'WARNING: Paradox protection disabled.', delay: 1260 },
  { text: 'Press any key to begin.', delay: 1480 },
]

export default function LoadingScreen({ onComplete }) {
  const containerRef   = useRef(null)
  const progressRef    = useRef(null)
  const progressBarRef = useRef(null)
  const yearRef        = useRef(null)
  const [lines, setLines]       = useState([])
  const [showPress, setShowPress] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Typewriter boot sequence
  useEffect(() => {
    const timers = []

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line.text])
      }, line.delay)
      timers.push(t)
    })

    // Show "press any key" blink after last line
    const t2 = setTimeout(() => setShowPress(true), 1700)
    timers.push(t2)

    return () => timers.forEach(clearTimeout)
  }, [])

  // Progress bar + year counter (runs independently of boot text)
  useEffect(() => {
    if (!progressBarRef.current || !yearRef.current) return

    const obj = { pct: 0, year: 1990 }

    gsap.to(obj, {
      pct: 100,
      year: 2035,
      duration: 2.2,
      ease: 'power1.inOut',
      delay: 0.3,
      onUpdate: () => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${obj.pct.toFixed(1)}%`
        }
        if (yearRef.current) {
          yearRef.current.textContent = Math.round(obj.year)
        }
      },
    })
  }, [])

  const dismiss = () => {
    if (dismissed) return
    setDismissed(true)

    // Exit animation: CRT power-off — screen compresses to horizontal line then vanishes
    const tl = gsap.timeline({ onComplete: () => onComplete?.() })
    tl.to(containerRef.current, {
      scaleY: 0.004,
      transformOrigin: '50% 50%',
      duration: 0.18,
      ease: 'power3.in',
    })
    tl.to(containerRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
    })
  }

  // Also dismiss on any keypress
  useEffect(() => {
    const onKey = () => { if (showPress) dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showPress])

  return (
    <div
      ref={containerRef}
      onClick={() => { if (showPress) dismiss() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: showPress ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.22) 2px,rgba(0,0,0,0.22) 4px)',
          zIndex: 2,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.88) 100%)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          width: 'min(680px, 90vw)',
          fontFamily: 'var(--font-vt323)',
          fontSize: 'clamp(14px,2vw,20px)',
          color: '#00ff41',
          lineHeight: 1.55,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-press-start)',
              fontSize: 'clamp(10px,1.6vw,16px)',
              color: '#00ff41',
              letterSpacing: '0.18em',
              lineHeight: 1.8,
              textShadow: '0 0 12px #00ff41, 0 0 32px rgba(0,255,65,0.4)',
            }}
          >
            ▓▓▓ INTERNET TIME MACHINE ▓▓▓
          </div>
          <div
            style={{
              fontFamily: 'var(--font-vt323)',
              fontSize: 'clamp(12px,1.4vw,17px)',
              color: 'rgba(0,255,65,0.45)',
              letterSpacing: '0.25em',
              marginTop: '4px',
            }}
          >
            1990 → 2035
          </div>
        </div>

        {/* Boot lines */}
        <div
          style={{
            background: 'rgba(0,20,0,0.5)',
            border: '1px solid rgba(0,255,65,0.18)',
            padding: 'clamp(12px,2vw,20px) clamp(14px,2.5vw,24px)',
            minHeight: '220px',
            marginBottom: '20px',
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                color: line === '' ? 'transparent'
                  : line.startsWith('WARNING') ? '#ffff00'
                  : line.startsWith('Press') ? '#00ff41'
                  : 'rgba(0,255,65,0.8)',
                minHeight: '1.55em',
              }}
            >
              {line || '\u00a0'}
            </div>
          ))}

          {showPress && (
            <div
              style={{
                color: '#00ff41',
                animation: 'cursor-blink 0.9s step-end infinite',
                fontFamily: 'var(--font-press-start)',
                fontSize: 'clamp(8px,1vw,11px)',
                marginTop: '8px',
                letterSpacing: '0.12em',
              }}
            >
              ► CLICK OR PRESS ANY KEY TO BEGIN
            </div>
          )}
        </div>

        {/* Progress */}
        <div>
          <div
            ref={progressRef}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
              fontSize: 'clamp(12px,1.4vw,16px)',
              color: 'rgba(0,255,65,0.55)',
            }}
          >
            <span>Loading temporal archive</span>
            <span ref={yearRef} style={{ color: '#00ff41', fontWeight: 'bold' }}>1990</span>
          </div>
          <div
            style={{
              height: '6px',
              background: 'rgba(0,255,65,0.1)',
              border: '1px solid rgba(0,255,65,0.2)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                height: '100%',
                width: '0%',
                background: 'linear-gradient(to right,#00cc33,#00ff41)',
                boxShadow: '0 0 8px rgba(0,255,65,0.7)',
                borderRadius: '1px',
                transition: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
