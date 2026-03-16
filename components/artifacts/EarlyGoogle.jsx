'use client'

import { useState } from 'react'

const SEARCH_RESULTS = {
  'internet': [
    { title: 'What is the Internet? - A Beginners Guide', url: 'www.learnthenet.com/english/html/01broad.htm', desc: 'The Internet is a worldwide system of interconnected computer networks. Learn how to use it today!' },
    { title: 'Internet Society - The Internet is for Everyone', url: 'www.isoc.org/internet/history/', desc: 'History and development of the global internet. Founded in 1992 to provide leadership in education.' },
    { title: 'HowStuffWorks - How the Internet Works', url: 'www.howstuffworks.com/internet.htm', desc: 'Explains the inner workings of the Internet and the World Wide Web in plain English.' },
  ],
  'google': [
    { title: 'Google! - Search the Web', url: 'www.google.com', desc: "You're already here! Google indexes over 25 million web pages." },
    { title: 'About Google - Stanford BackRub Project', url: 'www.google.com/about.html', desc: 'Google began as a research project by Larry Page and Sergey Brin at Stanford University in 1996.' },
  ],
  'mp3': [
    { title: 'Napster - Music for Free!', url: 'www.napster.com', desc: 'Download any song for FREE. Over 80 million users. WARNING: May be illegal in your country.' },
    { title: 'MP3.com - Download Legal Music', url: 'www.mp3.com', desc: 'Discover new artists and download legal MP3 music files. Over 500,000 songs available.' },
    { title: 'Winamp - It Really Whips the Llama\'s Ass', url: 'www.winamp.com', desc: 'The best MP3 player on the planet. Download Winamp 2.95 now. Llama approved.' },
  ],
  'y2k': [
    { title: 'Y2K Bug - Will Computers Survive the Year 2000?', url: 'www.y2k.gov', desc: 'Government preparedness information. Stock up on water and canned goods. Do not panic.' },
    { title: 'Y2K Survival Guide', url: 'www.survivaly2k.com', desc: 'Everything you need to know to survive the coming computer apocalypse of January 1st, 2000.' },
  ],
  'default': [
    { title: 'AltaVista - The Search Company', url: 'www.altavista.com', desc: 'AltaVista provides the most comprehensive search of the Web. Over 150 million web pages indexed.' },
    { title: 'Yahoo! - The Web Directory', url: 'www.yahoo.com', desc: 'Yahoo! is the premier internet guide, with a directory of the best sites on the Web.' },
    { title: 'Ask Jeeves - Ask a Question', url: 'www.ask.com', desc: 'Ask Jeeves any question in plain English and he will find the answer for you on the World Wide Web.' },
    { title: 'Lycos - Your Personal Internet Guide', url: 'www.lycos.com', desc: 'Lycos helps you find what you are looking for on the Internet with advanced search technology.' },
  ],
}

const GOOGLE_DOODLES = [
  '🎉', '🎨', '🌍', '🔬', '🎭', '🏆',
]

