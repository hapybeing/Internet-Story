'use client'

// This component is loaded via next/dynamic with ssr:false in page.jsx.
// Three.js is imported inside useEffect (browser-only) as an extra safety
// layer — even if this file were somehow server-rendered, THREE would
// never execute at module level.

import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from '@/lib/gsap-config'

const AI_AGENTS = [
  {
    id: 'ARIA', version: 'v7.2', subtitle: 'Personal Intelligence', color: '#00d4ff',
    stats: [
      { label: 'Active Requests', value: '2,847'   },
      { label: 'Device Nodes',    value: '14'       },
      { label: 'Preference Acc.', value: '99.7%'   },
      { label: 'Last Sync',       value: '0.003ms' },
    ],
  },
  {
    id: 'NEXUS', version: 'v3.0', subtitle: 'Collective Intelligence', color: '#a78bfa',
    stats: [
      { label: 'Connected Nodes', value: '2.3B'    },
      { label: 'Consensus Speed', value: '0.003ms' },
      { label: 'Knowledge Graph', value: '847TB'   },
      { label: 'Global Sync',     value: 'LIVE'    },
    ],
  },
]

const SIGNALS = [
  { year: '2025', event: 'AI AGENTS REPLACE SAAS', desc: 'Autonomous agents manage entire workflows end-to-end'           },
  { year: '2027', event: 'NEURAL BROWSING BETA',   desc: 'First 10,000 users navigate the web via direct thought'         },
  { year: '2030', event: 'SPATIAL WEB DOMINANT',   desc: '3D internet becomes default protocol. 2D sites archived'        },
  { year: '2035', event: 'COLLECTIVE MIND LAYER',  desc: 'Human and AI cognition merge into shared planetary intelligence' },
]

const NEURAL_STATS = [
  { value: '12B',     label: 'Connected minds' },
  { value: '0.003ms', label: 'Avg latency'     },
  { value: '∞',       label: 'Bandwidth'       },
]

