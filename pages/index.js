import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const games = [
  'Orion Stars','Fire Kirin','Milky Way','Panda Master',
  'Ultra Panda','VBLink','Egame','Juwa','Game Vault',
  'Vegas Sweeps','Yolo777','Game Room','Blue Dragon',
  'River Sweep','Royal Casino','Cash Machine','Big Winner',
  'Cash Vault','Mafia City','Mr All In One','Cash Frenzy',
  'Golden Treasure','Winstar','Lucky Stars','Vegas Luck',
  'Gem Slots','Ace','Juwa 2.0'
]

const CHIPS = ['🔴','🟡','🟢','🔵','⚫','🟠']
const SUITS = ['♠','♥','♦','♣']
const STATS = [
  { value:'27+', label:'Game Panels' },
  { value:'24/7', label:'Support' },
  { value:'instant', label:'Credit Delivery' },
  { value:'100%', label:'Secure' },
]

function FloatingChips() {
  const [chips, setChips] = useState([])
  useEffect(() => {
    const items = Array.from({length:18}, (_,i) => ({
      id: i,
      emoji: Math.random()>0.5 ? CHIPS[Math.floor(Math.random()*CHIPS.length)] : SUITS[Math.floor(Math.random()*SUITS.length)],
      left: Math.random()*100,
      delay: Math.random()*8,
      duration: 6+Math.random()*10,
      size: 14+Math.random()*22,
      opacity: 0.08+Math.random()*0.18,
    }))
    setChips(items)
  }, [])
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:0}}>
      {chips.map(c => (
        <div key={c.id} style={{
          position:'absolute', bottom:'-60px', left:`${c.left}%`,
          fontSize:c.size, opacity:c.opacity,
          animation:`floatUp ${c.duration}s ${c.delay}s infinite linear`,
          userSelect:'none',
        }}>{c.emoji}</div>
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function CountUp({ target, suffix='' }) {
  const [val, setVal] = useState(0)
  const ref = useRef()
  useEffect(() => {
    const num = parseInt(target) || 0
    if (!num) { setVal(target); return }
    let start = 0
    const step = Math.ceil(num/40)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setVal(num); clearInterval(timer) }
      else setVal(start)
    }, 40)
    return () => clearInterval(timer)
  }, [target])
  return <span>{val}{suffix}</span>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeGame, setActiveGame] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Casinoze Room — Play More. Win Bigger.</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { background: #06000f; color: #fff; font-family: 'Rajdhani', sans-serif; overflow-x: hidden; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #0d001f; }
          ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }

          @keyframes pulseGlow {
            0%,100% { box-shadow: 0 0 20px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.1); }
            50%      { box-shadow: 0 0 40px rgba(168,85,247,0.7), 0 0 100px rgba(168,85,247,0.25); }
          }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes fadeUp {
            from { opacity:0; transform:translateY(32px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes neonPulse {
            0%,100% { text-shadow: 0 0 8px #a855f7, 0 0 20px #a855f7, 0 0 40px #7c3aed; }
            50%      { text-shadow: 0 0 16px #c084fc, 0 0 40px #a855f7, 0 0 80px #9333ea; }
          }
          @keyframes borderGlow {
            0%,100% { border-color: rgba(168,85,247,0.4); }
            50%      { border-color: rgba(168,85,247,0.9); }
          }
          @keyframes bounce {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(-6px); }
          }

          .hero-title  { animation: fadeUp .8s ease both; }
          .hero-sub    { animation: fadeUp .8s .15s ease both; }
          .hero-btns   { animation: fadeUp .8s .3s ease both; }
          .hero-stats  { animation: fadeUp .8s .45s ease both; }

          .btn-primary {
            display:inline-block; padding:16px 40px;
            background: linear-gradient(135deg,#9333ea,#7c3aed,#6d28d9);
            color:#fff; border-radius:14px; font-family:'Rajdhani',sans-serif;
            font-size:17px; font-weight:700; text-decoration:none;
            letter-spacing:.04em; border:none; cursor:pointer;
            transition: transform .2s, box-shadow .2s;
            animation: pulseGlow 3s infinite;
          }
          .btn-primary:hover { transform:translateY(-3px) scale(1.03); }

          .btn-outline {
            display:inline-block; padding:15px 36px;
            background:transparent; color:#fff; border-radius:14px;
            font-family:'Rajdhani',sans-serif; font-size:17px; font-weight:700;
            text-decoration:none; letter-spacing:.04em; cursor:pointer;
            border:1.5px solid rgba(168,85,247,0.5);
            transition: border-color .2s, background .2s, transform .2s;
            animation: borderGlow 3s infinite;
          }
          .btn-outline:hover { background:rgba(168,85,247,0.12); transform:translateY(-3px); }

          .card-hover {
            transition: transform .25s, box-shadow .25s, border-color .25s;
          }
          .card-hover:hover {
            transform:translateY(-6px);
            box-shadow: 0 20px 60px rgba(168,85,247,0.25);
            border-color:rgba(168,85,247,0.6) !important;
          }

          .game-chip {
            transition: all .2s;
            cursor:default;
          }
          .game-chip:hover {
            background:rgba(168,85,247,0.25) !important;
            border-color:rgba(168,85,247,0.7) !important;
            color:#fff !important;
            transform:scale(1.06);
          }

          .logo-text {
            font-family:'Cinzel Decorative',serif;
            animation: neonPulse 4s infinite;
          }

          .nav-scrolled {
            background:rgba(6,0,15,0.92) !important;
            backdrop-filter:blur(16px);
            border-bottom:1px solid rgba(168,85,247,0.2) !important;
          }

          .roulette {
            animation: spin 12s linear infinite;
          }
          .bounce-arrow { animation: bounce 2s infinite; }
        `}</style>
      </Head>

      <FloatingChips />

      {/* NAV */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 40px',
        background: scrolled ? undefined : 'transparent',
        transition:'all .3s',
      }} className={scrolled?'nav-scrolled':''}>

        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{
            width:42,height:42,borderRadius:12,
            background:'linear-gradient(135deg,#9333ea,#fbbf24)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:22, boxShadow:'0 0 20px rgba(168,85,247,0.5)',
          }}>🎰</div>
          <span className="logo-text" style={{fontSize:19,color:'#fff',letterSpacing:'.02em'}}>
            Casinoze <span style={{color:'#fbbf24'}}>Room</span>
          </span>
        </div>

        {/* Links */}
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <Link href="/login" className="btn-outline" style={{padding:'9px 24px',fontSize:15}}>Login</Link>
          <Link href="/register" className="btn-primary" style={{padding:'9px 24px',fontSize:15}}>Join Now</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:'100vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'120px 24px 80px', position:'relative',
        background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(147,51,234,0.3) 0%, transparent 60%)',
        textAlign:'center',
      }}>

        {/* Spinning roulette behind hero */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:700, height:700, pointerEvents:'none', opacity:.04,
          fontSize:600, lineHeight:1,
          userSelect:'none',
        }} className="roulette">🎡</div>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'rgba(251,191,36,0.12)', color:'#fbbf24',
          border:'1px solid rgba(251,191,36,0.35)',
          borderRadius:99, padding:'6px 20px', fontSize:13,
          fontWeight:600, letterSpacing:'.06em',
          marginBottom:28, textTransform:'uppercase',
        }}>
          ✦ 27+ Game Panels · Instant Credits · 24/7 ✦
        </div>

        {/* H1 */}
        <h1 className="hero-title" style={{
          fontFamily:"'Cinzel Decorative',serif",
          fontSize:'clamp(38px,7vw,90px)',
          fontWeight:900, lineHeight:1.05,
          marginBottom:24, letterSpacing:'-.01em',
        }}>
          Play More.<br />
          <span style={{
            background:'linear-gradient(90deg,#a855f7 0%,#ec4899 40%,#fbbf24 100%)',
            backgroundSize:'200% auto',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            animation:'shimmer 3s linear infinite',
          }}>Win Bigger.</span>
        </h1>

        <p className="hero-sub" style={{
          color:'rgba(255,255,255,0.55)', fontSize:18,
          maxWidth:520, margin:'0 auto 40px', lineHeight:1.7,
          fontWeight:500,
        }}>
          One account. 27 game rooms. Deposit once, get credits automatically
          after approval. No hassle, pure play.
        </p>

        <div className="hero-btns" style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:64}}>
          <Link href="/register" className="btn-primary">🎲 Create Free Account</Link>
          <Link href="/login" className="btn-outline">Login</Link>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{
          display:'flex', gap:0, flexWrap:'wrap', justifyContent:'center',
          background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:20, overflow:'hidden',
        }}>
          {STATS.map((s,i) => (
            <div key={i} style={{
              padding:'20px 36px', textAlign:'center',
              borderRight: i<STATS.length-1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{
                fontFamily:"'Cinzel Decorative',serif",
                fontSize:26, fontWeight:700, color:'#fbbf24',
              }}>{s.value}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.45)',fontWeight:500,marginTop:4,letterSpacing:'.04em'}}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll arrow */}
        <div className="bounce-arrow" style={{marginTop:48,opacity:.4,fontSize:22}}>↓</div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:'80px 24px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{
            display:'inline-block',fontSize:12,fontWeight:700,
            letterSpacing:'.12em',textTransform:'uppercase',
            color:'#a855f7',marginBottom:12,
          }}>Simple Process</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'clamp(24px,4vw,40px)',fontWeight:700}}>
            How It Works
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24}}>
          {[
            {icon:'📝',step:'01',title:'Register',desc:'Create your free account in under 60 seconds. Your wallet is auto-created instantly.'},
            {icon:'💳',step:'02',title:'Deposit',desc:'Choose a payment method, enter amount, upload your screenshot. Fast approval.'},
            {icon:'🎮',step:'03',title:'Play',desc:'Credits appear in your game room automatically. No waiting, no manual steps.'},
          ].map((item,i) => (
            <div key={i} className="card-hover" style={{
              background:'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(168,85,247,0.06))',
              border:'1px solid rgba(168,85,247,0.2)',
              borderRadius:24, padding:36, position:'relative', overflow:'hidden',
            }}>
              <div style={{
                position:'absolute',top:16,right:20,
                fontFamily:"'Cinzel Decorative',serif",
                fontSize:52,fontWeight:900,color:'rgba(168,85,247,0.08)',
                lineHeight:1,
              }}>{item.step}</div>
              <div style={{fontSize:40,marginBottom:16}}>{item.icon}</div>
              <h3 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:20,fontWeight:700,marginBottom:12}}>
                {item.title}
              </h3>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:15,lineHeight:1.7,fontWeight:500}}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(168,85,247,0.4),transparent)',margin:'0 40px'}}/>

      {/* GAMES */}
      <section style={{padding:'80px 24px',background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(124,58,237,0.08) 0%,transparent 70%)'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#a855f7',marginBottom:12}}>
              All Platforms
            </div>
            <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'clamp(24px,4vw,40px)',fontWeight:700,marginBottom:12}}>
              Available Games
            </h2>
            <p style={{color:'rgba(255,255,255,0.45)',fontSize:16,fontWeight:500}}>
              One account unlocks every room below.
            </p>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
            {games.map((g,i) => (
              <span key={g} className="game-chip" style={{
                padding:'9px 18px',
                background: activeGame===g ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.04)',
                border:`1px solid ${activeGame===g?'rgba(168,85,247,0.7)':'rgba(255,255,255,0.1)'}`,
                borderRadius:12, fontSize:14, color:'rgba(255,255,255,0.8)',
                fontWeight:600,
              }}
              onMouseEnter={()=>setActiveGame(g)}
              onMouseLeave={()=>setActiveGame(null)}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{padding:'60px 24px'}}>
        <div style={{
          maxWidth:800, margin:'0 auto', textAlign:'center',
          background:'linear-gradient(135deg,rgba(147,51,234,0.2),rgba(124,58,237,0.1),rgba(251,191,36,0.08))',
          border:'1px solid rgba(168,85,247,0.35)',
          borderRadius:28, padding:'60px 40px',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute',inset:0,
            background:'radial-gradient(ellipse at 50% 0%,rgba(168,85,247,0.15),transparent 70%)',
            pointerEvents:'none',
          }}/>
          <div style={{fontSize:48,marginBottom:16}}>🎰</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:'clamp(22px,4vw,38px)',fontWeight:700,marginBottom:16}}>
            Ready to Play?
          </h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:17,marginBottom:36,fontWeight:500,lineHeight:1.6}}>
            Join thousands of players. Free to register. Instant credit delivery.
          </p>
          <Link href="/register" className="btn-primary" style={{fontSize:18,padding:'16px 48px'}}>
            🎲 Start Playing Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop:'1px solid rgba(255,255,255,0.07)',
        padding:'32px 40px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        flexWrap:'wrap', gap:16,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:18}}>🎰</span>
          <span style={{fontFamily:"'Cinzel Decorative',serif",fontSize:14,color:'rgba(255,255,255,0.4)'}}>
            Casinoze Room
          </span>
        </div>
        <div style={{color:'rgba(255,255,255,0.25)',fontSize:13,fontWeight:500}}>
          © 2025 Casinoze Room. All rights reserved.
        </div>
        <div style={{display:'flex',gap:20}}>
          {['Terms','Privacy','Support'].map(l => (
            <a key={l} href="#" style={{color:'rgba(255,255,255,0.3)',fontSize:13,textDecoration:'none',fontWeight:600,letterSpacing:'.04em'}}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}