export default function EarlyGoogle({ onExit }) {
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState(null)
  const [searching, setSearching] = useState(false)
  const [doodle]                = useState(() => GOOGLE_DOODLES[Math.floor(Math.random() * GOOGLE_DOODLES.length)])
  const [resultCount]           = useState(() => Math.floor(Math.random() * 900000) + 100000)
  const [searchTime]            = useState(() => (Math.random() * 0.4 + 0.08).toFixed(2))

  const doSearch = (q) => {
    const term = (q || query).toLowerCase().trim()
    if (!term) return
    setSearching(true)
    setResults(null)

    // Fake 1998-era latency
    setTimeout(() => {
      const key = Object.keys(SEARCH_RESULTS).find(k => term.includes(k)) || 'default'
      setResults({ query: q || query, items: SEARCH_RESULTS[key] })
      setSearching(false)
    }, 900)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') doSearch()
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '13px',
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* Top nav bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #ccc', padding: '2px 8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#333' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Web', 'Images', 'Groups', 'Directory'].map(t => (
            <span key={t} style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', color: '#333' }}>
          <span style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>Sign in</span>
        </div>
      </div>

      {!results && !searching ? (
        /* ── Homepage ── */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '80px' }}>
          {/* Logo */}
          <div style={{ marginBottom: '20px', textAlign: 'center', position: 'relative' }}>
            <div
              style={{
                fontSize: 'clamp(42px,8vw,72px)',
                fontWeight: '900',
                fontFamily: 'Arial Black, sans-serif',
                lineHeight: 1,
                letterSpacing: '-2px',
              }}
            >
              <span style={{ color: '#3333ff' }}>G</span>
              <span style={{ color: '#cc0000' }}>o</span>
              <span style={{ color: '#ffcc00' }}>o</span>
              <span style={{ color: '#3333ff' }}>g</span>
              <span style={{ color: '#009900' }}>l</span>
              <span style={{ color: '#cc0000' }}>e</span>
            </div>
            {/* Doodle decoration */}
            <div style={{ position: 'absolute', top: '-6px', right: '-24px', fontSize: '18px', transform: 'rotate(15deg)' }}>
              {doodle}
            </div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '2px', letterSpacing: '0.05em' }}>
              Beta — Searching 25,000,000 pages
            </div>
          </div>

          {/* Search box */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '480px', padding: '0 16px' }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              style={{
                width: '100%',
                padding: '5px 8px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '2px',
                outline: 'none',
                boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.15)',
                color: '#000',
              }}
              placeholder=""
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => doSearch()}
                style={{
                  padding: '4px 16px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '2px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                Google Search
              </button>
              <button
                onClick={() => doSearch()}
                style={{
                  padding: '4px 16px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '2px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                I'm Feeling Lucky
              </button>
            </div>
          </div>

          {/* Bottom links */}
          <div style={{ marginTop: '28px', fontSize: '11px', color: '#666', textAlign: 'center' }}>
            <div style={{ marginBottom: '6px' }}>
              {['Advertise with Us', 'Search Solutions', 'Services & Tools', 'Google Home'].map((l, i) => (
                <span key={l}>
                  {i > 0 && <span style={{ margin: '0 6px', color: '#999' }}>·</span>}
                  <span style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>{l}</span>
                </span>
              ))}
            </div>
            <div style={{ color: '#999', fontSize: '10px' }}>
              ©1998 Google Inc. All Rights Reserved.
            </div>
          </div>
        </div>
      ) : searching ? (
        /* ── Searching state ── */
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: '900', fontFamily: 'Arial Black, sans-serif' }}>
            <span style={{ color: '#3333ff' }}>G</span><span style={{ color: '#cc0000' }}>o</span><span style={{ color: '#ffcc00' }}>o</span><span style={{ color: '#3333ff' }}>g</span><span style={{ color: '#009900' }}>l</span><span style={{ color: '#cc0000' }}>e</span>
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Searching the web...</div>
          {/* Fake progress bar */}
          <div style={{ width: '200px', height: '8px', background: '#eee', border: '1px solid #ccc', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#3333ff', width: '0%', animation: 'none', transition: 'width 0.9s linear' }} />
          </div>
        </div>
      ) : (
        /* ── Results ── */
        <div style={{ padding: '8px 16px' }}>
          {/* Results search bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #3333ff' }}>
            <div style={{ fontSize: 'clamp(16px,3vw,24px)', fontWeight: '900', fontFamily: 'Arial Black, sans-serif', letterSpacing: '-1px', marginRight: '4px' }}>
              <span style={{ color: '#3333ff' }}>G</span><span style={{ color: '#cc0000' }}>o</span><span style={{ color: '#ffcc00' }}>o</span><span style={{ color: '#3333ff' }}>g</span><span style={{ color: '#009900' }}>l</span><span style={{ color: '#cc0000' }}>e</span>
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
              style={{ padding: '3px 6px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '2px', width: '220px', color: '#000' }}
            />
            <button onClick={() => doSearch()} style={{ padding: '3px 10px', background: '#f0f0f0', border: '1px solid #ccc', fontSize: '12px', cursor: 'pointer', color: '#000' }}>
              Search
            </button>
          </div>

          <div style={{ fontSize: '11px', color: '#666', marginBottom: '12px' }}>
            Results <b>1–{results.items.length}</b> of about <b>{resultCount.toLocaleString()}</b> for <b style={{ color: '#000' }}>"{results.query}"</b>. ({searchTime} seconds)
          </div>

          {results.items.map((r, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <div>
                <span style={{ color: '#000080', fontSize: '14px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'normal' }}>
                  {r.title}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#000', lineHeight: 1.5, maxWidth: '520px', margin: '2px 0' }}>
                {r.desc}
              </div>
              <div style={{ fontSize: '11px', color: '#009900' }}>{r.url}</div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                <span style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>Cached</span>
                {' - '}
                <span style={{ color: '#000080', textDecoration: 'underline', cursor: 'pointer' }}>Similar pages</span>
              </div>
            </div>
          ))}

          <div
            style={{ marginTop: '8px', cursor: 'pointer', color: '#000080', textDecoration: 'underline', fontSize: '12px' }}
            onClick={() => { setResults(null); setQuery('') }}
          >
            ← Back to Google Home
          </div>
        </div>
      )}

      {/* Exit button */}
      {onExit && (
        <button
          onClick={onExit}
          style={{
            position: 'absolute', top: '28px', right: '12px',
            background: '#f0f0f0', border: '1px solid #ccc',
            padding: '3px 10px', fontSize: '11px', cursor: 'pointer',
            color: '#cc0000', fontWeight: 'bold', zIndex: 10,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          ✕ Exit
        </button>
      )}
    </div>
  )
}
