import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// ─── DATA ──────────────────────────────────────────────────────────────────

const GAMES = [
  { name: 'Orion Stars',    emoji: '⭐', hot: true,  bonus: 15 },
  { name: 'Fire Kirin',     emoji: '🔥', hot: true,  bonus: 10 },
  { name: 'Milky Way',      emoji: '🌌', hot: false, bonus: 10 },
  { name: 'Panda Master',   emoji: '🐼', hot: false, bonus: 10 },
  { name: 'Ultra Panda',    emoji: '🐼', hot: true,  bonus: 10 },
  { name: 'VBLink',         emoji: '💎', hot: true,  bonus: 10 },
  { name: 'Egame',          emoji: '🎮', hot: false, bonus: 16 },
  { name: 'Juwa',           emoji: '🎯', hot: true,  bonus: 10 },
  { name: 'Game Vault',     emoji: '🏆', hot: true,  bonus: 10 },
  { name: 'Vegas Sweeps',   emoji: '🎰', hot: true,  bonus: 10 },
  { name: 'Yolo777',        emoji: '7️⃣', hot: false, bonus: 10 },
  { name: 'Game Room',      emoji: '🃏', hot: true,  bonus: 10 },
  { name: 'Blue Dragon',    emoji: '🐉', hot: false, bonus: 10 },
  { name: 'River Sweep',    emoji: '🌊', hot: false, bonus: 10 },
  { name: 'Royal Casino',   emoji: '👑', hot: false, bonus: 10 },
  { name: 'Cash Machine',   emoji: '💵', hot: false, bonus: 10 },
  { name: 'Big Winner',     emoji: '🏅', hot: false, bonus: 10 },
  { name: 'Cash Vault',     emoji: '🔐', hot: false, bonus: 10 },
  { name: 'Mafia City',     emoji: '🌆', hot: false, bonus: 10 },
  { name: 'Mr All In One',  emoji: '🎲', hot: true,  bonus: 10 },
  { name: 'Cash Frenzy',    emoji: '💸', hot: false, bonus: 10 },
  { name: 'Golden Treasure',emoji: '✨', hot: false, bonus: 10 },
  { name: 'Winstar',        emoji: '🌟', hot: false, bonus: 10 },
  { name: 'Lucky Stars',    emoji: '🍀', hot: false, bonus: 10 },
  { name: 'Vegas Luck',     emoji: '🎲', hot: false, bonus: 10 },
  { name: 'Gem Slots',      emoji: '💎', hot: false, bonus: 10 },
  { name: 'Ace',            emoji: '🂡', hot: false, bonus: 10 },
  { name: 'Juwa 2.0',       emoji: '🎯', hot: true,  bonus: 10 },
]

const STEPS = [
  {
    num: '01',
    icon: '👤',
    title: 'Register Free',
    sub: 'Create Account',
    desc: '60-second signup. Your personal wallet and game account are created automatically the moment you join.',
    color: '#a855f7',
  },
  {
    num: '02',
    icon: '💳',
    title: 'Deposit Funds',
    sub: 'Upload & Approve',
    desc: 'Pick any payment method, upload your payment screenshot. Our team approves lightning fast.',
    color: '#f59e0b',
  },
  {
    num: '03',
    icon: '🎮',
    title: 'Credits Go Live',
    sub: 'Enjoy the Game',
    desc: 'Credits appear in your chosen game room automatically. Zero waiting, zero hassle — pure play.',
    color: '#10b981',
  },
]

const STATS = [
  { val: 28, suffix: '+', label: 'Game Panels' },
  { val: 10, suffix: 'k+', label: 'Active Players' },
  { val: 24, suffix: '/7', label: 'Live Support' },
  { val: 100, suffix: '%', label: 'Secure' },
]

const TESTIMONIALS = [
  { name: 'Jay G.',    tag: 'Elite Player', stars: 5, text: 'Credits hit my account in under 2 minutes after approval. Best platform I have used — fast, secure, and professional.' },
  { name: 'Ryan V.',   tag: 'VBLink Pro',   stars: 5, text: 'The auto-credit system is insane. Upload screenshot, get approved, boom — game credits instantly. Absolutely love it.' },
  { name: 'Daniel T.', tag: 'Game Vault',   stars: 5, text: '27+ games on one wallet?! This is the future. Support team is super responsive too. Highly recommended.' },
  { name: 'Mike R.',   tag: 'Fire Kirin',  stars: 5, text: 'I play across 4 different game rooms and manage everything from one dashboard. Casinoze Room is unmatched.' },
]

