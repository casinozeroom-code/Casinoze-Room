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

export default function Home() {
  return (
    <>
      <Head>
        <title>Casinoze Room — Play & Win</title>
        <meta name="description" content="Join Casinoze Room. Deposit, play, and win across 27+ game panels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#0a0010]">

        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="text-2xl font-bold text-white">
            🎰 <span className="text-purple-400">Casinoze</span> Room
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-white/70 hover:text-white transition">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition">
              Join Now
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center px-6 py-20">
          <div className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            27+ Game Panels · Instant Credits · 24/7
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Play More.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
              Win Bigger.
            </span>
          </h1>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Deposit once, play across all your favorite game rooms.
            Credits added automatically after approval.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-lg transition">
              Create Free Account
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-lg transition">
              Login
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step:'1', title:'Register', desc:'Create your free account in 60 seconds.' },
              { step:'2', title:'Deposit', desc:'Upload your payment screenshot. We approve fast.' },
              { step:'3', title:'Play', desc:'Credits appear in your game automatically.' },
            ].map(s => (
              <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Games */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Available Games</h2>
          <p className="text-white/50 text-center mb-10">All platforms supported. One account, all games.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {games.map(g => (
              <span key={g} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-sm hover:border-purple-500 hover:text-white transition">
                {g}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-8 text-center text-white/30 text-sm">
          © 2025 Casinoze Room. All rights reserved.
        </footer>

      </main>
    </>
  )
}
