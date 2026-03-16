'use client'

import { useState, useEffect } from 'react'

const APPS = [
  { id: 'phone',    label: 'Phone',    emoji: '📞', color: '#34C759', dock: true  },
  { id: 'mail',     label: 'Mail',     emoji: '✉️',  color: '#007AFF', dock: true  },
  { id: 'safari',   label: 'Safari',   emoji: '🧭', color: '#007AFF', dock: true  },
  { id: 'ipod',     label: 'iPod',     emoji: '🎵', color: '#FF9500', dock: true  },
  { id: 'sms',      label: 'Text',     emoji: '💬', color: '#34C759'              },
  { id: 'camera',   label: 'Camera',   emoji: '📷', color: '#888'                 },
  { id: 'calendar', label: 'Calendar', emoji: '📅', color: '#FF3B30'              },
  { id: 'photos',   label: 'Photos',   emoji: '🖼️',  color: '#FF9500'              },
  { id: 'youtube',  label: 'YouTube',  emoji: '▶️',  color: '#FF3B30'              },
  { id: 'stocks',   label: 'Stocks',   emoji: '📈', color: '#34C759'              },
  { id: 'maps',     label: 'Maps',     emoji: '🗺️',  color: '#007AFF'              },
  { id: 'weather',  label: 'Weather',  emoji: '🌤️',  color: '#007AFF'              },
  { id: 'clock',    label: 'Clock',    emoji: '🕐', color: '#1C1C1E'              },
  { id: 'calculator', label: 'Calc',   emoji: '🔢', color: '#888'                 },
  { id: 'notes',    label: 'Notes',    emoji: '📝', color: '#FFCC00'              },
  { id: 'settings', label: 'Settings', emoji: '⚙️',  color: '#888'                 },
]

const mainApps  = APPS.filter(a => !a.dock)
const dockApps  = APPS.filter(a => a.dock)

// SMS conversation
const SMS_THREAD = [
  { from: 'them', text: 'dude did u get the new iphone??'                          },
  { from: 'me',   text: 'yeah i waited in line for like 6 hours lol'               },
  { from: 'them', text: 'is it as good as jobs said?? can it really do internet??'  },
  { from: 'me',   text: 'bro its literally magic. its a phone + ipod + internet'    },
  { from: 'them', text: 'no way. how much did it cost'                              },
  { from: 'me',   text: '$599 for the 8gb. worth every penny'                       },
  { from: 'them', text: 'ur insane lol. my nokia works fine'                        },
  { from: 'me',   text: 'youll understand when you hold one. nothing is ever the same after' },
]

// Safari pages
const SAFARI_PAGES = {
  home: { title: 'Google', url: 'http://www.google.com', content: 'google' },
  maps: { title: 'Google Maps', url: 'http://maps.google.com', content: 'maps' },
}

