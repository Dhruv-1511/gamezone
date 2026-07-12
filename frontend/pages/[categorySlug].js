import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import Footer from '../components/Footer'
import AdBanner from '../components/AdBanner'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ─── Category metadata ────────────────────────────────────────────────────────
const CATEGORY_META = {
  'action-games': {
    id: 'action',
    name: 'Action',
    title: 'Free Action Games - Play Online No Download | GameBlasts',
    h1: 'Free Action Games Online',
    metaDescription: 'Play free action games online on GameBlasts. Fight enemies, complete missions and enjoy thrilling browser action games with no download or login required.',
    intro: 'Get your adrenaline pumping with GameBlasts\' collection of free action games. From intense combat games to side-scrolling adventures, our action category delivers non-stop excitement directly in your browser. Battle powerful enemies, complete challenging missions and unlock new levels — all without downloading anything or creating an account.',
    keywords: 'free action games, action games online, browser action games, action games no download, play action games free',
    about: {
      what: 'Action games are fast-paced games that challenge your reflexes, coordination and reaction time. They typically involve combat, obstacles and enemies that you must defeat or avoid. Popular sub-genres include beat-em-ups, platformers, hack-and-slash games and action-adventure hybrids.',
      best: 'GameBlasts hosts hundreds of action games ranging from classic arcade fighters to modern 3D combat games. Some of the most popular include superhero games, ninja games and intense battle games that keep players engaged for hours.',
      mobile: 'Yes! Most of our action games are fully mobile-friendly and work on smartphones and tablets. Just open GameBlasts in your mobile browser — no app download needed.',
      free: 'Absolutely. Every action game on GameBlasts is 100% free to play with no hidden charges, no in-app purchases required to enjoy the full experience.',
    },
    faqs: [
      { q: 'Are the action games on GameBlasts free?', a: 'Yes, all action games on GameBlasts are completely free to play. No payment, subscription or sign-up is required.' },
      { q: 'Do I need to download action games?', a: 'No downloads ever. All action games run directly in your browser using HTML5 technology.' },
      { q: 'Can I play action games on mobile?', a: 'Yes, most action games on GameBlasts are optimised for mobile and work great on smartphones and tablets.' },
      { q: 'What types of action games are available?', a: 'GameBlasts has fighting games, shooting games, platformers, superhero games, ninja games, combat games and much more.' },
      { q: 'Do I need to create an account?', a: 'No account needed. Click any game and start playing instantly with no login required.' },
    ],
  },
  'adventure-games': {
    id: 'adventure',
    name: 'Adventure',
    title: 'Free Adventure Games - Play Online No Download | GameBlasts',
    h1: 'Free Adventure Games Online',
    metaDescription: 'Play free adventure games online on GameBlasts. Explore worlds, solve quests and enjoy exciting browser adventure games with no download or login required.',
    intro: 'Embark on epic quests with GameBlasts\' collection of free adventure games. Explore mysterious worlds, discover hidden secrets, solve challenging puzzles and complete thrilling storylines — all directly in your browser. No installation, no login, just pure adventure.',
    keywords: 'free adventure games, adventure games online, browser adventure games, adventure games no download, play adventure games free',
    about: {
      what: 'Adventure games focus on exploration, storytelling and puzzle-solving. Players typically navigate vast worlds, interact with characters and complete quests. Sub-genres include point-and-click adventures, RPG-adventure hybrids and exploration games.',
      best: 'Our adventure collection includes quest games, exploration games, escape room challenges and story-driven adventures that can keep you engaged for hours at a time.',
      mobile: 'Yes! Many adventure games on GameBlasts are playable on mobile devices. Just open your browser and start exploring.',
      free: 'Every adventure game on GameBlasts is 100% free with no hidden costs.',
    },
    faqs: [
      { q: 'Are the adventure games on GameBlasts free?', a: 'Yes, all adventure games are completely free to play — no payment or subscription needed.' },
      { q: 'Do I need to download adventure games?', a: 'No. All games run in your browser with zero downloads.' },
      { q: 'Can I play adventure games on mobile?', a: 'Yes, many adventure games are mobile-compatible and work in your mobile browser.' },
      { q: 'What types of adventure games are available?', a: 'GameBlasts has quest games, exploration games, escape rooms, RPG adventures and story games.' },
      { q: 'Do I need an account to play?', a: 'No account or login is ever required on GameBlasts.' },
    ],
  },
  'arcade-games': {
    id: 'arcade',
    name: 'Arcade',
    title: 'Free Arcade Games - Play Online No Download | GameBlasts',
    h1: 'Free Arcade Games Online',
    metaDescription: 'Play free arcade games online on GameBlasts. Enjoy classic and modern arcade games in your browser with no download or login required.',
    intro: 'Relive the golden age of gaming with GameBlasts\' collection of free arcade games. From classic high-score chasers to modern browser-based arcade experiences, our collection has something for everyone. Tap, click and swipe your way to the top of the leaderboard — instantly, for free.',
    keywords: 'free arcade games, arcade games online, browser arcade games, classic arcade games online, play arcade games free',
    about: {
      what: 'Arcade games are typically short, fast and highly replayable games designed around scoring mechanics. Originating from the arcade cabinets of the 1970s–90s, modern browser arcade games capture that same addictive loop of "one more try".',
      best: 'Our arcade collection includes endless runners, clicker games, ball games, retro-style shooters and more that deliver instant fun.',
      mobile: 'Yes, most arcade games are designed for quick sessions and work perfectly on mobile browsers.',
      free: 'All arcade games on GameBlasts are completely free — no coins required!',
    },
    faqs: [
      { q: 'Are the arcade games on GameBlasts free?', a: 'Yes, all arcade games are 100% free — just like the classic arcade experience, minus the quarters.' },
      { q: 'Do I need to download arcade games?', a: 'No downloads needed. All games load instantly in your browser.' },
      { q: 'Can I play arcade games on mobile?', a: 'Yes! Arcade games are great on mobile — pick up and play any time.' },
      { q: 'Are there multiplayer arcade games?', a: 'Yes, some arcade games on GameBlasts support 2-player modes. Check the 2 Player category for more.' },
      { q: 'Do I need to sign up?', a: 'No sign-up, no login, no registration. Just play.' },
    ],
  },
  'puzzle-games': {
    id: 'puzzle',
    name: 'Puzzle',
    title: 'Free Puzzle Games - Play Online No Download | GameBlasts',
    h1: 'Free Puzzle Games Online',
    metaDescription: 'Play free puzzle games online on GameBlasts. Challenge your brain with logic puzzles, word games and more — no download or login required.',
    intro: 'Exercise your mind with GameBlasts\' collection of free puzzle games. From brain-teasing logic challenges to relaxing match-3 games, our puzzle collection offers something for every difficulty level. Challenge yourself, improve your thinking and have fun — all directly in your browser with no download needed.',
    keywords: 'free puzzle games, puzzle games online, brain games online, logic games free, puzzle games no download',
    about: {
      what: 'Puzzle games challenge your problem-solving, logic and spatial reasoning skills. They range from quick casual brain teasers to complex multi-step logic challenges. Sub-genres include match-3 games, sliding puzzles, word games and physics-based puzzles.',
      best: 'Our puzzle collection includes Sudoku, maze games, colour puzzles, word challenges and innovative logic games that range from easy to extremely challenging.',
      mobile: 'Yes! Puzzle games are perfect for mobile play — enjoy a brain workout on the go.',
      free: 'Every puzzle game on GameBlasts is completely free to play.',
    },
    faqs: [
      { q: 'Are the puzzle games on GameBlasts free?', a: 'Yes, all puzzle games are free with no purchase required.' },
      { q: 'Do I need to download puzzle games?', a: 'No downloads. All puzzle games run in your browser.' },
      { q: 'Can I play puzzle games on mobile?', a: 'Yes, puzzle games are great on mobile and most are touch-optimised.' },
      { q: 'What difficulty levels are available?', a: 'GameBlasts has puzzle games for all skill levels — from beginner to expert.' },
      { q: 'Do I need an account to save progress?', a: 'No account is needed. Note that progress may reset between sessions.' },
    ],
  },
  'racing-games': {
    id: 'racing',
    name: 'Racing',
    title: 'Free Racing Games - Play Online No Download | GameBlasts',
    h1: 'Free Racing Games Online',
    metaDescription: 'Play free racing games online on GameBlasts. Drive fast cars, race against opponents and enjoy browser racing games with no download or login required.',
    intro: 'Put the pedal to the metal with GameBlasts\' collection of free racing games. Choose from high-speed car racing, motorbike games, kart racing and off-road adventures. Compete against opponents, beat your lap times and unlock faster vehicles — all in your browser with no download required.',
    keywords: 'free racing games, racing games online, car games online, browser racing games, racing games no download, free car racing',
    about: {
      what: 'Racing games challenge players to navigate tracks as fast as possible while managing obstacles, competitors and vehicle handling. Sub-genres include kart racing, realistic simulators, arcade racers, motorbike games and street racing games.',
      best: 'Our racing collection includes everything from realistic 3D car games to fun cartoon kart racers, as well as bike games, drift challenges and time trial events.',
      mobile: 'Yes! Many racing games on GameBlasts work on mobile browsers. Use touch controls to steer and accelerate.',
      free: 'All racing games are completely free — no purchase required to race.',
    },
    faqs: [
      { q: 'Are the racing games on GameBlasts free?', a: 'Yes, all racing games are 100% free to play.' },
      { q: 'Do I need to download racing games?', a: 'No. All racing games load and play directly in your browser.' },
      { q: 'Can I play racing games on mobile?', a: 'Yes, many racing games support touch controls for mobile play.' },
      { q: 'What types of racing games are available?', a: 'GameBlasts has car racing, motorbike games, kart racing, drift games, off-road games and more.' },
      { q: 'Are there multiplayer racing games?', a: 'Yes, some racing games feature multiplayer or 2-player modes.' },
    ],
  },
  'sports-games': {
    id: 'sports',
    name: 'Sports',
    title: 'Free Sports Games - Play Online No Download | GameBlasts',
    h1: 'Free Sports Games Online',
    metaDescription: 'Play free sports games online on GameBlasts. Football, basketball, golf and more — browser sports games with no download or login required.',
    intro: 'Compete in your favourite sports from the comfort of your browser with GameBlasts\' free sports games collection. Kick footballs, shoot hoops, sink putts and score goals — all online, all free, with no download or sign-up required.',
    keywords: 'free sports games, sports games online, football games online, basketball games browser, sports games no download',
    about: {
      what: 'Sports games simulate real-world athletic competitions in digital form. From football and basketball to golf and tennis, browser sports games let you compete across dozens of disciplines without leaving your seat.',
      best: 'Our sports collection includes football, basketball, baseball, golf, tennis, bowling and many more sports recreated as fun browser games.',
      mobile: 'Yes, many sports games are optimised for mobile and work with touch controls.',
      free: 'Every sports game on GameBlasts is free — no premium subscription needed.',
    },
    faqs: [
      { q: 'Are the sports games on GameBlasts free?', a: 'Yes, all sports games are completely free to play.' },
      { q: 'Do I need to download sports games?', a: 'No downloads. Sports games run directly in your browser.' },
      { q: 'What sports are available?', a: 'GameBlasts has football, basketball, golf, tennis, baseball, bowling, archery and many more.' },
      { q: 'Can I play sports games on mobile?', a: 'Yes, many sports games are mobile-compatible with touch controls.' },
      { q: 'Are there multiplayer sports games?', a: 'Yes, several sports games offer local 2-player modes.' },
    ],
  },
  '2-player-games': {
    id: '2player',
    name: '2 Player',
    title: 'Free 2 Player Games - Play Online No Download | GameBlasts',
    h1: 'Free 2 Player Games Online',
    metaDescription: 'Play free 2 player games online on GameBlasts. Challenge a friend on the same device and enjoy multiplayer browser games with no download required.',
    intro: 'Challenge your friends and family with GameBlasts\' collection of free 2 player games. Share a keyboard, compete side-by-side and settle the score in dozens of exciting two-player browser games. No download, no app, no login — just open a game and go head to head instantly.',
    keywords: '2 player games online, two player games free, 2 player browser games, multiplayer games no download, games for 2 players',
    about: {
      what: '2 player games are games designed to be played by two people simultaneously, usually sharing a single keyboard or device. They include competitive games where players battle each other and co-operative games where they work together.',
      best: 'GameBlasts has fighting games, sports games, racing games and unique competitive challenges all built for 2 players on one screen.',
      mobile: 'Some 2 player games work on mobile with split-screen touch controls. Most are optimised for desktop keyboard play.',
      free: 'All 2 player games on GameBlasts are free — double the fun, zero cost.',
    },
    faqs: [
      { q: 'Are the 2 player games on GameBlasts free?', a: 'Yes, all 2 player games are completely free.' },
      { q: 'Do I need two devices to play 2 player games?', a: 'No! Most 2 player games on GameBlasts are played on a single device, sharing a keyboard.' },
      { q: 'Can I play 2 player games on mobile?', a: 'Some 2 player games support touch controls on mobile. Check individual game instructions.' },
      { q: 'What types of 2 player games are available?', a: 'GameBlasts has 2-player fighting, racing, sports, shooting and adventure games.' },
      { q: 'Do I need an account to play with a friend?', a: 'No account needed. Just open a game and both players can start immediately.' },
    ],
  },
  'shooting-games': {
    id: 'shooting',
    name: 'Shooting',
    title: 'Free Shooting Games - Play Online No Download | GameBlasts',
    h1: 'Free Shooting Games Online',
    metaDescription: 'Play free shooting games online on GameBlasts. Aim, shoot and survive in browser shooting games with no download or login required.',
    intro: 'Lock and load with GameBlasts\' collection of free shooting games. From top-down shooters to first-person target games, our shooting category delivers intense gameplay right in your browser. Take aim, test your precision and rack up the highest score — no download, no login, just play.',
    keywords: 'free shooting games, shooting games online, browser shooting games, shooting games no download, fps games browser',
    about: {
      what: 'Shooting games challenge players to aim and fire at targets — enemies, objects or moving obstacles. Sub-genres include first-person shooters, top-down shooters, tower defence games and archery/target shooting games.',
      best: 'Our shooting collection includes space shooters, zombie survival games, sniper challenges, archery games and intense battle games.',
      mobile: 'Yes, many shooting games on GameBlasts are touch-friendly and work on mobile browsers.',
      free: 'All shooting games are 100% free. Unlimited ammo, unlimited play.',
    },
    faqs: [
      { q: 'Are the shooting games on GameBlasts free?', a: 'Yes, all shooting games are completely free to play.' },
      { q: 'Do I need to download shooting games?', a: 'No downloads needed. All shooting games run in your browser.' },
      { q: 'Can I play shooting games on mobile?', a: 'Yes, many shooting games support touch/tap controls on mobile.' },
      { q: 'What types of shooting games are available?', a: 'GameBlasts has top-down shooters, sniper games, archery games, space shooters and more.' },
      { q: 'Are shooting games appropriate for kids?', a: 'GameBlasts has a range of shooting games from cartoon target practice to more intense action shooters. Parents should review individual games.' },
    ],
  },
  'strategy-games': {
    id: 'strategy',
    name: 'Strategy',
    title: 'Free Strategy Games - Play Online No Download | GameBlasts',
    h1: 'Free Strategy Games Online',
    metaDescription: 'Play free strategy games online on GameBlasts. Build, plan and conquer in browser strategy games with no download or login required.',
    intro: 'Put your thinking cap on with GameBlasts\' collection of free strategy games. From city-building simulations to tower defence challenges and tactical war games, our strategy category rewards careful planning and smart decision-making. Play directly in your browser — no download required.',
    keywords: 'free strategy games, strategy games online, browser strategy games, tower defence games free, strategy games no download',
    about: {
      what: 'Strategy games require players to plan their moves carefully, manage resources and think ahead to outmanoeuvre opponents or overcome challenges. Sub-genres include real-time strategy, turn-based strategy, tower defence, city builders and war games.',
      best: 'Our strategy collection includes tower defence games, kingdom builders, chess variants, war strategy games and resource management simulations.',
      mobile: 'Yes, many strategy games are well-suited for mobile — tap to build, tap to command.',
      free: 'All strategy games on GameBlasts are free. No premium required to reach the top.',
    },
    faqs: [
      { q: 'Are the strategy games on GameBlasts free?', a: 'Yes, all strategy games are 100% free to play.' },
      { q: 'Do I need to download strategy games?', a: 'No downloads. All strategy games run in your browser.' },
      { q: 'Can I play strategy games on mobile?', a: 'Yes, many strategy games work well on mobile browsers with touch controls.' },
      { q: 'What types of strategy games are available?', a: 'Tower defence, city building, war games, turn-based strategy and more.' },
      { q: 'Are there beginner-friendly strategy games?', a: 'Yes! GameBlasts has strategy games for all skill levels, from simple tower defence to complex empire builders.' },
    ],
  },
  'girls-games': {
    id: 'girls',
    name: 'Girls',
    title: 'Free Girls Games - Play Online No Download | GameBlasts',
    h1: 'Free Girls Games Online',
    metaDescription: 'Play free girls games online on GameBlasts. Fashion, makeover, cooking and more — fun browser games for girls with no download or login required.',
    intro: 'Explore GameBlasts\' collection of free girls games featuring fashion, makeover, cooking, decoration and more. Whether you love designing outfits, creating beautiful looks or running your own virtual restaurant, our games collection has something fun for everyone — playable directly in your browser.',
    keywords: 'free girls games, girls games online, fashion games online, makeover games browser, girls games no download',
    about: {
      what: 'Girls games typically focus on creativity, fashion, cooking, decoration and social simulation. They include dress-up games, makeover games, cooking challenges, home decoration simulators and princess adventure games.',
      best: 'Our girls games collection includes fashion design, hair salon games, cooking games, wedding planning and creative makeover challenges.',
      mobile: 'Yes! Girls games are perfect on mobile — touch to style, tap to create.',
      free: 'All girls games on GameBlasts are completely free.',
    },
    faqs: [
      { q: 'Are the girls games on GameBlasts free?', a: 'Yes, all girls games are 100% free to play.' },
      { q: 'Do I need to download girls games?', a: 'No downloads. All games play directly in your browser.' },
      { q: 'Can I play girls games on mobile?', a: 'Yes, most girls games are mobile-friendly with touch controls.' },
      { q: 'What types of girls games are available?', a: 'Fashion, makeover, cooking, decoration, princess games and more.' },
      { q: 'Are girls games suitable for children?', a: 'Yes, girls games on GameBlasts are family-friendly and suitable for all ages.' },
    ],
  },
}