const FAQS = [
  { q: 'How do I start playing?',         a: 'Create a free account, make a deposit by uploading your payment screenshot, and credits appear in your game automatically after approval.' },
  { q: 'Is the platform free to join?',   a: 'Yes! Registration is 100% free. You only deposit when you want to play.' },
  { q: 'Can I play on mobile?',           a: 'Absolutely. Casinoze Room is fully optimized for mobile, tablet, and desktop.' },
  { q: 'How fast are deposits approved?', a: 'Most deposits are reviewed and approved within minutes during active hours.' },
  { q: 'How do I earn bonus credits?',    a: 'Every game offers a signup bonus. Refer friends and earn additional credits on their deposits.' },
]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  symbol: ['♠','♥','♦','♣','🎰','💎','🃏','⭐','🎲','👑'][i % 10],
  x: Math.random() * 100,
  dur: 10 + Math.random() * 16,
  delay: Math.random() * 12,
  size: 12 + Math.random() * 18,
  opacity: 0.03 + Math.random() * 0.09,
}))

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const num = parseInt(target) || 0
    const steps = 60, interval = duration / steps, inc = num / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= num) { setCount(num); clearInterval(t) } else setCount(Math.floor(cur))
    }, interval)
    return () => clearInterval(t)
  }, [started, target, duration])
  return [count, ref]
}

// ─── SMALL COMPONENTS ──────────────────────────────────────────────────────

function StatCard({ val, suffix, label }) {
  const [count, ref] = useCountUp(val)
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '28px 36px', borderRight: '1px solid rgba(255,255,255,0.06)', flex: 1, minWidth: 120 }}>
      <div style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 36, fontWeight: 900,
        background: 'linear-gradient(135deg,#f59e0b,#fbbf24,#fcd34d)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        lineHeight: 1, marginBottom: 8,
      }}>{count}{suffix}</div>
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>{label}</div>
    </div>
  )
}