function PhoneApp({ onBack }) {
  const [dialed, setDialed] = useState('')
  const [calling, setCalling] = useState(false)

  const dial = (d) => {
    if (calling) return
    setDialed(prev => (prev + d).slice(0, 10))
  }
  const call = () => {
    if (!dialed) return
    setCalling(true)
    setTimeout(() => setCalling(false), 2500)
  }

  const formatted = dialed.length === 10
    ? `(${dialed.slice(0,3)}) ${dialed.slice(3,6)}-${dialed.slice(6)}`
    : dialed

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', paddingBottom: '8px' }}>
      <div style={{ background: 'linear-gradient(to bottom,#1c1c1e,#2c2c2e)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#007AFF', fontSize: '11px', cursor: 'pointer' }}>‹ Back</button>
        <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>Keypad</span>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
        <div style={{ color: calling ? '#34C759' : '#fff', fontSize: calling ? '13px' : '22px', fontWeight: '300', minHeight: '36px', display: 'flex', alignItems: 'center', marginBottom: '8px', letterSpacing: '0.1em' }}>
          {calling ? '📞 Calling...' : formatted || ' '}
        </div>

        {/* Dial pad */}
        {[['1','2','3'],['4','5','6'],['7','8','9'],['*','0','#']].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '0', marginBottom: '1px' }}>
            {row.map(d => (
              <button
                key={d}
                onClick={() => dial(d)}
                style={{
                  width: '72px', height: '44px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '16px', fontWeight: '400',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                }}
              >
                {d}
                <span style={{ fontSize: '7px', color: '#888', letterSpacing: '0.1em', marginTop: '1px' }}>
                  {d === '2' ? 'ABC' : d === '3' ? 'DEF' : d === '4' ? 'GHI' : d === '5' ? 'JKL' : d === '6' ? 'MNO' : d === '7' ? 'PQRS' : d === '8' ? 'TUV' : d === '9' ? 'WXYZ' : ''}
                </span>
              </button>
            ))}
          </div>
        ))}

        {/* Call / delete row */}
        <div style={{ display: 'flex', gap: '0', marginTop: '4px' }}>
          <div style={{ width: '72px' }} />
          <button onClick={call} style={{ width: '72px', height: '44px', background: '#34C759', border: 'none', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            📞
          </button>
          <button onClick={() => setDialed(d => d.slice(0,-1))} style={{ width: '72px', height: '44px', background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  )
}

function SMSApp({ onBack }) {
  const [messages, setMessages] = useState(SMS_THREAD)
  const [input, setInput]       = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { from: 'me', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'them', text: 'omg no way!! 😂' }])
    }, 1200)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ background: 'linear-gradient(to bottom,#bfc6d0,#a8b2be)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #888' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#007AFF', fontSize: '11px', cursor: 'pointer' }}>‹ Back</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontWeight: '600', fontSize: '12px', color: '#000' }}>sk8r_4_lyfe</div>
          <div style={{ fontSize: '9px', color: '#666' }}>Text Message</div>
        </div>
        <button style={{ background: 'none', border: 'none', color: '#007AFF', fontSize: '11px', cursor: 'pointer' }}>Contact</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', background: '#fff' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                maxWidth: '70%',
                background: m.from === 'me'
                  ? 'linear-gradient(to bottom,#5cb8ff,#007AFF)'
                  : 'linear-gradient(to bottom,#f0f0f0,#e0e0e0)',
                borderRadius: m.from === 'me' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                padding: '6px 10px',
                fontSize: '11px',
                color: m.from === 'me' ? '#fff' : '#000',
                boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #ccc', padding: '4px 6px', display: 'flex', gap: '4px', alignItems: 'center', background: '#f0f0f0' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Text Message"
          style={{ flex: 1, padding: '4px 8px', borderRadius: '12px', border: '1px solid #ccc', fontSize: '11px', outline: 'none', background: '#fff', color: '#000' }}
        />
        <button onClick={send} style={{ background: '#007AFF', border: 'none', color: '#fff', borderRadius: '50%', width: '26px', height: '26px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ↑
        </button>
      </div>
    </div>
  )
}

