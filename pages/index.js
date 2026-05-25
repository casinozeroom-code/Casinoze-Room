import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

const GAMES = [
  'Orion Stars','Fire Kirin','Milky Way','Panda Master','Ultra Panda',
  'VBLink','Egame','Juwa','Game Vault','Vegas Sweeps','Yolo777',
  'Game Room','Blue Dragon','River Sweep','Royal Casino','Cash Machine',
  'Big Winner','Cash Vault','Mafia City','Mr All In One','Cash Frenzy',
  'Golden Treasure','Winstar','Lucky Stars','Vegas Luck','Gem Slots',
  'Ace','Juwa 2.0'
]

const STEPS = [
  { icon:'👤', num:'01', title:'Register Free', desc:'60-second sign up. Your personal wallet is created automatically the moment you join.' },
  { icon:'💳', num:'02', title:'Deposit Funds', desc:'Pick any payment method. Upload your screenshot. Our team approves lightning fast.' },
  { icon:'🎮', num:'03', title:'Credits Go Live', desc:'Credits appear in your chosen game room automatically. Zero waiting, zero hassle.' },
]

const STATS = [
  { val:'27', suffix:'+', label:'Game Panels' },
  { val:'10000', suffix:'+', label:'Active Players' },
  { val:'24', suffix:'/7', label:'Support' },
  { val:'100', suffix:'%', label:'Secure' },
]

const PARTICLES = Array.from({length:30},(_,i)=>({
  id:i,
  symbol: ['♠','♥','♦','♣','🎰','💎','🃏','⭐','🎲'][i%9],
  x: Math.random()*100,
  y: Math.random()*100,
  size: 10+Math.random()*20,
  dur: 8+Math.random()*14,
  delay: Math.random()*10,
  opacity: 0.04+Math.random()*0.12,
}))

function useCountUp(target, duration=2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef()
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setStarted(true) },{threshold:.3})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[])
  useEffect(()=>{
    if(!started) return
    const num = parseInt(target)||0
    const steps = 60, interval = duration/steps, inc = num/steps
    let cur=0, t=setInterval(()=>{
      cur+=inc; if(cur>=num){setCount(num);clearInterval(t)}else setCount(Math.floor(cur))
    },interval)
    return ()=>clearInterval(t)
  },[started,target,duration])
  return [count, ref]
}

