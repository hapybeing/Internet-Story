// Next.js 14 App Router generates /favicon.ico automatically from this file.
// No external image assets needed — it renders at build time.
// Uses the ImageResponse API (built into Next.js, no extra package needed).

import { ImageResponse } from 'next/og'

export const size        = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          borderRadius: '6px',
        }}
      >
        {/* Minimal clock/time icon representing the Time Machine concept */}
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid #00ff41',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Hour hand */}
          <div
            style={{
              position: 'absolute',
              width: '2px',
              height: '6px',
              background: '#00ff41',
              bottom: '50%',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: 'translateX(-50%) rotate(-45deg)',
              borderRadius: '1px',
            }}
          />
          {/* Minute hand */}
          <div
            style={{
              position: 'absolute',
              width: '1.5px',
              height: '7px',
              background: '#00ff41',
              bottom: '50%',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: 'translateX(-50%) rotate(60deg)',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
