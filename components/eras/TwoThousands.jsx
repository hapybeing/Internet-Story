'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import EarlyGoogle from '@/components/artifacts/EarlyGoogle'
import MySpace     from '@/components/artifacts/MySpace'
import iPhone2007  from '@/components/artifacts/iPhone2007'

const AIM_BUDDIES = [
  { name: 'xX_DarkKnight_Xx', status: 'online', msg: 'chillin lol'            },
  { name: 'sk8rboi_2003',      status: 'away',   msg: 'at skool :('            },
  { name: 'PunkRocker99',      status: 'online', msg: 'listening 2 linkin park' },
  { name: 'CoolGirl4Life',     status: 'online', msg: '~*~butterfly~*~'        },
  { name: 'GamerzRule_Dave',   status: 'away',   msg: 'zzz'                    },
]

const MILESTONES = [
  { year: '2001', event: 'WIKIPEDIA', desc: 'Free encyclopedia launched; anyone can edit anything'         },
  { year: '2003', event: 'MYSPACE',   desc: 'Social networking goes mainstream. Glitter GIFs reign'        },
  { year: '2004', event: 'FACEBOOK',  desc: 'Zuckerberg launches "thefacebook" from his Harvard dorm'      },
  { year: '2005', event: 'YOUTUBE',   desc: '"Me at the zoo." First video. The world changes forever'       },
  { year: '2007', event: 'iPHONE',    desc: 'Jobs: "an iPod, a phone, and an internet communicator"'       },
  { year: '2008', event: 'BITCOIN',   desc: 'Satoshi Nakamoto publishes the Bitcoin whitepaper'            },
]

const ARTIFACTS = [
  { id: 'google',  label: '► OPEN GOOGLE 1998',     color: '#3333ff' },
  { id: 'myspace', label: '► OPEN MYSPACE PROFILE',  color: '#ff0099' },
  { id: 'iphone',  label: '► OPEN iPHONE 2007',     color: '#007AFF' },
]

