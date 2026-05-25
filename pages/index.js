import Head from 'next/head'
import Link from 'next/link'

const games = [
  'Orion Stars','Fire Kirin','Milky Way','Panda Master',
  'Ultra Panda','VBLink','Egame','Juwa','Game Vault',
  'Vegas Sweeps','Yolo777','Game Room','Blue Dragon',
  'River Sweep','Royal Casino','Cash Machine','Big Winner',
  'Cash Vault','Mafia City','Mr All In One','Cash Frenzy',
  'Golden Treasure','Winstar','Lucky Stars','Vegas Luck',
  'Gem Slots','Ace','Juwa 2.0'
]

const s = {
  page: {
    minHeight:'100vh', background:'#0a0010',
    color:'#fff', fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif',
    margin:0, padding:0,
  },
  nav: {
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'16px 32px', borderBottom:'1px solid rgba(255,255,255,0.1)',
    background:'rgba(255,255,255,0.03)',
  },
  logo: { fontSize:22, fontWeight:800, color:'#fff' },
  logoAccent: { color:'#a855f7' },
  navLinks: { display:'flex', gap:12, alignItems:'center' },
  loginBtn: {
    padding:'8px 20px', color:'rgba(255,255,255,0.7)',
    textDecoration:'none', borderRadius:10, fontSize:14,
    border:'1px solid rgba(255,255,255,0.15)',
  },
  joinBtn: {
    padding:'8px 20px', background:'#9333ea', color:'#fff',
    textDecoration:'none', borderRadius:10, fontSize:14, fontWeight:700,
  },
  hero: {
    textAlign:'center', padding:'80px 24px 60px',
    background:'radial-gradient(ellipse at 50% 0%, rgba(147,51,234,0.25) 0%, transparent 60%)',
  },
  badge: {
    display:'inline-block', background:'rgba(251,191,36,0.15)',
    color:'#fbbf24', fontSize:13, fontWeight:600,
    padding:'5px 16px', borderRadius:99, marginBottom:24,
    border:'1px solid rgba(251,191,36,0.3)',
  },
  h1: { fontSize:62, fontWeight:900, lineHeight:1.1, margin:'0 0 20px' },
  h1accent: {
    background:'linear-gradient(90deg,#a855f7,#fbbf24)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
  },
  subtext: {
    color:'rgba(255,255,255,0.55)', fontSize:18,
    maxWidth:500, margin:'0 auto 40px', lineHeight:1.6,
  },
  heroBtns: { display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' },
  btnPrimary: {
    padding:'14px 36px', background:'#9333ea', color:'#fff',
    textDecoration:'none', borderRadius:14, fontWeight:700,
    fontSize:16, border:'none', cursor:'pointer',
  },
  btnSecondary: {
    padding:'14px 36px', background:'rgba(255,255,255,0.08)',
    color:'#fff', textDecoration:'none', borderRadius:14,
    fontWeight:700, fontSize:16,
    border:'1px solid rgba(255,255,255,0.15)',
  },
  section: { padding:'60px 24px', maxWidth:960, margin:'0 auto' },
  h2: { fontSize:32, fontWeight:800, textAlign:'center', marginBottom:48 },
  stepsGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
    gap:20,
  },
  stepCard: {
    background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.1)',
    borderRadius:20, padding:28, textAlign:'center',
  },
  stepNum: {
    width:48, height:48, background:'#9333ea', borderRadius:'50%',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontWeight:900, fontSize:20, margin:'0 auto 16px',
  },
  stepTitle: { fontSize:20, fontWeight:700, marginBottom:8 },
  stepDesc: { color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.6 },
  gamesWrap: { display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' },
  gameChip: {
    padding:'8px 16px', background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.12)',
    borderRadius:12, fontSize:13, color:'rgba(255,255,255,0.8)',
  },
  footer: {
    borderTop:'1px solid rgba(255,255,255,0.08)',
    padding:'32px 24px', textAlign:'center',
    color:'rgba(255,255,255,0.25)', fontSize:13,
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Casinoze Room — Play & Win</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={s.page}>

        {/* Nav */}
        <nav style={s.nav}>
          <div style={s.logo}>
            🎰 <span style={s.logoAccent}>Casinoze</span> Room
          </div>
          <div style={s.navLinks}>
            <Link href="/login" style={s.loginBtn}>Login</Link>
            <Link href="/register" style={s.joinBtn}>Join Now</Link>
          </div>
        </nav>

        {/* Hero */}
        <section style={s.hero}>
          <div style={s.badge}>27+ Game Panels · Instant Credits · 24/7</div>
          <h1 style={s.h1}>
            Play More.<br />
            <span style={s.h1accent}>Win Bigger.</span>
          </h1>
          <p style={s.subtext}>
            Deposit once, play across all your favorite game rooms.
            Credits added automatically after approval.
          </p>
          <div style={s.heroBtns}>
            <Link href="/register" style={s.btnPrimary}>Create Free Account</Link>
            <Link href="/login" style={s.btnSecondary}>Login</Link>
          </div>
        </section>

        {/* How it works */}
        <section style={s.section}>
          <h2 style={s.h2}>How it works</h2>
          <div style={s.stepsGrid}>
            {[
              {step:'1',title:'Register',desc:'Create your free account in 60 seconds.'},
              {step:'2',title:'Deposit',desc:'Upload your payment screenshot. We approve fast.'},
              {step:'3',title:'Play',desc:'Credits appear in your game automatically.'},
            ].map(item => (
              <div key={item.step} style={s.stepCard}>
                <div style={s.stepNum}>{item.step}</div>
                <div style={s.stepTitle}>{item.title}</div>
                <p style={s.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Games */}
        <section style={{...s.section, background:'rgba(255,255,255,0.02)', maxWidth:'100%', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{maxWidth:960, margin:'0 auto'}}>
            <h2 style={s.h2}>Available Games</h2>
            <p style={{...s.subtext, marginBottom:32}}>All platforms supported. One account, all games.</p>
            <div style={s.gamesWrap}>
              {games.map(g => (
                <span key={g} style={s.gameChip}>{g}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={s.footer}>
          © 2025 Casinoze Room. All rights reserved.
        </footer>

      </div>
    </>
  )
}
