'use client'

import { useEffect, useState } from 'react'

const ERAS = [
  { id: 0, label: '1990s', year: '1990', color: '#00ff41' },
  { id: 1, label: '2000s', year: '2000', color: '#4a9fd6' },
  { id: 2, label: '2010s', year: '2010', color: '#ff6b35' },
  { id: 3, label: '2020s', year: '2020', color: '#a78bfa' },
  { id: 4, label: 'FUTURE', year: '2035', color: '#00d4ff' },
]

export default function DecadeProgress() {
  const [activeEra, setActiveEra] = useState(0)

  useEffect(() => {
    const onEraChange = (e) => setActiveEra(e.detail.eraIndex)
    window.addEventListener('era-change', onEraChange)
    return () => window.removeEventListener('era-change', onEraChange)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 200,
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
          <div key={era.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {i > 0 && (
              <div
                style={{
                  width: '2px',
                  height: '32px',
                  background: isPast ? era.color : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.6s ease',
                }}
              />
            )}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: isActive ? '10px' : '5px',
                  height: isActive ? '10px' : '5px',
                  borderRadius: '50%',
                  background: isActive ? era.color : isPast ? era.color : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? `0 0 10px ${era.color}, 0 0 24px ${era.color}60` : 'none',
                  transition: 'all 0.4s ease',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '18px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-press-start)',
                  fontSize: '8px',
                  color: era.color,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                  transition: 'all 0.4s ease',
                  letterSpacing: '0.05em',
                }}
              >
                {era.year}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
