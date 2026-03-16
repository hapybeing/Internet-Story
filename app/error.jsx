'use client'

// Next.js App Router error boundary.
// Catches any unhandled runtime errors in the component tree —
// most importantly Three.js WebGL context failures — and shows
// a graceful fallback instead of a blank white screen.

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log to console in development; swap for a proper error service in production
    console.error('Runtime error caught by boundary:', error)
  }, [error])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        fontFamily: 'monospace',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      {/* Scanlines for on-brand error page */}
      <div
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontSize: 'clamp(10px,1.4vw,14px)',
            color: '#ff4444',
            letterSpacing: '0.2em',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          ⚠ SYSTEM ERROR
        </div>

        <div
          style={{
            fontSize: 'clamp(24px,4vw,48px)',
            color: '#00ff41',
            fontWeight: '900',
            lineHeight: 1.2,
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(0,255,65,0.5)',
          }}
        >
          TEMPORAL
          <br />MALFUNCTION
        </div>

        <div
          style={{
            fontSize: 'clamp(11px,1.2vw,14px)',
            color: 'rgba(0,255,65,0.55)',
            maxWidth: '40ch',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          An unexpected error occurred in the time machine.
          <br />
          This may be caused by a WebGL context failure or
          browser compatibility issue.
        </div>

        <button
          onClick={reset}
          style={{
            background: 'transparent',
            border: '1px solid rgba(0,255,65,0.5)',
            color: '#00ff41',
            fontFamily: 'monospace',
            fontSize: 'clamp(10px,1.1vw,13px)',
            padding: '10px 24px',
            cursor: 'pointer',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,65,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          ► RESTART TIME MACHINE
        </button>
      </div>
    </div>
  )
}
