'use client'

import { useState } from 'react'

const TOP_8 = [
  { name: 'xX_EMOlover_Xx',  emoji: '🖤', status: 'in ur heart breakin it' },
  { name: 'sk8r_4_lyfe',      emoji: '🛹', status: 'shredding the gnar' },
  { name: 'GlitterQueen2005', emoji: '✨', status: '~*~sparkle~*~' },
  { name: 'NightcoreFan99',   emoji: '🎵', status: 'music is my life' },
  { name: 'TwilightRulez',    emoji: '🌙', status: 'team edward 4ever' },
  { name: 'XxRockChickxX',    emoji: '🎸', status: 'MCR saved my life' },
  { name: 'HotTopicKid',      emoji: '🖤', status: 'at the mall obviously' },
  { name: 'emo_princess_14',  emoji: '💜', status: 'nobody understands me' },
]

const COMMENTS = [
  { from: 'GlitterQueen2005', emoji: '✨', time: '8:42 PM', text: 'omg ur page is SO CUTE!! luv the layout bff!!! comment back?? <333' },
  { from: 'sk8r_4_lyfe',      emoji: '🛹', time: '4:17 PM', text: 'sup. nice page i guess lol. check out my new pics??' },
  { from: 'xX_EMOlover_Xx',   emoji: '🖤', time: '2:03 AM', text: 'ur music is amazing omg what song is this?? add me!!! xoxo' },
  { from: 'TwilightRulez',    emoji: '🌙', time: 'Yesterday', text: 'HAPPY BDAY!!!!! ur the best person ever!!!!! 143!!!!' },
]

const INTERESTS = ['MCR', 'Panic! at the Disco', 'The Used', 'Anime', 'Photography', 'Writing poetry', 'Hot Topic', 'Black nail polish']