function SafariApp({ onBack }) {
  const [url, setUrl]   = useState('http://www.google.com')
  const [page, setPage] = useState('google')
  const [loading, setLoading] = useState(false)

  const navigate = (u) => {
    setLoading(true)
    setTimeout(() => {
      if (u.includes('maps')) setPage('maps')
      else setPage('google')
      setLoading(false)
    }, 800)
    setUrl(u)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* Navigation bar */}
      <div style={{ background: 'linear-gradient(to bottom,#bfc6d0,#a8b2be)', padding: '4px 6px', borderBottom: '1px solid #888' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#007AFF', fontSize: '11px', cursor: 'pointer', padding: '0' }}>‹</button>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && navigate(url)}
            style={{ flex: 1, padding: '3px 8px', borderRadius: '6px', border: '1px solid #999', fontSize: '10px', textAlign: 'center', background: '#fff', color: '#333', outline: 'none' }}
          />
          <button onClick={() => navigate(url)} style={{ background: 'none', border: 'none', color: '#007AFF', fontSize: '14px', cursor: 'pointer' }}>⟳</button>
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '20px' }}>🧭</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Loading...</div>
          </div>
        ) : page === 'google' ? (
          <div style={{ padding: '16px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '10px', marginTop: '20px' }}>
              <span style={{ color: '#3333ff' }}>G</span><span style={{ color: '#cc0000' }}>o</span><span style={{ color: '#ffcc00' }}>o</span><span style={{ color: '#3333ff' }}>g</span><span style={{ color: '#009900' }}>l</span><span style={{ color: '#cc0000' }}>e</span>
            </div>
            <input placeholder="Search the web" style={{ width: '90%', padding: '5px 8px', border: '1px solid #ccc', borderRadius: '2px', fontSize: '12px', color: '#000', outline: 'none' }} />
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button style={{ padding: '4px 12px', background: '#f0f0f0', border: '1px solid #ccc', fontSize: '11px', cursor: 'pointer', color: '#000' }}>Google Search</button>
              <button style={{ padding: '4px 12px', background: '#f0f0f0', border: '1px solid #ccc', fontSize: '11px', cursor: 'pointer', color: '#000' }}>I'm Feeling Lucky</button>
            </div>
            <div style={{ marginTop: '16px', fontSize: '9px', color: '#666' }}>
              The internet, in your pocket.<br />
              <span style={{ color: '#007AFF', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('http://maps.google.com')}>Try Google Maps →</span>
            </div>
          </div>
        ) : (
          <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>📍 Google Maps</span>
            </div>
            <div
              style={{
                width: '100%', height: '140px',
                background: 'linear-gradient(135deg,#e8f4d0 0%,#d4e8b0 50%,#c8e090 100%)',
                borderRadius: '4px', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', border: '1px solid #aaa',
              }}
            >
              🗺️
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '20px' }}>📍</div>
            </div>
            <div style={{ fontSize: '9px', color: '#666', textAlign: 'center', marginTop: '4px' }}>
              You are here. (Turn-by-turn directions coming soon)
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div style={{ borderTop: '1px solid #999', background: 'linear-gradient(to bottom,#d0d7e0,#b8c2cc)', display: 'flex', padding: '3px 0' }}>
        {['‹', '›', '□', '⊕'].map((icon, i) => (
          <button key={i} style={{ flex: 1, background: 'none', border: 'none', fontSize: '14px', color: i < 2 ? '#888' : '#333', cursor: 'pointer', padding: '3px' }}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}

function iPodApp({ onBack }) {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(38)
  const [track, setTrack] = useState(0)

  const TRACKS = [
    { title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', duration: '5:13' },
    { title: 'Neon Tiger',                  artist: 'The Killers',          duration: '3:59' },
    { title: 'In the Morning',              artist: 'Junior Boys',          duration: '4:22' },
    { title: 'Umbrella',                    artist: 'Rihanna',              duration: '4:36' },
    { title: 'Stronger',                    artist: 'Kanye West',           duration: '5:11' },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1c1c1e' }}>
      <div style={{ background: 'linear-gradient(to bottom,#2c2c2e,#1c1c1e)', padding: '8px 12px', display: 'flex', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#FF9500', fontSize: '11px', cursor: 'pointer' }}>‹ Back</button>
        <div style={{ flex: 1, textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: '12px' }}>iPod</div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Album art */}
      <div style={{ margin: '12px auto', width: '120px', height: '120px', background: 'linear-gradient(135deg,#333,#111)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
        🎵
      </div>

      {/* Track info */}
      <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: '10px' }}>
        <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px', marginBottom: '2px' }}>{TRACKS[track].title}</div>
        <div style={{ color: '#888', fontSize: '11px' }}>{TRACKS[track].artist}</div>
      </div>

      {/* Progress */}
      <div style={{ padding: '0 16px', marginBottom: '10px' }}>
        <div style={{ height: '3px', background: '#333', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#FF9500', borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#666' }}>
          <span>1:58</span>
          <span>{TRACKS[track].duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
        <button onClick={() => setTrack(t => (t - 1 + TRACKS.length) % TRACKS.length)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>⏮</button>
        <button onClick={() => setPlaying(p => !p)} style={{ background: '#FF9500', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {playing ? '⏸' : '▶'}
        </button>
        <button onClick={() => setTrack(t => (t + 1) % TRACKS.length)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>⏭</button>
      </div>

      {/* Track list */}
      <div style={{ flex: 1, overflow: 'auto', borderTop: '1px solid #333' }}>
        {TRACKS.map((t, i) => (
          <div
            key={i}
            onClick={() => setTrack(i)}
            style={{
              padding: '8px 14px', display: 'flex', gap: '10px', alignItems: 'center',
              borderBottom: '1px solid #222', cursor: 'pointer',
              background: i === track ? 'rgba(255,149,0,0.1)' : 'transparent',
            }}
          >
            <div style={{ width: '16px', textAlign: 'center', fontSize: '10px', color: i === track ? '#FF9500' : '#555' }}>
              {i === track ? '♫' : i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: i === track ? '#FF9500' : '#fff', fontSize: '11px', fontWeight: i === track ? '600' : '400' }}>{t.title}</div>
              <div style={{ color: '#666', fontSize: '9px' }}>{t.artist}</div>
            </div>
            <div style={{ color: '#555', fontSize: '10px' }}>{t.duration}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main iPhone 2007 ────────────────────────────────────────────────────────
export default function iPhone2007({ onExit }) {
  const [activeApp, setActiveApp] = useState(null)
  const [time, setTime]           = useState(() => {
    const d = new Date()
    return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2,'0')}`
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date()
      setTime(`${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2,'0')}`)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        position: 'relative',
      }}
    >
      {onExit && (
        <button
          onClick={onExit}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', padding: '4px 12px', fontSize: '11px', cursor: 'pointer',
            borderRadius: '4px', zIndex: 10,
          }}
        >
          ✕ Exit
        </button>
      )}

      {/* iPhone body */}
      <div
        style={{
          width: '220px',
          height: '420px',
          background: 'linear-gradient(to bottom,#2a2a2a,#1a1a1a)',
          borderRadius: '28px',
          border: '1px solid #444',
          boxShadow: '0 0 0 1px #222, 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          gap: '6px',
          position: 'relative',
        }}
      >
        {/* Speaker */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
          <div style={{ width: '40px', height: '4px', background: '#333', borderRadius: '2px' }} />
        </div>

        {/* Screen */}
        <div
          style={{
            flex: 1,
            background: '#000',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Status bar */}
          <div
            style={{
              background: 'linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.4))',
              padding: '3px 8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '9px',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            <span style={{ fontWeight: '600' }}>AT&amp;T</span>
            <span style={{ fontWeight: '300', fontSize: '12px' }}>{time}</span>
            <span>🔋</span>
          </div>

          {/* App content */}
          {activeApp === 'phone'  && <PhoneApp  onBack={() => setActiveApp(null)} />}
          {activeApp === 'sms'    && <SMSApp    onBack={() => setActiveApp(null)} />}
          {activeApp === 'safari' && <SafariApp onBack={() => setActiveApp(null)} />}
          {activeApp === 'ipod'   && <iPodApp   onBack={() => setActiveApp(null)} />}

          {/* Home screen */}
          {!activeApp && (
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(to bottom,#1a3a6e 0%,#0a2040 100%)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* App grid */}
              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gap: '4px',
                  alignContent: 'start',
                  padding: '4px 0',
                }}
              >
                {mainApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        width: '38px', height: '38px',
                        background: app.color,
                        borderRadius: '9px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* iOS gloss */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.4),rgba(255,255,255,0.05))', borderRadius: '9px 9px 0 0', pointerEvents: 'none' }} />
                      {app.emoji}
                    </div>
                    <span style={{ color: '#fff', fontSize: '7px', textAlign: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.8)', lineHeight: 1.2 }}>
                      {app.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dock */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '5px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '4px',
                }}
              >
                {dockApps.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        width: '38px', height: '38px',
                        background: app.color,
                        borderRadius: '9px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.4),rgba(255,255,255,0.05))', borderRadius: '9px 9px 0 0', pointerEvents: 'none' }} />
                      {app.emoji}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Home button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
          <div
            onClick={() => setActiveApp(null)}
            style={{
              width: '28px', height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom,#3a3a3a,#1a1a1a)',
              border: '1px solid #555',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: '1px solid #666' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
