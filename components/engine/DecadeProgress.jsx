'use client'

import { useEffect, useState } from 'react'

const ERAS = [
  { id: 0, year: '1990', color: '#00ff41' },
  { id: 1, year: '2000', color: '#4a9fd6' },
  { id: 2, year: '2010', color: '#007AFF' },
  { id: 3, year: '2020', color: '#a78bfa' },
  { id: 4, year: '2035', color: '#00d4ff' },
]

export default function DecadeProgress() {
  const [activeEra, setActiveEra] = useState(0)

  useEffect(() => {
    const onEraChange = (e) => setActiveEra(e.detail.eraIndex)
    window.addEventListener('era-change', onEraChange)
    return () => window.removeEventListener('era-change', onEraChange)
  }, [])

  const active = ERAS[activeEra]

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '14px 0',
          width: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {ERAS.map((era, i) => {
          const isActive = activeEra === i
          const isPast = i < activeEra

          return (
            <div
              key={era.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: '1px',
                    height: '20px',
                    background: isPast ? era.color : 'rgba(255,255,255,0.14)',
                    transition: 'background 0.6s ease',
                    margin: '2px 0',
                  }}
                />
              )}
              <div
                style={{
                  width: isActive ? '8px' : '5px',
                  height: isActive ? '8px' : '5px',
                  borderRadius: '50%',
                  background: isActive
                    ? era.color
                    : isPast
                    ? `${era.color}99`
                    : 'rgba(200,200,200,0.35)',
                  boxShadow: isActive
                    ? `0 0 8px ${era.color}, 0 0 20px ${era.color}80`
                    : 'none',
                  transition: 'all 0.4s ease',
                }}
              />
            </div>
          )
        })}
      </div>

      <div
        style={{
          position: 'fixed',
          left: '52px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          pointerEvents: 'none',
          fontFamily: 'var(--font-press-start)',
          fontSize: '7px',
          color: active.color,
          letterSpacing: '0.08em',
          textShadow: `0 0 8px ${active.color}80`,
          whiteSpace: 'nowrap',
          transition: 'color 0.4s ease',
        }}
      >
        {active.year}
      </div>
    </>
  )
}
