'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap-config'

const CHAT_MESSAGES = [
  { role: 'ai',   text: 'Good morning. 3 priority items flagged.'              },
  { role: 'user', text: 'Summarize the important one.'                          },
  { role: 'ai',   text: 'Board meeting moved to Thursday. Deck needs updating.' },
  { role: 'user', text: 'Draft an agenda.'                                      },
  { role: 'ai',   text: 'Done — 6 items, 45 min. Want me to send it?'          },
]

const MILESTONES = [
  { year: '2020', event: 'EVERYTHING REMOTE',  color: 'rgba(167,139,250,0.9)', desc: 'COVID forces the entire world online. Zoom becomes a verb'    },
  { year: '2021', event: 'NFT MANIA',          color: 'rgba(251,191,36,0.9)',  desc: 'Beeple sells a $69M JPEG. Everyone mints everything'           },
  { year: '2022', event: 'CHATGPT',            color: 'rgba(52,211,153,0.9)',  desc: '100M users in 60 days — fastest growing app in history'        },
  { year: '2023', event: 'AI REVOLUTION',      color: 'rgba(99,102,241,0.9)',  desc: 'GPT-4, Midjourney, Sora. Creative work transformed forever'    },
  { year: '2024', event: 'SPATIAL ERA',        color: 'rgba(244,114,182,0.9)', desc: 'Apple Vision Pro ships. The internet becomes three-dimensional' },
]

const STATS = [
  { value: '5.4B', label: 'Online users' },
  { value: '$15T', label: 'E-commerce'   },
  { value: '1M+',  label: 'AI models'    },
]

export default function TwentyTwenties() {
  const sectionRef    = useRef(null)
  const subtitleRef   = useRef(null)
  const titleRef      = useRef(null)
  const statsRef      = useRef(null)
  const chatRef       = useRef(null)
  const chatMsgRefs   = useRef([])
  const milestoneRefs = useRef([])

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
          onEnter:     () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 3 } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 3 } })),
          onLeave:     () => window.dispatchEvent(new CustomEvent('era-transition-3-4')),
          onLeaveBack: () => window.dispatchEvent(new CustomEvent('era-transition-2-3')),
        },
      })

      tl.from(subtitleRef.current, { opacity: 0, duration: 0.3 }, 0)
      tl.from(titleRef.current,    { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 0.15)
      tl.from(statsRef.current,    { opacity: 0, y: 14, duration: 0.35 }, 0.4)
      tl.from(chatRef.current,     { opacity: 0, y: 24, scale: 0.97, duration: 0.6, ease: 'power2.out' }, 0.35)

      chatMsgRefs.current.forEach((el, i) => {
        if (!el) return
        const isUser = el.dataset.role === 'user'
        tl.from(el, { opacity: 0, x: isUser ? 16 : -16, duration: 0.28 }, 0.75 + i * 0.15)
      })

      milestoneRefs.current.forEach((el, i) => {
        if (!el) return
        tl.from(el, { opacity: 0, y: 20, duration: 0.45, ease: 'power2.out' }, 1.1 + i * 0.18)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="era-20s"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0f0c1d 0%,#1a1030 55%,#0c1020 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 'clamp(250px,40vw,550px)', height: 'clamp(250px,40vw,550px)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: 'clamp(180px,28vw,400px)', height: 'clamp(180px,28vw,400px)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div className="era-watermark" style={{ fontFamily: 'var(--font-outfit)', color: '#a78bfa', fontWeight: 900 }}>2020s</div>

      <div className="relative h-full grid" style={{ gridTemplateColumns: '1fr 1fr', zIndex: 10, alignItems: 'center' }}>

        {/* LEFT */}
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(24px,5vw,64px) clamp(16px,4vw,48px)' }}>
          <div ref={subtitleRef} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,1vw,12px)', letterSpacing: '0.35em', color: 'rgba(167,139,250,0.6)', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '600' }}>
            2020 — 2025
          </div>

          <h1 ref={titleRef} style={{ fontFamily: 'var(--font-outfit)', fontWeight: '900', fontSize: 'clamp(28px,4.8vw,62px)', color: '#fff', lineHeight: 1.05, marginBottom: '22px', letterSpacing: '-0.02em' }}>
            THE GLASS<br />AGE OF AI
          </h1>

          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(20px,3.5vw,40px)', marginBottom: '28px' }}>
            {STATS.map(s => (
              <div key={s.value}>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(18px,2.4vw,30px)', color: '#a78bfa', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(8px,0.85vw,11px)', color: 'rgba(255,255,255,0.3)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div ref={chatRef} className="glass-card" style={{ maxWidth: 'clamp(280px,35vw,380px)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#a78bfa,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>✦</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(10px,1.1vw,13px)', fontWeight: '600', color: '#fff', lineHeight: 1 }}>AI Assistant</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '8px', color: 'rgba(167,139,250,0.7)', letterSpacing: '0.1em', marginTop: '2px' }}>GPT-4 POWERED</div>
              </div>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399', flexShrink: 0 }} />
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {CHAT_MESSAGES.map((msg, i) => (
                <div key={i} ref={el => { chatMsgRefs.current[i] = el; if (el) el.dataset.role = msg.role }} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ background: msg.role === 'user' ? 'linear-gradient(135deg,#7c3aed,#6366f1)' : 'rgba(255,255,255,0.07)', border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)', borderRadius: msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', padding: '6px 10px', maxWidth: '82%', fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,1vw,11px)', color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.82)', lineHeight: 1.45 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center overflow-hidden" style={{ padding: 'clamp(16px,3vw,48px) clamp(16px,3.5vw,48px) clamp(16px,3vw,48px) 0' }}>
          <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(8px,0.9vw,11px)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Decade Milestones
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} ref={el => (milestoneRefs.current[i] = el)} className="glass-card" style={{ display: 'flex', overflow: 'hidden', padding: 0, borderRadius: '10px' }}>
                <div style={{ width: '3px', background: m.color, flexShrink: 0 }} />
                <div style={{ padding: '9px 13px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: '800', fontSize: 'clamp(12px,1.4vw,16px)', color: m.color }}>{m.year}</span>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(7px,0.8vw,10px)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.event}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,0.95vw,12px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.45 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
