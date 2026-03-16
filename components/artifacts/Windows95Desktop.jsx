'use client'

import { useState, useRef } from 'react'

const DESKTOP_ICONS = [
  { id: 'mycomputer',  label: 'My Computer',     emoji: '🖥️'  },
  { id: 'recycle',     label: 'Recycle Bin',      emoji: '🗑️'  },
  { id: 'netscape',    label: 'Netscape',         emoji: '🌐'  },
  { id: 'myfiles',     label: 'My Documents',     emoji: '📁'  },
  { id: 'minesweeper', label: 'Minesweeper',      emoji: '💣'  },
  { id: 'paint',       label: 'MS Paint',         emoji: '🎨'  },
]

const CLOCK_TIME = '4:27 PM'

// A draggable Win95 window shell
function Win95Window({ title, icon, onClose, children, defaultPos = { x: 60, y: 40 }, style = {} }) {
  const [pos, setPos]       = useState(defaultPos)
  const [dragging, setDrag] = useState(false)
  const offset              = useRef({ x: 0, y: 0 })
  const windowRef           = useRef(null)

  const onMouseDown = (e) => {
    setDrag(true)
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    e.preventDefault()
  }

  const onMouseMove = (e) => {
    if (!dragging) return
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
  }

  const onMouseUp = () => setDrag(false)

  return (
    <div
      ref={windowRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex: 20,
        minWidth: '260px',
        cursor: dragging ? 'grabbing' : 'default',
        ...style,
      }}
    >
      <div className="win95-window" style={{ boxShadow: '3px 3px 0 #000' }}>
        {/* Title bar — drag handle */}
        <div
          className="win95-titlebar"
          onMouseDown={onMouseDown}
          style={{ cursor: 'grab' }}
        >
          <span style={{ fontSize: '13px', flexShrink: 0 }}>{icon}</span>
          <span className="win95-title-text">{title}</span>
          <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
            <button className="win95-btn" onClick={(e) => e.stopPropagation()}>_</button>
            <button className="win95-btn" onClick={(e) => e.stopPropagation()}>□</button>
            <button className="win95-btn" onClick={(e) => { e.stopPropagation(); onClose?.() }}>✕</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

// Minesweeper mini-game
function Minesweeper({ onClose }) {
  const SIZE   = 8
  const MINES  = 10
  const initGrid = () =>
    Array.from({ length: SIZE * SIZE }, (_, i) => ({
      id: i, revealed: false, flagged: false, mine: false, count: 0,
    }))

  const [grid, setGrid]     = useState(() => {
    const g = initGrid()
    // Place mines
    let placed = 0
    while (placed < MINES) {
      const idx = Math.floor(Math.random() * SIZE * SIZE)
      if (!g[idx].mine) { g[idx].mine = true; placed++ }
    }
    // Count neighbors
    g.forEach((cell, idx) => {
      if (cell.mine) return
      const row = Math.floor(idx / SIZE), col = idx % SIZE
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && g[nr * SIZE + nc].mine) count++
        }
      }
      g[idx].count = count
    })
    return g
  })
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon]           = useState(false)
  const [mineCount, setMineCount] = useState(MINES)

  const reveal = (idx) => {
    if (gameOver || won || grid[idx].flagged || grid[idx].revealed) return
    const newGrid = [...grid]

    if (newGrid[idx].mine) {
      newGrid.forEach(c => { if (c.mine) c.revealed = true })
      setGrid(newGrid)
      setGameOver(true)
      return
    }

    // Flood fill
    const queue = [idx]
    while (queue.length) {
      const i = queue.shift()
      if (newGrid[i].revealed) continue
      newGrid[i].revealed = true
      if (newGrid[i].count === 0 && !newGrid[i].mine) {
        const row = Math.floor(i / SIZE), col = i % SIZE
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr, nc = col + dc
            if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
              const ni = nr * SIZE + nc
              if (!newGrid[ni].revealed && !newGrid[ni].flagged) queue.push(ni)
            }
          }
        }
      }
    }

    setGrid(newGrid)
    const remaining = newGrid.filter(c => !c.mine && !c.revealed).length
    if (remaining === 0) setWon(true)
  }

  const flag = (e, idx) => {
    e.preventDefault()
    if (gameOver || won || grid[idx].revealed) return
    const newGrid = [...grid]
    newGrid[idx].flagged = !newGrid[idx].flagged
    setGrid(newGrid)
    setMineCount(prev => newGrid[idx].flagged ? prev - 1 : prev + 1)
  }

  const reset = () => {
    const g = initGrid()
    let placed = 0
    while (placed < MINES) {
      const idx = Math.floor(Math.random() * SIZE * SIZE)
      if (!g[idx].mine) { g[idx].mine = true; placed++ }
    }
    g.forEach((cell, idx) => {
      if (cell.mine) return
      const row = Math.floor(idx / SIZE), col = idx % SIZE
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && g[nr * SIZE + nc].mine) count++
        }
      }
      g[idx].count = count
    })
    setGrid(g)
    setGameOver(false)
    setWon(false)
    setMineCount(MINES)
  }

  const COUNT_COLORS = ['','#0000ff','#008000','#ff0000','#000080','#800000','#008080','#000000','#808080']

  return (
    <Win95Window title="Minesweeper" icon="💣" onClose={onClose} defaultPos={{ x: 80, y: 60 }}>
      <div style={{ padding: '6px', background: '#c0c0c0' }}>
        {/* Scorebar */}
        <div
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#c0c0c0',
            border: '2px solid', borderColor: '#808080 #fff #fff #808080',
            padding: '4px 8px', marginBottom: '6px',
          }}
        >
          <div style={{ background: '#000', color: '#f00', fontFamily: 'monospace', fontSize: '18px', padding: '2px 4px', minWidth: '36px', textAlign: 'right' }}>
            {String(mineCount).padStart(3,'0')}
          </div>
          <button
            onClick={reset}
            style={{ fontSize: '16px', background: '#c0c0c0', border: '2px solid', borderColor: '#fff #808080 #808080 #fff', padding: '2px 6px', cursor: 'pointer' }}
          >
            {gameOver ? '😵' : won ? '😎' : '🙂'}
          </button>
          <div style={{ background: '#000', color: '#f00', fontFamily: 'monospace', fontSize: '18px', padding: '2px 4px', minWidth: '36px', textAlign: 'right' }}>
            000
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: `repeat(${SIZE},1fr)`,
            border: '2px solid', borderColor: '#808080 #fff #fff #808080',
            gap: '0',
          }}
        >
          {grid.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => reveal(idx)}
              onContextMenu={(e) => flag(e, idx)}
              style={{
                width: '24px', height: '24px', padding: 0,
                background: cell.revealed ? '#c0c0c0' : '#c0c0c0',
                border: cell.revealed
                  ? '1px solid #808080'
                  : '2px solid', 
                borderColor: cell.revealed
                  ? '#808080'
                  : '#fff #808080 #808080 #fff',
                fontSize: '11px',
                cursor: 'default',
                color: cell.revealed && !cell.mine ? COUNT_COLORS[cell.count] : '#000',
                fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {cell.revealed
                ? cell.mine ? '💥' : cell.count > 0 ? cell.count : ''
                : cell.flagged ? '🚩' : ''}
            </button>
          ))}
        </div>

        {(gameOver || won) && (
          <div style={{ textAlign: 'center', padding: '6px', fontSize: '12px', fontFamily: 'Arial', fontWeight: 'bold', color: gameOver ? '#cc0000' : '#006600' }}>
            {gameOver ? 'BOOM! Game Over.' : '🎉 You Win!'}
          </div>
        )}
      </div>
    </Win95Window>
  )
}