function LiveBar() {
  const [players] = useState(() => 1247 + Math.floor(Math.random() * 400))
  const [wins] = useState(() => ['$240 on Fire Kirin', '$185 on VBLink', '$310 on Game Vault', '$95 on Orion Stars'])
  const [wi, setWi] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWi(p => (p + 1) % wins.length), 3000)
    return () => clearInterval(t)
  }, [wins.length])
  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(168,85,247,0.2)',
      padding: '8px 0', overflow: 'hidden', position: 'relative', zIndex: 101,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 40,
        animation: 'marquee 28s linear infinite',
        whiteSpace: 'nowrap', width: 'max-content',
      }}>
        {[...Array(3)].map((_, rep) => (
          <span key={rep} style={{ display: 'inline-flex', alignItems: 'center', gap: 32 }}>
            <span style={{ color: '#10b981', fontSize: 12, fontWeight: 700, letterSpacing: '.08em' }}>
              🟢 {players.toLocaleString()} PLAYERS ONLINE
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>✦</span>
            <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700 }}>
              🏆 LATEST WIN: {wins[wi]}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>✦</span>
            <span style={{ color: '#a855f7', fontSize: 12, fontWeight: 700 }}>
              💎 150% SIGNUP BONUS — LIMITED TIME OFFER
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>✦</span>
            <span style={{ color: '#ec4899', fontSize: 12, fontWeight: 700 }}>
              ⚡ AUTO CREDITS IN EVERY GAME ROOM
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function GameCard({ game, index }) {
  const [hov, setHov] = useState(false)
  const colors = ['#a855f7','#f59e0b','#10b981','#ec4899','#3b82f6','#ef4444']
  const c = colors[index % colors.length]
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: hov
          ? `linear-gradient(135deg, rgba(${c === '#a855f7' ? '168,85,247' : c === '#f59e0b' ? '245,158,11' : c === '#10b981' ? '16,185,129' : c === '#ec4899' ? '236,72,153' : c === '#3b82f6' ? '59,130,246' : '239,68,68'},.18), rgba(0,0,0,.4))`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? c : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20,
        padding: '22px 18px',
        cursor: 'pointer',
        transition: 'all .25s ease',
        transform: hov ? 'translateY(-6px) scale(1.03)' : 'none',
        boxShadow: hov ? `0 20px 50px rgba(0,0,0,.5), 0 0 30px ${c}33` : '0 4px 16px rgba(0,0,0,.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        textAlign: 'center',
      }}
    >
      {/* Bonus badge */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: 'rgba(16,185,129,0.9)', color: '#fff',
        fontSize: 9, fontWeight: 800, letterSpacing: '.06em',
        padding: '2px 7px', borderRadius: 99, textTransform: 'uppercase',
      }}>{game.bonus}% BONUS</div>

      {/* Hot badge */}
      {game.hot && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'linear-gradient(135deg,#ef4444,#f97316)',
          color: '#fff', fontSize: 9, fontWeight: 800,
          padding: '2px 7px', borderRadius: 99, letterSpacing: '.06em',
        }}>🔥 HOT</div>
      )}

      {/* Icon area */}
      <div style={{
        width: 72, height: 72, borderRadius: 16,
        background: `linear-gradient(135deg, ${c}22, ${c}08)`,
        border: `1px solid ${c}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32,
        boxShadow: hov ? `0 0 24px ${c}44` : 'none',
        transition: 'box-shadow .25s',
      }}>{game.emoji}</div>

      <div style={{
        fontSize: 11, fontWeight: 800, letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: hov ? '#fff' : 'rgba(255,255,255,0.65)',
        transition: 'color .2s',
      }}>{game.name}</div>

      {hov && (
        <div style={{
          fontSize: 10, color: c, fontWeight: 700,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>Play Now →</div>
      )}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(168,85,247,0.2)',
      borderRadius: 20, padding: '28px 24px',
      backdropFilter: 'blur(10px)',
      transition: 'all .3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(168,85,247,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ color: '#f59e0b', fontSize: 14, marginBottom: 12 }}>{'★'.repeat(t.stars)}</div>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
        "{t.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 900, color: '#fff',
        }}>{t.name[0]}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{t.name}</div>
          <div style={{ fontSize: 11, color: '#a855f7', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>{t.tag}</div>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      transition: 'all .2s',
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '20px 0', background: 'none',
          border: 'none', cursor: 'pointer', color: '#fff', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600 }}>{q}</span>
        <span style={{
          color: '#a855f7', fontSize: 22, fontWeight: 300,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s',
          flexShrink: 0, marginLeft: 16,
        }}>+</span>
      </button>
      {open && (
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.8, paddingBottom: 20 }}>{a}</div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [gameFilter, setGameFilter] = useState('all')

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    const onMouse = e => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMouse) }
  }, [])

  const px = (mousePos.x - .5) * 24
  const py = (mousePos.y - .5) * 24

  const filteredGames = gameFilter === 'hot' ? GAMES.filter(g => g.hot) : GAMES

  return (
    <>
      <Head>
        <title>Casinoze Room — #1 Game Room Platform</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="One account unlocks 28 premium fish game rooms. Deposit, get approved, play — credits hit automatically." />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            background: #04000d;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            overflow-x: hidden;
          }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #04000d; }
          ::-webkit-scrollbar-thumb { background: linear-gradient(#7c3aed, #f59e0b); border-radius: 2px; }

          /* Cursor */
          #cz-cursor {
            position: fixed; width: 10px; height: 10px;
            background: #f59e0b; border-radius: 50%;
            pointer-events: none; z-index: 9999;
            transform: translate(-50%,-50%);
            mix-blend-mode: screen;
            transition: width .15s, height .15s;
          }
          #cz-ring {
            position: fixed; width: 32px; height: 32px;
            border: 1.5px solid rgba(168,85,247,.55);
            border-radius: 50%; pointer-events: none; z-index: 9998;
            transform: translate(-50%,-50%);
          }

          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

          @keyframes floatUp {
            0%   { transform: translateY(110vh) rotate(0deg); opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 1; }
            100% { transform: translateY(-15vh) rotate(540deg); opacity: 0; }
          }

          @keyframes shimmer {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,.35), 0 0 60px rgba(168,85,247,.1); }
            50%       { box-shadow: 0 0 40px rgba(168,85,247,.65), 0 0 100px rgba(168,85,247,.25); }
          }

          @keyframes logoNeon {
            0%, 100% { text-shadow: 0 0 8px #a855f7, 0 0 24px #7c3aed; }
            50%       { text-shadow: 0 0 18px #c084fc, 0 0 50px #a855f7, 0 0 80px #9333ea; }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(36px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulseDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.5); opacity: .5; }
          }

          @keyframes stepLine {
            from { width: 0; }
            to   { width: 100%; }
          }

          @keyframes rotateOrb {
            from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
          }

          .fade1 { animation: fadeUp .8s .1s both; }
          .fade2 { animation: fadeUp .8s .25s both; }
          .fade3 { animation: fadeUp .8s .4s both; }
          .fade4 { animation: fadeUp .8s .55s both; }
          .fade5 { animation: fadeUp .8s .7s both; }

          .btn-gold {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 15px 40px;
            background: linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d);
            color: #04000d; font-family: 'Outfit', sans-serif;
            font-size: 15px; font-weight: 800;
            border-radius: 14px; text-decoration: none;
            letter-spacing: .04em; border: none; cursor: pointer;
            transition: transform .2s, box-shadow .2s;
            box-shadow: 0 0 28px rgba(245,158,11,.4), 0 4px 16px rgba(0,0,0,.4);
            position: relative; overflow: hidden;
          }
          .btn-gold::after {
            content: ''; position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
            transform: translateX(-100%); transition: transform .45s;
          }
          .btn-gold:hover::after { transform: translateX(100%); }
          .btn-gold:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 0 50px rgba(245,158,11,.6), 0 8px 28px rgba(0,0,0,.5); }

          .btn-outline {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 14px 36px;
            background: rgba(255,255,255,.04);
            border: 1.5px solid rgba(168,85,247,.45);
            color: #fff; font-family: 'Outfit', sans-serif;
            font-size: 15px; font-weight: 700;
            border-radius: 14px; text-decoration: none;
            letter-spacing: .04em; cursor: pointer;
            transition: all .2s; backdrop-filter: blur(12px);
          }
          .btn-outline:hover {
            background: rgba(168,85,247,.18);
            border-color: rgba(168,85,247,.85);
            transform: translateY(-3px);
            box-shadow: 0 0 28px rgba(168,85,247,.3);
          }

          .section-tag {
            display: inline-block;
            font-size: 11px; font-weight: 800;
            letter-spacing: .14em; text-transform: uppercase;
            padding: 5px 16px;
            border-radius: 99px;
            margin-bottom: 16px;
          }

          .game-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 14px;
          }

          @media (max-width: 640px) {
            .game-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
            .hero-btns { flex-direction: column; align-items: center; }
            .stats-bar { flex-direction: column; }
            .stats-bar > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,.06); }
          }
        `}</style>
      </Head>

      {/* Custom cursor */}
      <div id="cz-cursor" />
      <div id="cz-ring" />
      <script dangerouslySetInnerHTML={{__html:`
        const C=document.getElementById('cz-cursor'),R=document.getElementById('cz-ring');
        let mx=0,my=0,rx=0,ry=0;
        document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;C.style.left=mx+'px';C.style.top=my+'px'});
        (function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;R.style.left=rx+'px';R.style.top=ry+'px';requestAnimationFrame(loop)})();
      `}} />

      {/* Floating particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, bottom: '-10%',
            fontSize: p.size, opacity: p.opacity, userSelect: 'none',
            animation: `floatUp ${p.dur}s ${p.delay}s infinite linear`,
          }}>{p.symbol}</div>
        ))}
      </div>

      {/* Parallax orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: `calc(15% + ${py * 1.4}px)`, left: `calc(10% + ${px * 1.4}px)`,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%)',
          filter: 'blur(50px)', transition: 'top .15s, left .15s',
        }} />
        <div style={{
          position: 'absolute',
          top: `calc(55% + ${py * -.9}px)`, right: `calc(8% + ${px * -.9}px)`,
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,.09) 0%, transparent 70%)',
          filter: 'blur(60px)', transition: 'top .15s, right .15s',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%', left: '40%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,.07) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }} />
      </div>

      {/* ── LIVE TICKER ── */}
      <LiveBar />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 36, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px',
        background: scrollY > 40 ? 'rgba(4,0,13,.9)' : 'transparent',
        backdropFilter: scrollY > 40 ? 'blur(24px)' : 'none',
        borderBottom: scrollY > 40 ? '1px solid rgba(168,85,247,.18)' : 'none',
        transition: 'all .4s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: 'linear-gradient(135deg,#7c3aed,#f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, animation: 'glow 3s infinite',
            boxShadow: '0 0 20px rgba(168,85,247,.4)',
          }}>🎰</div>
          <div>
            <div style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 17, fontWeight: 900, letterSpacing: '.04em',
              animation: 'logoNeon 4s infinite',
            }}>
              CASINOZE <span style={{ color: '#f59e0b' }}>ROOM</span>
            </div>
            <div style={{ fontSize: 9, letterSpacing: '.16em', color: 'rgba(255,255,255,.3)', fontWeight: 700, textTransform: 'uppercase' }}>
              Premium Game Platform
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', gap: 28 }}>
            {[['Games','#games'],['How It Works','#how'],['Reviews','#reviews'],['FAQ','#faq']].map(([label, href]) => (
              <a key={label} href={href} style={{
                color: 'rgba(255,255,255,.6)', textDecoration: 'none',
                fontSize: 14, fontWeight: 600, letterSpacing: '.03em',
                transition: 'color .2s',
              }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.6)'}
              >{label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/login" className="btn-outline" style={{ padding: '9px 22px', fontSize: 13 }}>Login</Link>
            <Link href="/register" className="btn-gold" style={{ padding: '9px 22px', fontSize: 13 }}>🎲 Join Free</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '160px 24px 100px',
        textAlign: 'center',
        position: 'relative', zIndex: 2,
        background: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(124,58,237,.2) 0%, transparent 65%)',
      }}>
        {/* Bonus pill */}
        <div className="fade1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(245,158,11,.12)', border: '1px solid rgba(245,158,11,.35)',
          borderRadius: 99, padding: '6px 20px',
          fontSize: 12, fontWeight: 800, color: '#fbbf24',
          letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulseDot 1.5s infinite' }} />
          🎁 150% Signup Bonus — Limited Time
        </div>

        {/* Headline */}
        <h1 className="fade2" style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(34px, 7vw, 88px)',
          fontWeight: 900, lineHeight: 1.05,
          marginBottom: 12, letterSpacing: '-.01em',
        }}>
          Play Smart.
        </h1>
        <h1 className="fade3" style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(34px, 7vw, 88px)',
          fontWeight: 900, lineHeight: 1.05, marginBottom: 32,
          background: 'linear-gradient(90deg,#a855f7,#ec4899,#f59e0b,#a855f7)',
          backgroundSize: '300% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
        }}>Win Bigger.</h1>

        <p className="fade4" style={{
          color: 'rgba(255,255,255,.5)', fontSize: 18,
          maxWidth: 540, margin: '0 auto 48px', lineHeight: 1.8, fontWeight: 400,
        }}>
          One account unlocks <strong style={{ color: '#fff', fontWeight: 700 }}>28 premium game rooms</strong>.
          Deposit, get approved, play — credits appear in your game automatically. Zero waiting.
        </p>

        <div className="fade5 hero-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
          <Link href="/register" className="btn-gold" style={{ fontSize: 16, padding: '17px 48px' }}>🎲 Start Playing Free</Link>
          <Link href="/login" className="btn-outline" style={{ fontSize: 16, padding: '16px 40px' }}>Login to Account</Link>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          background: 'rgba(255,255,255,.025)',
          border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 22, overflow: 'hidden',
          animation: 'glow 5s infinite',
          backdropFilter: 'blur(12px)',
        }}>
          {STATS.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(168,85,247,.5),rgba(245,158,11,.3),transparent)', margin: '0 8%' }} />

      {/* ── GAMES SECTION ── */}
      <section id="games" style={{ padding: '100px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag" style={{ background: 'rgba(245,158,11,.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,.3)' }}>
              🎮 28 Premium Rooms
            </div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(26px,4.5vw,52px)', fontWeight: 700, marginBottom: 14,
            }}>Play & Level Up Gaming</h2>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 16, marginBottom: 32, fontWeight: 400 }}>
              One wallet. Every game. Credits delivered automatically.
            </p>
            {/* Filter tabs */}
            <div style={{ display: 'inline-flex', gap: 0, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: 4 }}>
              {[['all','All Games'],['hot','🔥 Hot Games']].map(([key,label]) => (
                <button key={key} onClick={() => setGameFilter(key)} style={{
                  padding: '8px 24px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700,
                  background: gameFilter === key ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent',
                  color: gameFilter === key ? '#fff' : 'rgba(255,255,255,.5)',
                  transition: 'all .2s',
                }}>{label}</button>
              ))}
            </div>
          </div>

          <div className="game-grid">
            {filteredGames.map((g, i) => <GameCard key={g.name} game={g} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,.3),rgba(168,85,247,.5),transparent)', margin: '0 8%' }} />

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{
        padding: '100px 24px',
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(124,58,237,.07) 0%,transparent 70%)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag" style={{ background: 'rgba(168,85,247,.12)', color: '#a855f7', border: '1px solid rgba(168,85,247,.3)' }}>
              ✦ Simple Process
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(26px,4.5vw,52px)', fontWeight: 700, marginBottom: 14 }}>
              Create Your Free Account &<br />Start Your Adventure
            </h2>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 16, fontWeight: 400 }}>
              Three steps. That's all it takes to start playing.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, position: 'relative' }}>
            {/* Connector line for desktop */}
            <div style={{
              position: 'absolute', top: 56, left: '16%', right: '16%',
              height: 1, background: 'linear-gradient(90deg,rgba(168,85,247,.5),rgba(245,158,11,.5),rgba(16,185,129,.5))',
              zIndex: 0,
            }} />

            {STEPS.map((s, i) => (
              <div key={i} style={{
                position: 'relative', zIndex: 1,
                background: 'rgba(255,255,255,.03)',
                border: `1px solid ${s.color}33`,
                borderRadius: 24, padding: '44px 28px 32px',
                textAlign: 'center',
                transition: 'all .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '99'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,.4), 0 0 40px ${s.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = s.color + '33'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Step number bubble */}
                <div style={{
                  position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}bb)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, color: '#fff',
                  boxShadow: `0 0 20px ${s.color}55`,
                }}>{i + 1}</div>

                <div style={{
                  width: 72, height: 72, borderRadius: 20, margin: '0 auto 20px',
                  background: `linear-gradient(135deg, ${s.color}22, ${s.color}0a)`,
                  border: `1px solid ${s.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>{s.icon}</div>

                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.sub}</div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, marginBottom: 14, color: '#fff' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / STATS BANNER ── */}
      <section style={{
        position: 'relative', zIndex: 2, overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(124,58,237,.12), rgba(245,158,11,.05))',
        borderTop: '1px solid rgba(168,85,247,.15)',
        borderBottom: '1px solid rgba(168,85,247,.15)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: About text */}
          <div>
            <div className="section-tag" style={{ background: 'rgba(168,85,247,.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,.3)' }}>
              About Casinoze Room
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>
              Forging Legends in<br />the Gaming Universe
            </h2>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              <strong style={{ color: '#a855f7' }}>Casinoze Room</strong> brings you the thrill of competitive fish gaming in a safe, automated, and rewarding online experience. Our mission is to deliver instant credits, fair play, and astonishing in-game achievements.
            </p>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, lineHeight: 1.9 }}>
              From classic fish games to modern sweepstakes rooms, our platform is built to give you an authentic, immersive arcade environment — all managed from one powerful wallet.
            </p>
            <div style={{ display: 'flex', gap: 48, marginTop: 36 }}>
              <div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 36, fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>10k+</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 6 }}>Daily Players</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 36, fontWeight: 900, color: '#a855f7', lineHeight: 1 }}>28+</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 6 }}>Game Rooms</div>
              </div>
            </div>
          </div>
          {/* Right: Visual card */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(168,85,247,.25)',
            borderRadius: 28, padding: '40px 32px',
            backdropFilter: 'blur(12px)',
            animation: 'glow 5s infinite',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🎰</div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Daily Mystery Drops</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, lineHeight: 1.7 }}>
                Choose your reward tier and let our platform elevate your day with exciting daily giveaways and milestone opportunities.
              </div>
            </div>
            <div style={{
              background: 'rgba(168,85,247,.08)', border: '1px solid rgba(168,85,247,.25)',
              borderRadius: 14, padding: '18px 20px', textAlign: 'center',
            }}>
              <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🎁 Stay Tuned for New Token Drops</div>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 12 }}>New gaming events added regularly. Check back soon!</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '80px 24px', position: 'relative', zIndex: 2,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,.1) 0%, transparent 70%)',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(124,58,237,.18), rgba(245,158,11,.06), rgba(124,58,237,.1))',
          border: '1px solid rgba(168,85,247,.35)',
          borderRadius: 32, padding: '72px 40px',
          position: 'relative', overflow: 'hidden',
          animation: 'glow 4s infinite',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,.2), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 16 }}>
            Join Our Elite Community
          </div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,4vw,46px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
            Unlock Your Potential &<br />Discover the Thrill of Winning!
          </h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.8, fontWeight: 400 }}>
            Step into the excitement of our elite game rooms. Select your strategy, make your first deposit, and watch credits appear instantly in your game.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-gold" style={{ fontSize: 16, padding: '17px 52px' }}>🎲 Create Free Account</Link>
            <Link href="#games" className="btn-outline" style={{ fontSize: 16, padding: '16px 40px' }}>Browse Games</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" style={{ padding: '80px 24px 100px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag" style={{ background: 'rgba(245,158,11,.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,.3)' }}>
              ★ Customer Feedback
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px,4vw,46px)', fontWeight: 700, marginBottom: 12 }}>
              Loved by Players Worldwide
            </h2>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 15 }}>
              Real players. Real wins. Real fast credits.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT + FAQ ── */}
      <section id="faq" style={{
        padding: '80px 24px 100px', position: 'relative', zIndex: 2,
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,.05) 0%, transparent 70%)',
        borderTop: '1px solid rgba(255,255,255,.05)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          {/* Contact */}
          <div>
            <div className="section-tag" style={{ background: 'rgba(16,185,129,.1)', color: '#10b981', border: '1px solid rgba(16,185,129,.3)' }}>
              Contact Us
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 12 }}>Get in Touch</h2>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
              Have questions or need support? Our team is here to help anytime — just send us a message.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['First Name','text'],['Last Name','text'],['Email','email'],['Phone','tel']].map(([label, type]) => (
                <input key={label} type={type} placeholder={label}
                  style={{
                    background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: 12, padding: '13px 18px', color: '#fff',
                    fontFamily: "'Outfit',sans-serif", fontSize: 14,
                    outline: 'none', transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.12)'}
                />
              ))}
              <textarea placeholder="Your message..." rows={4}
                style={{
                  background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 12, padding: '13px 18px', color: '#fff',
                  fontFamily: "'Outfit',sans-serif", fontSize: 14,
                  outline: 'none', resize: 'vertical', transition: 'border-color .2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.12)'}
              />
              <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}>
                Send Message
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="section-tag" style={{ background: 'rgba(168,85,247,.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,.3)' }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 12 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
              Everything you need to know about Casinoze Room.
            </p>
            <div>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '80px 24px', textAlign: 'center', position: 'relative', zIndex: 2,
        background: 'linear-gradient(180deg, transparent, rgba(124,58,237,.08), transparent)',
      }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px,4vw,44px)', fontWeight: 700, marginBottom: 16 }}>
          Start Your Journey by Creating<br />Your Free Account Today!
        </h2>
        <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
          Join thousands already winning. One click to register. Instant setup.
        </p>
        <Link href="/register" className="btn-gold" style={{ fontSize: 17, padding: '18px 60px' }}>
          🎰 Play Game Now
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: '40px 48px 28px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>🎰</span>
                <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 15, fontWeight: 900, letterSpacing: '.04em' }}>
                  CASINOZE <span style={{ color: '#f59e0b' }}>ROOM</span>
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,.25)', fontSize: 13, maxWidth: 260, lineHeight: 1.7 }}>
                The #1 game room management platform. One wallet, 28 game rooms, instant credits.
              </p>
            </div>
            {/* Links */}
            <div style={{ display: 'flex', gap: 60 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 16 }}>Platform</div>
                {['Games','How It Works','Register','Login'].map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}
                      onMouseEnter={e => e.target.style.color = '#a855f7'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
                    >{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 16 }}>Legal</div>
                {['Terms of Service','Privacy Policy','Support','Contact'].map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}
                      onMouseEnter={e => e.target.style.color = '#f59e0b'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
                    >{l}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: 'rgba(255,255,255,.18)', fontSize: 12 }}>© 2025 Casinoze Room. All rights reserved.</div>
            <div style={{ color: 'rgba(255,255,255,.18)', fontSize: 12 }}>Play responsibly. 18+</div>
          </div>
        </div>
      </footer>
    </>
  )
}