export default function Future() {
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const scanLineRef = useRef(null)
  const subtitleRef = useRef(null)
  const titleRef    = useRef(null)
  const taglineRef  = useRef(null)
  const statsRef    = useRef(null)
  const statusRef   = useRef(null)
  const agentRefs   = useRef([])
  const signalRefs  = useRef([])
  const [webglSupported, setWebglSupported] = useState(true)

  // ── Three.js ─────────────────────────────────────────────────────────
  // Dynamically imported inside useEffect so it NEVER runs on the server.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return

    // WebGL support check — graceful fallback
    const testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!testCtx) {
      setWebglSupported(false)
      return
    }

    let frameId
    let renderer, scene, camera, group, nodeMat, activeMat

    import('three').then((THREE) => {
      const W = window.innerWidth
      const H = window.innerHeight

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      scene  = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000)
      camera.position.z = 55

      const NODE_COUNT = 80
      const nodePos    = []
      const posArr     = new Float32Array(NODE_COUNT * 3)

      for (let i = 0; i < NODE_COUNT; i++) {
        const x = (Math.random() - 0.5) * 90
        const y = (Math.random() - 0.5) * 65
        const z = (Math.random() - 0.5) * 45
        posArr[i * 3] = x; posArr[i * 3 + 1] = y; posArr[i * 3 + 2] = z
        nodePos.push(new THREE.Vector3(x, y, z))
      }

      const nodeGeom = new THREE.BufferGeometry()
      nodeGeom.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      nodeMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.55, transparent: true, opacity: 0.65, sizeAttenuation: true })
      const nodeMesh = new THREE.Points(nodeGeom, nodeMat)

      const ACTIVE    = 10
      const picked    = Array.from({ length: NODE_COUNT }, (_, k) => k).sort(() => Math.random() - 0.5).slice(0, ACTIVE)
      const activeArr = new Float32Array(ACTIVE * 3)
      picked.forEach((idx, j) => { activeArr[j*3]=nodePos[idx].x; activeArr[j*3+1]=nodePos[idx].y; activeArr[j*3+2]=nodePos[idx].z })
      const activeGeom = new THREE.BufferGeometry()
      activeGeom.setAttribute('position', new THREE.BufferAttribute(activeArr, 3))
      activeMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, transparent: true, opacity: 0.9, sizeAttenuation: true })
      const activeMesh = new THREE.Points(activeGeom, activeMat)

      const THRESHOLD = 16
      const lineVerts = []
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (nodePos[i].distanceTo(nodePos[j]) < THRESHOLD) {
            lineVerts.push(nodePos[i].x, nodePos[i].y, nodePos[i].z, nodePos[j].x, nodePos[j].y, nodePos[j].z)
          }
        }
      }
      const lineGeom  = new THREE.BufferGeometry()
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3))
      const lineMat   = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.09 })
      const linesMesh = new THREE.LineSegments(lineGeom, lineMat)

      group = new THREE.Group()
      group.add(nodeMesh, activeMesh, linesMesh)
      scene.add(group)

      let t = 0
      const animate = () => {
        frameId = requestAnimationFrame(animate)
        t += 0.004
        group.rotation.y  += 0.0012
        group.rotation.x   = Math.sin(t * 0.25) * 0.07
        nodeMat.opacity    = 0.5  + Math.sin(t * 1.2)     * 0.18
        activeMat.opacity  = 0.7  + Math.sin(t * 2.2 + 1) * 0.22
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const w = window.innerWidth, h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      // Cleanup stored on the canvas element so the return closure can reach it
      canvas._cleanup = () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', onResize)
        nodeGeom.dispose(); nodeMat.dispose()
        activeGeom.dispose(); activeMat.dispose()
        lineGeom.dispose(); lineMat.dispose()
        renderer.dispose()
      }
    }).catch((err) => {
      console.warn('Three.js failed to load:', err)
      setWebglSupported(false)
    })

    return () => {
      if (canvas._cleanup) canvas._cleanup()
    }
  }, [])

  // ── GSAP — only touches HTML elements, never the canvas ──────────────
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Import ScrollTrigger locally — it's already registered via gsap-config
    // but we need the reference here for the scrollTrigger config
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=350%',
            scrub: 1.8,
            pin: true,
            anticipatePin: 1,
            onEnter:     () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 4 } })),
            onEnterBack: () => window.dispatchEvent(new CustomEvent('era-change', { detail: { eraIndex: 4 } })),
          },
        })

        // Scan line — ongoing ambience outside the scrub timeline
        if (scanLineRef.current) {
          gsap.fromTo(
            scanLineRef.current,
            { y: -2 },
            { y: window.innerHeight + 2, duration: 5, ease: 'none', repeat: -1 }
          )
        }

        gsap.to('.future-pulse-dot', {
          opacity: 0.2,
          duration: 1.1,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          stagger: { amount: 1.6 },
        })

        tl.from(subtitleRef.current, { opacity: 0, letterSpacing: '1.5em', duration: 0.5 }, 0)
        tl.fromTo(
          titleRef.current,
          { clipPath: 'inset(0 100% 0 0)', WebkitClipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)',   WebkitClipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut' },
          0.25
        )
        tl.from(taglineRef.current, { opacity: 0, y: 10, duration: 0.4 }, 0.8)
        tl.from(statsRef.current,   { opacity: 0, y: 14, duration: 0.4 }, 0.95)
        tl.from(statusRef.current,  { opacity: 0, duration: 0.4 }, 1.1)

        agentRefs.current.forEach((el, i) => {
          if (!el) return
          tl.from(el, { opacity: 0, y: 36, scale: 0.95, duration: 0.55, ease: 'power3.out' }, 1.2 + i * 0.25)
        })
        signalRefs.current.forEach((el, i) => {
          if (!el) return
          tl.from(el, { opacity: 0, x: 20, duration: 0.35, ease: 'power2.out' }, 1.5 + i * 0.14)
        })
      }, sectionRef)

      return () => ctx.revert()
    })
  }, [])

  return (
    <section
      id="era-future"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#00040a' }}
    >
      {/* Three.js canvas — pointer-events:none critical to not eat scroll */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
      />

      {/* WebGL fallback — static neural grid when WebGL unavailable */}
      {!webglSupported && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            backgroundImage:
              'radial-gradient(circle, rgba(0,212,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: 'linear-gradient(rgba(0,212,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.035) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,4,10,0.7) 100%)' }} />

      <div ref={scanLineRef} className="pointer-events-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '2px', background: 'linear-gradient(to right,transparent 0%,rgba(0,212,255,0.6) 50%,transparent 100%)', zIndex: 4, willChange: 'transform' }} />

      <div className="era-watermark" style={{ fontFamily: 'var(--font-orbitron)', color: '#00d4ff', fontWeight: 900 }}>2035</div>

      <div className="relative h-full grid" style={{ gridTemplateColumns: '1fr 1fr', zIndex: 10, alignItems: 'center' }}>

        {/* LEFT */}
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(24px,5vw,64px) clamp(16px,4vw,48px)' }}>
          <div ref={subtitleRef} style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(7px,0.75vw,9px)', letterSpacing: '0.55em', color: 'rgba(0,212,255,0.45)', marginBottom: '18px', textTransform: 'uppercase' }}>
            2035 — ∞
          </div>

          <h1 ref={titleRef} style={{ fontFamily: 'var(--font-orbitron)', fontWeight: '900', fontSize: 'clamp(28px,5vw,66px)', color: '#fff', lineHeight: 1.08, marginBottom: '14px', letterSpacing: '-0.01em' }}>
            THE<br />
            <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.6),0 0 80px rgba(0,212,255,0.2)' }}>NEURAL</span>
            <br />WEB
          </h1>

          <p ref={taglineRef} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(11px,1.2vw,15px)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '38ch' }}>
            Human and machine cognition converge.<br />
            The boundary between mind and interface dissolves.
          </p>

          <div ref={statsRef} style={{ display: 'flex', gap: 'clamp(18px,3vw,36px)', marginBottom: '24px' }}>
            {NEURAL_STATS.map(s => (
              <div key={s.value}>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: '700', fontSize: 'clamp(16px,2.2vw,28px)', color: '#00d4ff', lineHeight: 1, textShadow: '0 0 16px rgba(0,212,255,0.4)' }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(8px,0.8vw,10px)', color: 'rgba(0,212,255,0.4)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div ref={statusRef} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { label: 'NEURAL INTERFACE',    status: 'ACTIVE'  },
              { label: 'COLLECTIVE PROTOCOL', status: 'SYNCING' },
              { label: 'SPATIAL RENDERING',   status: 'LIVE'    },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="future-pulse-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 6px #00d4ff', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(6px,0.65vw,8px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(6px,0.65vw,8px)', color: '#00d4ff', letterSpacing: '0.1em', marginLeft: 'auto' }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center gap-4 overflow-hidden" style={{ padding: 'clamp(16px,3vw,48px) clamp(16px,3.5vw,48px) clamp(16px,3vw,48px) 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {AI_AGENTS.map((agent, i) => (
              <div key={agent.id} ref={el => (agentRefs.current[i] = el)} style={{ background: 'rgba(0,212,255,0.03)', border: `1px solid ${agent.color}25`, borderRadius: '12px', padding: 'clamp(10px,1.5vw,16px) clamp(12px,2vw,18px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to right,transparent,${agent.color}60,transparent)`, pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: '900', fontSize: 'clamp(14px,1.8vw,20px)', color: agent.color, textShadow: `0 0 18px ${agent.color}50`, lineHeight: 1 }}>{agent.id}</div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(6px,0.65vw,8px)', color: `${agent.color}80`, letterSpacing: '0.12em' }}>{agent.version}</div>
                  <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-outfit)', fontSize: 'clamp(8px,0.85vw,11px)', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{agent.subtitle}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                  {agent.stats.map(stat => (
                    <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '5px 8px' }}>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(6px,0.7vw,8px)', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{stat.label}</div>
                      <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: '700', fontSize: 'clamp(10px,1.2vw,14px)', color: agent.color }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(7px,0.75vw,9px)', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Forecast Signals
            </div>
            {SIGNALS.map((s, i) => (
              <div key={s.year} ref={el => (signalRefs.current[i] = el)} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '6px', borderBottom: '1px solid rgba(0,212,255,0.06)' }}>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(9px,1vw,12px)', fontWeight: '700', color: '#00d4ff', flexShrink: 0, lineHeight: 1.4, minWidth: '2.5em' }}>{s.year}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: '700', fontSize: 'clamp(8px,0.85vw,10px)', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>{s.event}</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(9px,0.9vw,11px)', color: 'rgba(255,255,255,0.25)', lineHeight: 1.45 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