// All categories for the nav bar (same as homepage)
const NAV_CATEGORIES = [
  { id: 'all', name: 'All Games', href: '/' },
  { id: 'action', name: 'Action', href: '/action-games' },
  { id: 'adventure', name: 'Adventure', href: '/adventure-games' },
  { id: 'arcade', name: 'Arcade', href: '/arcade-games' },
  { id: 'puzzle', name: 'Puzzle', href: '/puzzle-games' },
  { id: 'racing', name: 'Racing', href: '/racing-games' },
  { id: 'sports', name: 'Sports', href: '/sports-games' },
  { id: '2player', name: '2 Player', href: '/2-player-games' },
  { id: 'shooting', name: 'Shooting', href: '/shooting-games' },
  { id: 'strategy', name: 'Strategy', href: '/strategy-games' },
  { id: 'girls', name: 'Girls', href: '/girls-games' },
]

function SkeletonCard() {
  return (
    <div className="skeleton">
      <div className="skeleton-img" />
      <div className="skeleton-info">
        <div className="skeleton-text" />
        <div className="skeleton-text-sm" />
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="loading-grid">
      {Array(20).fill(0).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

export default function CategoryPage({ meta, initialGames, initialTotal, initialPages, categorySlug }) {
  const router = useRouter()
  const [games, setGames] = useState(initialGames)
  const [total, setTotal] = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialPages)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setGames(initialGames)
    setTotal(initialTotal)
    setTotalPages(initialPages)
    setCurrentPage(1)
  }, [initialGames, initialTotal, initialPages])

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [router.events])

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

  async function fetchPage(p) {
    setLoading(true)
    setCurrentPage(p)
    window.scrollTo(0, 0)
    try {
      const res = await fetch(`${API_BASE}/api/games?category=${meta.id}&page=${p}&limit=40`)
      const data = await res.json()
      setGames(data.games || [])
      setTotal(data.total || 0)
      setTotalPages(data.pages || 1)
    } catch { /* ignore */ }
    setLoading(false)
  }

  const canonicalUrl = `https://gameblasts.com/${categorySlug}`

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.metaDescription} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.metaDescription} />
        <meta property="og:image" content="https://gameblasts.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameBlasts" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Navbar />

      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      {/* Category navigation */}
      <nav className="categories-bar" aria-label="Game categories">
        <div className="categories-inner">
          {NAV_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`cat-btn${meta.id === cat.id ? ' active' : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">

            {/* SEO H1 + intro */}
            <div className="homepage-hero-text">
              <h1 className="homepage-h1">{meta.h1}</h1>
              <p className="homepage-intro">{meta.intro}</p>
            </div>

            <div className="section-title">
              <span>
                {meta.name} Games
                <span style={{ fontSize: '14px', color: '#a0a0b0', fontWeight: 400, marginLeft: '8px' }}>
                  ({total} games)
                </span>
              </span>
            </div>

            {loading ? (
              <SkeletonGrid />
            ) : games.length === 0 ? (
              <div className="no-results">
                <h3>No games found</h3>
                <p><Link href="/">← Back to all games</Link></p>
              </div>
            ) : (
              <div className="games-grid">
                {games.map((game, i) => (
                  <GameCard key={game.id} game={game} priority={i < 8} />
                ))}
              </div>
            )}

            {!loading && games.length > 0 && (
              <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                <AdBanner adKey="7475e51389b2bae93ec922165c68c873" width="300" height="250" />
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="pagination">
                <button className="page-btn" onClick={() => fetchPage(currentPage - 1)} disabled={currentPage <= 1}>← Prev</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p
                  if (totalPages <= 5) p = i + 1
                  else if (currentPage <= 3) p = i + 1
                  else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
                  else p = currentPage - 2 + i
                  return (
                    <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => fetchPage(p)}>{p}</button>
                  )
                })}
                <button className="page-btn" onClick={() => fetchPage(currentPage + 1)} disabled={currentPage >= totalPages}>Next →</button>
              </div>
            )}

            {/* ── Bottom SEO content block ─────────────────────────────── */}
            <section className="category-seo-block" aria-label={`About ${meta.name} Games`}>
              <div className="cat-seo-grid">
                <div className="cat-seo-about">
                  <h2>About Free {meta.name} Games</h2>
                  <h3>What are {meta.name} Games?</h3>
                  <p>{meta.about.what}</p>
                  <h3>What are the best {meta.name} Games on GameBlasts?</h3>
                  <p>{meta.about.best}</p>
                  <h3>Can I play {meta.name} Games on mobile?</h3>
                  <p>{meta.about.mobile}</p>
                  <h3>Are {meta.name} Games free?</h3>
                  <p>{meta.about.free}</p>
                </div>

                <div className="cat-seo-faq">
                  <h2>Frequently Asked Questions</h2>
                  <div className="cat-faq-list">
                    {meta.faqs.map((faq, i) => (
                      <CategoryFAQItem key={i} faq={faq} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>

        <div className="ad-sidebar">
          <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
        </div>
      </div>

      <Footer />
    </>
  )
}

function CategoryFAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{faq.q}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="faq-a"><p>{faq.a}</p></div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { categorySlug } = params
  const meta = CATEGORY_META[categorySlug]

  if (!meta) return { notFound: true }

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  try {
    const res = await fetch(`${API}/api/games?category=${meta.id}&page=1&limit=40`)
    const data = res.ok ? await res.json() : {}

    return {
      props: {
        meta,
        categorySlug,
        initialGames: data.games || [],
        initialTotal: data.total || 0,
        initialPages: data.pages || 1,
      },
    }
  } catch {
    return {
      props: {
        meta,
        categorySlug,
        initialGames: [],
        initialTotal: 0,
        initialPages: 1,
      },
    }
  }
}