export default function TwoThousands() {
  const sectionRef      = useRef(null)
  const titleRef        = useRef(null)
  const subtitleRef     = useRef(null)
  const aimRef          = useRef(null)
  const milestoneRefs   = useRef([])
  const progressBarRef  = useRef(null)
  const badgesRef       = useRef(null)
  const artifactBtnsRef = useRef(null)

  const [activeArtifact, setActiveArtifact] = useState(null)

  const openArtifact = (id) => {
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === sectionRef.current) st.disable()
    })
    setActiveArtifact(id)
  }

  const closeArtifact = () => {
    setActiveArtifact(null)
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
          end: '+=300%',
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          onEnter:     () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 1 } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 1 } })),
          onLeave:     () => window.dispatchEvent(new CustomEvent('era-transition-1-2')),
        },
      })

      tl.from(subtitleRef.current,     { opacity: 0, duration: 0.3 }, 0)
      tl.from(titleRef.current,        { opacity: 0, y: 30, duration: 0.7 }, 0.15)
      tl.from(progressBarRef.current,  { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0.4)
      tl.from(badgesRef.current,       { opacity: 0, duration: 0.4 }, 0.6)
      tl.from(aimRef.current,          { x: '110%', opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.5)
      tl.from(artifactBtnsRef.current, { opacity: 0, y: 10, duration: 0.4 }, 0.85)

      milestoneRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { opacity: 0, y: 40, duration: 0.55, ease: 'power2.out' }, 1.0 + i * 0.22)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-00s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0a1628 0%,#0d2045 40%,#1a1535 100%)' }}
    >
      {activeArtifact && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 70 }}>
          {activeArtifact === 'google'  && <EarlyGoogle onExit={closeArtifact} />}
          {activeArtifact === 'myspace' && <MySpace     onExit={closeArtifact} />}
          {activeArtifact === 'iphone'  && <iPhone2007  onExit={closeArtifact} />}
        </div>
      )}

      <div className="era-watermark" style={{ fontFamily: 'Arial Black, sans-serif', color: '#4a9fd6' }}>2000s</div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: 'linear-gradient(rgba(74,159,214,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(74,159,214,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative h-full grid" style={{ gridTemplateColumns: '1fr 1fr', zIndex: 10, alignItems: 'center' }}>

        {/* LEFT */}
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(24px,5vw,64px) clamp(16px,4vw,48px)' }}>
          <div ref={subtitleRef} style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif', fontSize: 'clamp(8px,1vw,12px)', color: 'rgba(74,159,214,0.7)', letterSpacing: '0.3em', marginBottom: '16px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            2000 — 2010
          </div>

          <h1 ref={titleRef} style={{ fontFamily: 'Trebuchet MS, Arial Black, sans-serif', fontSize: 'clamp(24px,4.5vw,58px)', fontWeight: '900', lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(to bottom,#ffffff 0%,#c8e6ff 40%,#7ab8f0 70%,#4a9fd6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            THE AGE<br />OF WEB 2.0
          </h1>

          <div style={{ marginBottom: '16px', maxWidth: '360px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(74,159,214,0.7)', fontFamily: 'Arial, sans-serif', marginBottom: '4px' }}>Loading MySpace profile... 47%</div>
            <div style={{ height: '14px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(74,159,214,0.4)', borderRadius: '2px', overflow: 'hidden' }}>
              <div ref={progressBarRef} style={{ height: '100%', width: '47%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.6) 0%,rgba(74,159,214,0.9) 50%,rgba(30,80,160,1) 100%)', boxShadow: '0 0 8px rgba(74,159,214,0.8)' }} />
            </div>
          </div>

          <div ref={badgesRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {[{ label: 'BETA', color: '#ff6600' },{ label: 'RSS', color: '#ff8800' },{ label: 'WEB 2.0', color: '#0099cc' },{ label: 'AJAX', color: '#339900' },{ label: 'MASHUP', color: '#9900cc' }].map(b => (
              <div key={b.label} style={{ background: b.color, color: '#fff', fontSize: '9px', fontFamily: 'Arial Black, sans-serif', fontWeight: '900', padding: '3px 8px', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
                {b.label}
              </div>
            ))}
          </div>

          <div ref={artifactBtnsRef} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ARTIFACTS.map(a => (
              <button
                key={a.id}
                onClick={() => openArtifact(a.id)}
                style={{ alignSelf: 'flex-start', fontFamily: 'Arial, sans-serif', fontSize: 'clamp(9px,0.9vw,11px)', fontWeight: 'bold', color: a.color, background: 'transparent', border: `1px solid ${a.color}55`, padding: '6px 12px', cursor: 'pointer', letterSpacing: '0.06em', transition: 'background 0.2s, border-color 0.2s', borderRadius: '2px' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${a.color}15`; e.currentTarget.style.borderColor = a.color }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${a.color}55` }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center gap-4 overflow-hidden" style={{ padding: 'clamp(16px,3vw,40px) clamp(12px,3vw,40px) clamp(16px,3vw,40px) 0' }}>
          <div ref={aimRef} style={{ maxWidth: '260px' }}>
            <div className="aim-window">
              <div className="aim-titlebar">
                <span style={{ fontSize: '13px' }}>💬</span>
                <span>AOL Instant Messenger</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {['_','□','×'].map(c => (
                    <button key={c} style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '2px', fontSize: '9px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ background: 'linear-gradient(to bottom,#c8e4f8,#a0cce8)', padding: '8px 10px', borderBottom: '1px solid #5a9fd4' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#003366' }}>🟡 xX_InternetUser_Xx</div>
                <div style={{ fontSize: '10px', color: '#555', fontStyle: 'italic', marginTop: '2px' }}>Away: "surfing the information superhighway"</div>
              </div>
              <div style={{ background: '#fff', padding: '4px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#444', padding: '3px 10px', background: '#d8edf8', borderBottom: '1px solid #b0d0e8', borderTop: '1px solid #b0d0e8' }}>Buddies (3/5 online)</div>
                {AIM_BUDDIES.map(buddy => (
                  <div key={buddy.name} style={{ padding: '3px 10px', fontSize: '11px', display: 'flex', gap: '6px', alignItems: 'flex-start', borderBottom: '1px solid #eee' }}>
                    <span>{buddy.status === 'online' ? '🟢' : '🟡'}</span>
                    <div>
                      <div className={buddy.status === 'online' ? 'aim-buddy-online' : 'aim-buddy-away'}>{buddy.name}</div>
                      <div style={{ fontSize: '9px', color: '#888', fontStyle: 'italic' }}>{buddy.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#e0eff8', padding: '6px 8px', display: 'flex', gap: '6px', borderTop: '1px solid #5a9fd4' }}>
                <button className="glossy-btn" style={{ fontSize: '9px', padding: '4px 10px', flex: 1 }}>IM</button>
                <button className="glossy-btn" style={{ fontSize: '9px', padding: '4px 10px', flex: 1 }}>Profile</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxWidth: '500px' }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} ref={el => (milestoneRefs.current[i] = el)} style={{ background: 'rgba(74,159,214,0.07)', border: '1px solid rgba(74,159,214,0.22)', borderRadius: '4px', padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom,rgba(255,255,255,0.06),transparent)', pointerEvents: 'none', borderRadius: '4px 4px 0 0' }} />
                <div style={{ fontFamily: 'Trebuchet MS, Arial, sans-serif', fontSize: 'clamp(16px,2vw,22px)', fontWeight: '900', color: '#4a9fd6', lineHeight: 1, marginBottom: '4px' }}>{m.year}</div>
                <div style={{ fontFamily: 'Arial Black, sans-serif', fontSize: 'clamp(6px,0.75vw,9px)', color: '#7ab8f0', marginBottom: '4px', letterSpacing: '0.05em' }}>{m.event}</div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(180,210,240,0.7)', lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