export default function MySpace({ onExit }) {
  const [songPlaying, setSongPlaying] = useState(true)
  const [addedFriend, setAddedFriend] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments]       = useState(COMMENTS)
  const [showCommentBox, setShowCommentBox] = useState(false)

  const submitComment = () => {
    if (!commentText.trim()) return
    setComments(prev => [{
      from: 'You', emoji: '🙂', time: 'Just now', text: commentText,
    }, ...prev])
    setCommentText('')
    setShowCommentBox(false)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        background: '#000',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23ff00ff22\'/%3E%3C/svg%3E")',
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* ── Top navigation bar ── */}
      <div style={{ background: 'linear-gradient(to bottom,#3d0000,#1a0000)', borderBottom: '2px solid #ff0099', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>
          <span style={{ color: '#fff' }}>My</span><span style={{ color: '#ff0099' }}>Space</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
          {['Home', 'Browse', 'Search', 'Invite', 'Film', 'Mail', 'Blog', 'Favorites', 'Forum', 'Groups', 'Events', 'Videos', 'Music', 'Comedy', 'Classifieds'].map(n => (
            <span key={n} style={{ color: '#ff9999', textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap' }}>{n}</span>
          ))}
        </div>
        {onExit && (
          <button onClick={onExit} style={{ background: '#3d0000', border: '1px solid #ff0099', color: '#ff9999', padding: '2px 8px', fontSize: '10px', cursor: 'pointer' }}>
            ✕ Exit
          </button>
        )}
      </div>

      {/* ── Music player banner ── */}
      <div
        style={{
          background: 'linear-gradient(to right,#1a001a,#330033)',
          borderBottom: '1px solid #ff00ff44',
          padding: '6px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '11px',
        }}
      >
        <span style={{ color: '#ff00ff', fontSize: '14px' }}>♫</span>
        <span style={{ color: '#ccc' }}>Now Playing:</span>
        <span style={{ color: '#ff99ff', fontStyle: 'italic' }}>My Chemical Romance - Welcome to the Black Parade</span>
        <button
          onClick={() => setSongPlaying(s => !s)}
          style={{ background: '#330033', border: '1px solid #ff00ff', color: '#ff00ff', padding: '1px 8px', fontSize: '10px', cursor: 'pointer', borderRadius: '2px' }}
        >
          {songPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <span style={{ color: '#666', marginLeft: 'auto', fontSize: '10px' }}>Volume: ████░░ (auto-play ON)</span>
      </div>

      {/* ── Main 2-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '0', maxWidth: '900px', margin: '0 auto', padding: '10px' }}>

        {/* ═══ LEFT: Profile card ═══ */}
        <div style={{ paddingRight: '10px' }}>
          <div
            style={{
              background: 'linear-gradient(to bottom,#1a001a,#0d000d)',
              border: '1px solid #ff00ff44',
              padding: '10px',
            }}
          >
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div
                style={{
                  width: '100px', height: '100px',
                  margin: '0 auto 6px',
                  background: 'linear-gradient(135deg,#330033,#660066)',
                  border: '2px solid #ff00ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '48px',
                  boxShadow: '0 0 12px #ff00ff44',
                }}
              >
                🖤
              </div>
              <div style={{ fontWeight: 'bold', color: '#ff99ff', fontSize: '14px' }}>xX_S4D_EMO_Xx</div>
              <div style={{ color: '#666', fontSize: '10px' }}>23 years old</div>
              <div style={{ color: '#999', fontSize: '10px', fontStyle: 'italic', marginTop: '2px' }}>
                "nobody understands me"
              </div>
            </div>

            {/* Online now */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ background: '#006600', color: '#00ff00', fontSize: '9px', padding: '2px 8px', display: 'inline-block', border: '1px solid #00ff00' }}>
                ● Online Now!
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
              <button
                onClick={() => setAddedFriend(true)}
                style={{
                  background: addedFriend ? '#003300' : 'linear-gradient(to bottom,#cc0066,#990044)',
                  border: `1px solid ${addedFriend ? '#00ff00' : '#ff0099'}`,
                  color: addedFriend ? '#00ff00' : '#fff',
                  padding: '5px', fontSize: '11px', cursor: 'pointer',
                  width: '100%', fontWeight: 'bold',
                }}
              >
                {addedFriend ? '✓ Friend Added!' : '➕ Add to Friends'}
              </button>
              <button
                onClick={() => setShowCommentBox(s => !s)}
                style={{ background: 'linear-gradient(to bottom,#0044cc,#003399)', border: '1px solid #0099ff', color: '#fff', padding: '5px', fontSize: '11px', cursor: 'pointer', width: '100%' }}
              >
                💬 Add Comment
              </button>
              <button style={{ background: 'linear-gradient(to bottom,#444,#222)', border: '1px solid #666', color: '#ccc', padding: '5px', fontSize: '11px', cursor: 'pointer', width: '100%' }}>
                ✉ Send Message
              </button>
            </div>

            {/* Profile details */}
            <div style={{ fontSize: '10px', color: '#999', borderTop: '1px solid #330033', paddingTop: '8px' }}>
              <div style={{ marginBottom: '3px' }}><span style={{ color: '#ff99ff' }}>Status:</span> Single 💔</div>
              <div style={{ marginBottom: '3px' }}><span style={{ color: '#ff99ff' }}>Here for:</span> Friends, Dating</div>
              <div style={{ marginBottom: '3px' }}><span style={{ color: '#ff99ff' }}>Orientation:</span> Straight</div>
              <div style={{ marginBottom: '3px' }}><span style={{ color: '#ff99ff' }}>Body type:</span> Slim / Slender</div>
              <div style={{ marginBottom: '3px' }}><span style={{ color: '#ff99ff' }}>Ethnicity:</span> White / Caucasian</div>
              <div style={{ marginBottom: '8px' }}><span style={{ color: '#ff99ff' }}>Sign:</span> Scorpio ♏</div>
              <div style={{ color: '#666', fontSize: '9px' }}>
                Last Login: 2 hours ago<br />
                Profile Views: <b style={{ color: '#ff99ff' }}>14,832</b><br />
                Friends: <b style={{ color: '#ff99ff' }}>847</b>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: Main content ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* About me */}
          <div style={{ background: 'linear-gradient(to bottom,#0d000d,#1a001a)', border: '1px solid #ff00ff33', padding: '10px' }}>
            <div style={{ color: '#ff00ff', fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #ff00ff33', paddingBottom: '4px', marginBottom: '8px' }}>
              About me:
            </div>
            <div style={{ color: '#cc99ff', fontSize: '11px', lineHeight: 1.6 }}>
              heyyy im sarah 🖤 i love MCR, paramore, and taking random photos at midnight. im probably the most misunderstood person u will ever meet but thats ok bc music gets me. if u wanna know me just msg me or w/e<br /><br />
              <span style={{ color: '#ff99ff' }}>~~life is pain and thats beautiful~~</span>
            </div>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {INTERESTS.map(interest => (
                <span key={interest} style={{ background: '#330033', border: '1px solid #ff00ff44', color: '#ff99ff', fontSize: '9px', padding: '2px 6px' }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Top 8 */}
          <div style={{ background: 'linear-gradient(to bottom,#0d000d,#1a001a)', border: '1px solid #ff00ff33', padding: '10px' }}>
            <div style={{ color: '#ff00ff', fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #ff00ff33', paddingBottom: '4px', marginBottom: '8px' }}>
              Sarah's Top 8:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
              {TOP_8.map((friend, i) => (
                <div key={friend.name} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '48px', height: '48px', margin: '0 auto 3px',
                      background: `hsl(${i * 45},60%,15%)`,
                      border: `1px solid hsl(${i * 45},80%,40%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >
                    {friend.emoji}
                  </div>
                  <div style={{ color: '#ff99ff', fontSize: '9px', textDecoration: 'underline', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {friend.name}
                  </div>
                  <div style={{ color: '#666', fontSize: '8px', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {friend.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment box */}
          {showCommentBox && (
            <div style={{ background: '#0d000d', border: '1px solid #0099ff', padding: '10px' }}>
              <div style={{ color: '#0099ff', fontWeight: 'bold', fontSize: '11px', marginBottom: '6px' }}>Leave a Comment:</div>
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write something... add some xoxo!!"
                style={{
                  width: '100%', height: '60px', background: '#1a1a2e', border: '1px solid #0099ff44',
                  color: '#ccc', fontSize: '11px', padding: '4px 6px', resize: 'none', outline: 'none',
                  fontFamily: 'Verdana, Arial, sans-serif',
                }}
              />
              <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
                <button onClick={submitComment} style={{ background: '#0044cc', border: '1px solid #0099ff', color: '#fff', padding: '3px 12px', fontSize: '10px', cursor: 'pointer' }}>
                  Post Comment
                </button>
                <button onClick={() => setShowCommentBox(false)} style={{ background: '#222', border: '1px solid #666', color: '#ccc', padding: '3px 10px', fontSize: '10px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Comments section */}
          <div style={{ background: 'linear-gradient(to bottom,#0d000d,#1a001a)', border: '1px solid #ff00ff33', padding: '10px' }}>
            <div style={{ color: '#ff00ff', fontWeight: 'bold', fontSize: '12px', borderBottom: '1px solid #ff00ff33', paddingBottom: '4px', marginBottom: '8px' }}>
              Sarah's Comments ({comments.length}):
            </div>
            {comments.map((c, i) => (
              <div key={i} style={{ borderBottom: '1px dotted #330033', paddingBottom: '8px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', background: '#330033', border: '1px solid #ff00ff44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {c.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ color: '#ff99ff', fontSize: '10px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>{c.from}</span>
                    <span style={{ color: '#555', fontSize: '9px' }}>{c.time}</span>
                  </div>
                  <div style={{ color: '#ccc', fontSize: '11px', lineHeight: 1.4 }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '12px', fontSize: '10px', color: '#333', borderTop: '1px solid #330033', marginTop: '8px' }}>
        © 2006 MySpace.com. A News Corporation Company. All Rights Reserved.
        <br />
        <span style={{ color: '#ff00ff22' }}>★ Layout by PurpleGlitter_Layouts ★</span>
      </div>
    </div>
  )
}