function StatCard({val,suffix,label}){
  const [count,ref] = useCountUp(val)
  return (
    <div ref={ref} style={{textAlign:'center',padding:'24px 32px',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
      <div style={{
        fontFamily:"'Playfair Display',serif",
        fontSize:38,fontWeight:900,
        background:'linear-gradient(135deg,#fbbf24,#f59e0b)',
        WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
        lineHeight:1,marginBottom:6,
      }}>{count}{suffix}</div>
      <div style={{fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',fontWeight:600}}>{label}</div>
    </div>
  )
}

function LiveBadge(){
  const [players] = useState(()=>Math.floor(1200+Math.random()*300))
  return (
    <div style={{
      display:'inline-flex',alignItems:'center',gap:8,
      background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',
      borderRadius:99,padding:'6px 16px',fontSize:13,fontWeight:600,color:'#10b981',
      marginBottom:20,
    }}>
      <span style={{
        width:7,height:7,borderRadius:'50%',background:'#10b981',
        display:'inline-block',
        boxShadow:'0 0 8px #10b981',
        animation:'livePulse 1.5s infinite',
      }}/>
      {players.toLocaleString()} players online right now
    </div>
  )
}

function CardDeck(){
  const cards = ['🂡','🂱','🃁','🃑','🂢','🂲']
  return (
    <div style={{position:'relative',width:180,height:130,margin:'0 auto 40px'}}>
      {cards.map((c,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:'50%',top:'50%',
          transform:`translate(-50%,-50%) rotate(${(i-2.5)*8}deg) translateY(${i%2===0?-4:4}px)`,
          width:80,height:110,
          background:`linear-gradient(135deg,${i%2===0?'#1a0a3e':'#0e1a3e'},${i%2===0?'#2d1060':'#1060a0'})`,
          border:'1px solid rgba(255,255,255,0.2)',
          borderRadius:8,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:28,
          boxShadow:'0 8px 32px rgba(0,0,0,0.6)',
          animation:`cardFloat ${2+i*.3}s ${i*.15}s ease-in-out infinite alternate`,
        }}>
          <span style={{filter:'drop-shadow(0 0 6px rgba(168,85,247,0.8))'}}>{c}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home(){
  const [scrollY, setScrollY] = useState(0)
  const [hoveredGame, setHoveredGame] = useState(null)
  const [mousePos, setMousePos] = useState({x:0,y:0})

  useEffect(()=>{
    const onScroll = ()=>setScrollY(window.scrollY)
    const onMouse = e=>setMousePos({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight})
    window.addEventListener('scroll',onScroll,{passive:true})
    window.addEventListener('mousemove',onMouse,{passive:true})
    return ()=>{ window.removeEventListener('scroll',onScroll); window.removeEventListener('mousemove',onMouse) }
  },[])

  const parallaxX = (mousePos.x-.5)*20
  const parallaxY = (mousePos.y-.5)*20

  return (
    <>
      <Head>
        <title>Casinoze Room — Play More. Win Bigger.</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth}
          body{
            background:#06000f;
            color:#fff;
            font-family:'DM Sans',sans-serif;
            overflow-x:hidden;
            cursor:none;
          }
          ::-webkit-scrollbar{width:5px}
          ::-webkit-scrollbar-track{background:#0d001f}
          ::-webkit-scrollbar-thumb{background:linear-gradient(#7c3aed,#fbbf24);border-radius:3px}

          /* Custom cursor */
          #cursor{
            position:fixed;width:12px;height:12px;
            background:#fbbf24;border-radius:50%;
            pointer-events:none;z-index:9999;
            transform:translate(-50%,-50%);
            transition:transform .1s,width .2s,height .2s,background .2s;
            mix-blend-mode:difference;
          }
          #cursor-ring{
            position:fixed;width:36px;height:36px;
            border:1.5px solid rgba(168,85,247,0.6);
            border-radius:50%;pointer-events:none;z-index:9998;
            transform:translate(-50%,-50%);
            transition:transform .12s ease,width .25s,height .25s;
          }

          @keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
          @keyframes floatUp{
            0%{transform:translateY(100vh) rotate(0);opacity:0}
            5%{opacity:1}
            95%{opacity:1}
            100%{transform:translateY(-20vh) rotate(720deg);opacity:0}
          }
          @keyframes cardFloat{from{transform:translate(-50%,-50%) rotate(var(--r,0deg)) translateY(-4px)}to{transform:translate(-50%,-50%) rotate(var(--r,0deg)) translateY(4px)}}
          @keyframes shimmerText{
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
          }
          @keyframes glowPulse{
            0%,100%{box-shadow:0 0 20px rgba(168,85,247,.4),0 0 60px rgba(168,85,247,.1),inset 0 0 20px rgba(168,85,247,.05)}
            50%{box-shadow:0 0 40px rgba(168,85,247,.7),0 0 100px rgba(168,85,247,.25),inset 0 0 40px rgba(168,85,247,.1)}
          }
          @keyframes neonLogo{
            0%,100%{text-shadow:0 0 10px #a855f7,0 0 30px #a855f7,0 0 60px #7c3aed}
            50%{text-shadow:0 0 20px #c084fc,0 0 50px #a855f7,0 0 90px #9333ea,0 0 140px #7c3aed}
          }
          @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
          @keyframes scanline{
            0%{transform:translateY(-100%)}
            100%{transform:translateY(100vh)}
          }
          @keyframes borderRotate{
            0%{background-position:0% 50%}
            100%{background-position:200% 50%}
          }

          .hero-anim-1{animation:fadeSlideUp .9s .1s both}
          .hero-anim-2{animation:fadeSlideUp .9s .25s both}
          .hero-anim-3{animation:fadeSlideUp .9s .4s both}
          .hero-anim-4{animation:fadeSlideUp .9s .55s both}
          .hero-anim-5{animation:fadeSlideUp .9s .7s both}

          .btn-gold{
            display:inline-block;
            padding:16px 44px;
            background:linear-gradient(135deg,#fbbf24,#f59e0b,#d97706);
            color:#06000f;
            font-family:'DM Sans',sans-serif;
            font-size:16px;font-weight:700;
            border-radius:14px;text-decoration:none;
            letter-spacing:.03em;
            transition:transform .2s,box-shadow .2s;
            box-shadow:0 0 30px rgba(251,191,36,.4),0 4px 20px rgba(0,0,0,.4);
            position:relative;overflow:hidden;
          }
          .btn-gold::before{
            content:'';position:absolute;inset:0;
            background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
            transform:translateX(-100%);
            transition:transform .5s;
          }
          .btn-gold:hover::before{transform:translateX(100%)}
          .btn-gold:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 0 50px rgba(251,191,36,.6),0 8px 30px rgba(0,0,0,.5)}

          .btn-glass{
            display:inline-block;padding:15px 40px;
            background:rgba(255,255,255,.05);
            border:1.5px solid rgba(168,85,247,.4);
            color:#fff;font-family:'DM Sans',sans-serif;
            font-size:16px;font-weight:700;border-radius:14px;
            text-decoration:none;letter-spacing:.03em;
            transition:all .2s;backdrop-filter:blur(10px);
          }
          .btn-glass:hover{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.8);transform:translateY(-3px);box-shadow:0 0 30px rgba(168,85,247,.3)}

          .step-card{
            background:rgba(255,255,255,.03);
            border:1px solid rgba(255,255,255,.08);
            border-radius:24px;padding:36px 28px;
            transition:all .3s;position:relative;overflow:hidden;
          }
          .step-card::before{
            content:'';position:absolute;inset:0;
            background:linear-gradient(135deg,rgba(168,85,247,.06),transparent);
            opacity:0;transition:opacity .3s;
          }
          .step-card:hover{border-color:rgba(168,85,247,.5);transform:translateY(-8px);box-shadow:0 20px 60px rgba(168,85,247,.2)}
          .step-card:hover::before{opacity:1}

          .game-pill{
            padding:8px 18px;
            background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.1);
            border-radius:99px;font-size:13px;
            color:rgba(255,255,255,.7);font-weight:600;
            transition:all .2s;cursor:default;white-space:nowrap;
            letter-spacing:.02em;
          }
          .game-pill:hover{
            background:rgba(168,85,247,.2);
            border-color:rgba(168,85,247,.6);
            color:#fff;transform:scale(1.08) translateY(-2px);
            box-shadow:0 4px 20px rgba(168,85,247,.3);
          }

          .noise{
            position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.025;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          }
        `}</style>
      </Head>

      {/* Noise overlay */}
      <div className="noise"/>

      {/* Custom cursor */}
      <div id="cursor"/>
      <div id="cursor-ring"/>

      {/* Floating particles */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
        {PARTICLES.map(p=>(
          <div key={p.id} style={{
            position:'absolute',left:`${p.x}%`,bottom:'-10%',
            fontSize:p.size,opacity:p.opacity,userSelect:'none',
            animation:`floatUp ${p.dur}s ${p.delay}s infinite linear`,
          }}>{p.symbol}</div>
        ))}
      </div>

      {/* Parallax BG orbs */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{
          position:'absolute',
          top:`calc(20% + ${parallaxY*1.5}px)`,
          left:`calc(15% + ${parallaxX*1.5}px)`,
          width:500,height:500,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)',
          filter:'blur(40px)',transition:'top .1s,left .1s',
        }}/>
        <div style={{
          position:'absolute',
          top:`calc(50% + ${parallaxY*-1}px)`,
          right:`calc(10% + ${parallaxX*-1}px)`,
          width:400,height:400,borderRadius:'50%',
          background:'radial-gradient(circle,rgba(251,191,36,.1) 0%,transparent 70%)',
          filter:'blur(50px)',transition:'top .1s,right .1s',
        }}/>
      </div>

      {/* Cursor script */}
      <script dangerouslySetInnerHTML={{__html:`
        const cur=document.getElementById('cursor');
        const ring=document.getElementById('cursor-ring');
        let mx=0,my=0,rx=0,ry=0;
        document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}});
        function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(animRing)}
        animRing();
      `}}/>

      {/* NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'14px 48px',
        background:scrollY>50?'rgba(6,0,15,.92)':'transparent',
        backdropFilter:scrollY>50?'blur(20px)':'none',
        borderBottom:scrollY>50?'1px solid rgba(168,85,247,.2)':'none',
        transition:'all .4s',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{
            width:44,height:44,borderRadius:12,
            background:'linear-gradient(135deg,#7c3aed,#fbbf24)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:22,
            boxShadow:'0 0 24px rgba(168,85,247,.5)',
            animation:'glowPulse 3s infinite',
          }}>🎰</div>
          <div>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:18,fontWeight:900,letterSpacing:'.02em',
              animation:'neonLogo 4s infinite',
            }}>
              CASINOZE <span style={{color:'#fbbf24'}}>ROOM</span>
            </div>
            <div style={{fontSize:10,letterSpacing:'.14em',color:'rgba(255,255,255,.35)',fontWeight:600,textTransform:'uppercase'}}>
              Premium Game Room
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link href="/login" className="btn-glass" style={{padding:'9px 24px',fontSize:14}}>Login</Link>
          <Link href="/register" className="btn-gold" style={{padding:'9px 24px',fontSize:14}}>🎲 Join Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:'100vh',display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center',
        padding:'130px 24px 80px',textAlign:'center',
        position:'relative',zIndex:2,
        background:'radial-gradient(ellipse 70% 55% at 50% 10%,rgba(124,58,237,.22) 0%,transparent 65%)',
      }}>

        <CardDeck/>

        <div className="hero-anim-1"><LiveBadge/></div>

        <div className="hero-anim-1" style={{
          display:'inline-block',
          background:'rgba(251,191,36,.1)',color:'#fbbf24',
          border:'1px solid rgba(251,191,36,.3)',
          borderRadius:99,padding:'5px 18px',fontSize:12,
          fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',
          marginBottom:24,
        }}>✦ The #1 Fish Game Room Platform ✦</div>

        <h1 className="hero-anim-2" style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'clamp(40px,7.5vw,96px)',
          fontWeight:900,lineHeight:1.0,
          marginBottom:8,letterSpacing:'-.02em',
        }}>Play More.</h1>
        <h1 className="hero-anim-3" style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'clamp(40px,7.5vw,96px)',
          fontWeight:900,lineHeight:1.0,marginBottom:28,
          background:'linear-gradient(90deg,#a855f7,#ec4899,#fbbf24,#a855f7)',
          backgroundSize:'300% auto',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          animation:'shimmerText 4s linear infinite',
        }}>Win Bigger.</h1>

        <p className="hero-anim-4" style={{
          color:'rgba(255,255,255,.5)',fontSize:18,maxWidth:520,
          margin:'0 auto 44px',lineHeight:1.75,fontWeight:500,
        }}>
          One account unlocks 27 premium game rooms. Deposit, get approved,
          play — credits hit your game automatically. No waiting.
        </p>

        <div className="hero-anim-5" style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:72}}>
          <Link href="/register" className="btn-gold">🎲 Start Playing — It's Free</Link>
          <Link href="/login" className="btn-glass">Login</Link>
        </div>

        {/* Stats bar */}
        <div style={{
          display:'flex',flexWrap:'wrap',justifyContent:'center',
          background:'rgba(255,255,255,.03)',
          border:'1px solid rgba(255,255,255,.07)',
          borderRadius:20,overflow:'hidden',animation:'glowPulse 5s infinite',
        }}>
          {STATS.map((s,i)=>(
            <StatCard key={i} {...s}/>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(168,85,247,.5),rgba(251,191,36,.3),transparent)',margin:'0 10%'}}/>

      {/* HOW IT WORKS */}
      <section style={{padding:'100px 24px',maxWidth:1100,margin:'0 auto',position:'relative',zIndex:2}}>
        <div style={{textAlign:'center',marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'#a855f7',marginBottom:14}}>
            Simple · Fast · Automatic
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(26px,4vw,48px)',fontWeight:900,marginBottom:16}}>
            How It Works
          </h2>
          <p style={{color:'rgba(255,255,255,.4)',fontSize:16,fontWeight:500}}>
            Three steps. That's all it takes.
          </p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24}}>
          {STEPS.map((s,i)=>(
            <div key={i} className="step-card">
              <div style={{
                position:'absolute',top:20,right:24,
                fontFamily:"'Playfair Display',serif",
                fontSize:64,fontWeight:900,
                color:'rgba(168,85,247,.07)',lineHeight:1,
              }}>{s.num}</div>
              <div style={{
                width:60,height:60,borderRadius:16,
                background:'linear-gradient(135deg,rgba(124,58,237,.3),rgba(168,85,247,.15))',
                border:'1px solid rgba(168,85,247,.3)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:28,marginBottom:20,
              }}>{s.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,marginBottom:12}}>{s.title}</h3>
              <p style={{color:'rgba(255,255,255,.45)',fontSize:15,lineHeight:1.75,fontWeight:500}}>{s.desc}</p>
              <div style={{
                marginTop:20,display:'flex',alignItems:'center',gap:8,
                color:'#a855f7',fontSize:13,fontWeight:700,letterSpacing:'.04em',
              }}>
                <span>STEP {s.num}</span>
                <div style={{flex:1,height:1,background:'linear-gradient(90deg,rgba(168,85,247,.4),transparent)'}}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(251,191,36,.3),rgba(168,85,247,.5),transparent)',margin:'0 10%'}}/>

      {/* GAMES */}
      <section style={{
        padding:'100px 24px',
        background:'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(124,58,237,.07) 0%,transparent 70%)',
        position:'relative',zIndex:2,
      }}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'#fbbf24',marginBottom:14}}>
              All In One Place
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(26px,4vw,48px)',fontWeight:900,marginBottom:16}}>
              28 Game Rooms
            </h2>
            <p style={{color:'rgba(255,255,255,.4)',fontSize:16,fontWeight:500}}>
              One account. Every game. Hover to explore.
            </p>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
            {GAMES.map((g,i)=>(
              <span
                key={g}
                className="game-pill"
                onMouseEnter={()=>setHoveredGame(g)}
                onMouseLeave={()=>setHoveredGame(null)}
                style={{
                  ...(hoveredGame===g ? {
                    background:'rgba(168,85,247,.2)',
                    borderColor:'rgba(168,85,247,.6)',
                    color:'#fff',
                    boxShadow:'0 4px 20px rgba(168,85,247,.3)',
                  } : {}),
                }}
              >{g}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{padding:'60px 24px 100px',position:'relative',zIndex:2}}>
        <div style={{
          maxWidth:860,margin:'0 auto',textAlign:'center',
          background:'linear-gradient(135deg,rgba(124,58,237,.15),rgba(251,191,36,.06))',
          border:'1px solid rgba(168,85,247,.3)',
          borderRadius:32,padding:'70px 40px',
          position:'relative',overflow:'hidden',
          animation:'glowPulse 4s infinite',
        }}>
          <div style={{
            position:'absolute',inset:0,
            background:'radial-gradient(ellipse at 50% 0%,rgba(168,85,247,.18),transparent 60%)',
            pointerEvents:'none',
          }}/>
          <div style={{fontSize:56,marginBottom:16,filter:'drop-shadow(0 0 20px rgba(251,191,36,.5))'}}>🎰</div>
          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'clamp(24px,4vw,44px)',fontWeight:900,marginBottom:16,
          }}>Your Seat Is Waiting</h2>
          <p style={{color:'rgba(255,255,255,.5)',fontSize:17,marginBottom:40,fontWeight:500,lineHeight:1.7,maxWidth:480,margin:'0 auto 40px'}}>
            Join thousands of players already winning across 27+ game rooms.
            Free account. Instant setup. Credits delivered automatically.
          </p>
          <Link href="/register" className="btn-gold" style={{fontSize:18,padding:'18px 56px'}}>
            🎲 Create Free Account Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop:'1px solid rgba(255,255,255,.06)',
        padding:'36px 48px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        flexWrap:'wrap',gap:20,position:'relative',zIndex:2,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:20}}>🎰</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:'rgba(255,255,255,.35)',fontWeight:700,letterSpacing:'.04em'}}>
            CASINOZE ROOM
          </span>
        </div>
        <div style={{color:'rgba(255,255,255,.2)',fontSize:13,fontWeight:500}}>
          © 2025 Casinoze Room. All rights reserved.
        </div>
        <div style={{display:'flex',gap:24}}>
          {['Terms','Privacy','Support'].map(l=>(
            <a key={l} href="#" style={{color:'rgba(255,255,255,.3)',fontSize:13,textDecoration:'none',fontWeight:600,letterSpacing:'.05em',transition:'color .2s'}}
              onMouseEnter={e=>e.target.style.color='#a855f7'}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.3)'}
            >{l}</a>
          ))}
        </div>
      </footer>
    </>
  )
}