// Notepad window
function Notepad({ onClose }) {
  const [text, setText] = useState(
    'Welcome to Windows 95!\r\n\r\nToday I connected to the internet for the first time.\r\nIt took 4 minutes to dial in.\r\nI visited Yahoo! and AltaVista.\r\nThis changes EVERYTHING.\r\n\r\n- a note from 1996'
  )
  return (
    <Win95Window title="Notepad — DIARY.TXT" icon="📝" onClose={onClose} defaultPos={{ x: 140, y: 100 }}>
      <div className="win95-menubar">
        {['File','Edit','Search','Help'].map(m => <span key={m} className="win95-menu-item">{m}</span>)}
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          width: '280px', height: '160px',
          fontFamily: 'Courier New, monospace', fontSize: '12px',
          background: '#fff', color: '#000',
          border: 'none', outline: 'none',
          padding: '4px 6px', resize: 'none',
          display: 'block',
        }}
      />
    </Win95Window>
  )
}

// My Computer window
function MyComputer({ onClose }) {
  const drives = [
    { label: '3½ Floppy (A:)',     emoji: '💾', free: '1.44 MB' },
    { label: 'Local Disk (C:)',    emoji: '🖴',  free: '2.1 GB'  },
    { label: 'CD-ROM Drive (D:)',  emoji: '💿', free: '—'        },
  ]
  return (
    <Win95Window title="My Computer" icon="🖥️" onClose={onClose} defaultPos={{ x: 100, y: 50 }}>
      <div className="win95-menubar">
        {['File','Edit','View','Help'].map(m => <span key={m} className="win95-menu-item">{m}</span>)}
      </div>
      <div style={{ padding: '10px', background: '#fff', minWidth: '220px' }}>
        {drives.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 4px', borderBottom: '1px solid #eee', fontSize: '11px', fontFamily: 'Arial, sans-serif', cursor: 'default' }}>
            <span style={{ fontSize: '20px' }}>{d.emoji}</span>
            <div>
              <div style={{ fontWeight: 'bold', color: '#000' }}>{d.label}</div>
              <div style={{ color: '#666', fontSize: '10px' }}>Free: {d.free}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="win95-statusbar">
        <span className="win95-statusbar-panel">3 object(s)</span>
        <span className="win95-statusbar-panel">2.1 GB free</span>
      </div>
    </Win95Window>
  )
}

// Start Menu
function StartMenu({ onOpen, onClose }) {
  const items = [
    { label: 'Programs',      emoji: '📂', action: null },
    { label: 'Documents',     emoji: '📝', action: () => { onOpen('notepad'); onClose() } },
    { label: 'Settings',      emoji: '⚙️',  action: null },
    { label: 'Find',          emoji: '🔍', action: null },
    { label: 'Help',          emoji: '❓', action: null },
    { label: 'Run...',        emoji: '▶️',  action: null },
    { label: '──────────────', emoji: '',   action: null, separator: true },
    { label: 'Shut Down...',  emoji: '🔌', action: null },
  ]

  return (
    <div
      style={{
        position: 'absolute', bottom: '30px', left: 0, zIndex: 100,
        background: '#c0c0c0',
        border: '2px solid', borderColor: '#fff #808080 #808080 #fff',
        boxShadow: '2px 2px 0 #000',
        width: '180px',
        fontFamily: 'Arial, sans-serif', fontSize: '11px',
      }}
    >
      {/* Windows 95 colorful side strip */}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '22px', background: 'linear-gradient(to top,#000080,#1084d0)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: '4px',
          }}
        >
          <span style={{ fontFamily: 'Arial Black, sans-serif', fontSize: '8px', fontWeight: '900', color: '#c0c0c0', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>
            Windows 95
          </span>
        </div>
        <div style={{ flex: 1 }}>
          {items.map((item, i) => (
            item.separator
              ? <div key={i} style={{ height: '1px', background: '#808080', margin: '2px 4px' }} />
              : (
                <div
                  key={item.label}
                  onClick={item.action || undefined}
                  style={{
                    padding: '4px 8px', display: 'flex', gap: '8px', alignItems: 'center',
                    cursor: item.action ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => { if (item.action) e.currentTarget.style.background = '#000080'; if (item.action) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000' }}
                >
                  <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              )
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Windows 95 Desktop ───────────────────────────────────────────────
export default function Windows95Desktop({ onExit }) {
  const [openWindows, setOpenWindows] = useState([])
  const [showStart, setShowStart]     = useState(false)
  const [time]                        = useState(CLOCK_TIME)

  const openWindow = (id) => {
    if (!openWindows.includes(id)) setOpenWindows(prev => [...prev, id])
  }
  const closeWindow = (id) => setOpenWindows(prev => prev.filter(w => w !== id))

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'teal',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, #008080 0%, #006666 100%)',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
      }}
      onClick={() => setShowStart(false)}
    >
      {/* Desktop Icons */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
        {DESKTOP_ICONS.map(icon => (
          <div
            key={icon.id}
            onDoubleClick={() => {
              if (icon.id === 'minesweeper') openWindow('minesweeper')
              else if (icon.id === 'myfiles')   openWindow('notepad')
              else if (icon.id === 'mycomputer') openWindow('mycomputer')
            }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '3px', width: '52px', cursor: 'pointer', padding: '3px',
            }}
          >
            <span style={{ fontSize: '26px', filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,0.5))' }}>{icon.emoji}</span>
            <span style={{ color: '#fff', fontSize: '10px', textAlign: 'center', textShadow: '1px 1px 1px #000', lineHeight: 1.2, wordBreak: 'break-word' }}>
              {icon.label}
            </span>
          </div>
        ))}
      </div>

      {/* Open windows */}
      {openWindows.includes('minesweeper') && <Minesweeper onClose={() => closeWindow('minesweeper')} />}
      {openWindows.includes('notepad')     && <Notepad     onClose={() => closeWindow('notepad')} />}
      {openWindows.includes('mycomputer')  && <MyComputer  onClose={() => closeWindow('mycomputer')} />}

      {/* Start menu */}
      {showStart && (
        <StartMenu
          onOpen={openWindow}
          onClose={() => setShowStart(false)}
        />
      )}

      {/* Taskbar */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px',
          background: '#c0c0c0',
          borderTop: '2px solid #fff',
          display: 'flex', alignItems: 'center', gap: '3px',
          padding: '0 3px', zIndex: 50,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Start button */}
        <button
          onClick={() => setShowStart(s => !s)}
          style={{
            height: '22px', padding: '0 8px',
            background: '#c0c0c0',
            border: showStart ? '2px inset #808080' : '2px solid', 
            borderColor: showStart ? '#808080' : '#fff #808080 #808080 #fff',
            display: 'flex', alignItems: 'center', gap: '4px',
            fontWeight: 'bold', fontSize: '11px', cursor: 'pointer',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <span style={{ fontSize: '14px' }}>🪟</span>
          <span>Start</span>
        </button>

        {/* Divider */}
        <div style={{ width: '2px', height: '22px', borderLeft: '1px solid #808080', borderRight: '1px solid #fff', margin: '0 3px' }} />

        {/* Open window buttons */}
        {openWindows.map(id => (
          <button
            key={id}
            style={{
              height: '22px', padding: '0 8px', maxWidth: '120px',
              background: '#c0c0c0',
              border: '2px solid', borderColor: '#808080 #fff #fff #808080',
              fontSize: '10px', cursor: 'pointer', fontFamily: 'Arial, sans-serif',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {id === 'minesweeper' ? '💣 Minesweeper' : id === 'notepad' ? '📝 DIARY.TXT' : '🖥️ My Computer'}
          </button>
        ))}

        {/* Clock + Exit */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {onExit && (
            <button
              onClick={onExit}
              style={{
                height: '22px', padding: '0 8px',
                background: '#c0c0c0',
                border: '2px solid', borderColor: '#fff #808080 #808080 #fff',
                fontSize: '10px', cursor: 'pointer', fontFamily: 'Arial, sans-serif',
                color: '#cc0000', fontWeight: 'bold',
              }}
            >
              ✕ EXIT
            </button>
          )}
          <div
            style={{
              height: '22px', padding: '0 8px',
              background: '#c0c0c0',
              border: '2px solid', borderColor: '#808080 #fff #fff #808080',
              display: 'flex', alignItems: 'center',
              fontSize: '11px', fontFamily: 'Arial, sans-serif',
            }}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  )
}
