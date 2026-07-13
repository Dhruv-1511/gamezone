import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')

// Inline SVGs — eliminates react-icons library from TBT
const CATEGORIES = [
  { id: 'all', name: 'All Games', href: '/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 12h.01M16 12h.01"/></svg> },
  { id: 'action', name: 'Action', href: '/action-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg> },
  { id: 'adventure', name: 'Adventure', href: '/adventure-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> },
  { id: 'arcade', name: 'Arcade', href: '/arcade-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { id: 'puzzle', name: 'Puzzle', href: '/puzzle-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { id: 'racing', name: 'Racing', href: '/racing-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="9" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg> },
  { id: 'sports', name: 'Sports', href: '/sports-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg> },
  { id: '2player', name: '2 Player', href: '/2-player-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'shooting', name: 'Shooting', href: '/shooting-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg> },
  { id: 'strategy', name: 'Strategy', href: '/strategy-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></svg> },
  { id: 'girls', name: 'Girls', href: '/girls-games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
]

const FAQ_ITEMS = [
  { q: 'What is GameBlasts?', a: 'GameBlasts is a free online gaming platform with 2,000+ browser games across all genres — action, racing, puzzle, shooting, sports, arcade and more. No account needed, no download required, just instant play directly in your browser.' },
  { q: 'Are all games on GameBlasts free?', a: 'Yes, every single game on GameBlasts is completely free to play. The platform is ad-supported so you never pay for anything.' },
  { q: 'Do I need to create an account to play?', a: 'No. GameBlasts requires no sign-up, no login and no registration of any kind. Click any game and start playing immediately.' },
  { q: 'Do I need to download anything?', a: 'Never. All games on GameBlasts run directly in your browser using HTML5 technology. Works on Chrome, Firefox, Safari and Edge on both desktop and mobile.' },
  { q: 'Can I play GameBlasts games on mobile?', a: 'Yes! Most games are mobile-friendly and work on smartphones and tablets. Just open gameblasts.com in your mobile browser and choose a game.' },
  { q: 'What are the most popular game categories?', a: 'The most popular categories on GameBlasts include Action, Racing, Puzzle, Shooting, 2 Player and Arcade games. Use the category bar above to browse games by type.' },
  { q: 'Are new games added regularly?', a: 'Yes, we regularly add new games across all categories. Check back often to discover the latest free online games available on GameBlasts.' },
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

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span>{item.q}</span>
              <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage({ initialGames, initialTotal, initialPages, initialDbEmpty, initialIsSyncing }) {
  const router = useRouter()
  const { category = 'all', page = '1', search = '' } = router.query

  const [games, setGames] = useState(initialGames)
  const [total, setTotal] = useState(initialTotal)
  const [totalPages, setTotalPages] = useState(initialPages)
  const [loading, setLoading] = useState(false)
  const [dbEmpty, setDbEmpty] = useState(initialDbEmpty)
  const [syncStatus, setSyncStatus] = useState(null)
  const pollingRef = useRef(false)

  // Sync SSR-delivered props into state on every navigation
  useEffect(() => {
    setGames(initialGames)
    setTotal(initialTotal)
    setTotalPages(initialPages)
    setDbEmpty(initialDbEmpty)
  }, [initialGames, initialTotal, initialPages, initialDbEmpty])

  // Show skeleton while Next.js SSR re-fetches on route change
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

  // Start DB sync polling if backend reported syncing on SSR
  useEffect(() => {
    if (initialIsSyncing && !pollingRef.current) {
      setSyncStatus(0)
      pollingRef.current = true
      setTimeout(() => checkDBSilent(), 3000)
    }
  }, [])

  async function checkDBSilent() {
    try {
      const res = await fetch(`${API_BASE}/api/db-count`)
      const data = await res.json()
      if (data.is_syncing) {
        setSyncStatus(data.count)
        setTimeout(() => checkDBSilent(), 3000)
      } else {
        setSyncStatus(null)
        pollingRef.current = false
        setDbEmpty(false)
        router.replace(router.asPath)
      }
    } catch {
      pollingRef.current = false
    }
  }

  const currentPage = parseInt(page) || 1
  const activeCategory = category || 'all'
  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory)
  const isDefaultView = !search && activeCategory === 'all' && currentPage === 1

  function setPage(p) {
    const q = { page: p }
    if (activeCategory && activeCategory !== 'all') q.category = activeCategory
    if (search) q.search = search
    router.push({ pathname: '/', query: q })
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Head>
        <title>Free Online Games - Play Best PC Games, Browser Games | GameBlasts</title>
        <meta name="description" content="Best place to play free online games on PC, Desktop and Mobile Browser. Trusted by 1000s of Players. No Download Needed. 100% Safe. Play Now!" />
        <meta name="keywords" content="free online games, play free online games, browser games, free browser games, online games no download, free games no login, instant play games, PC games online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Free Online Games - Play Best PC Games, Browser Games | GameBlasts" />
        <meta property="og:description" content="Best place to play free online games on PC, Desktop and Mobile Browser. No Download Needed. 100% Safe. Trusted by 1000s of Players." />
        <meta property="og:image" content="https://gameblasts.com/logo.png" />
        <meta property="og:image:width" content="1266" />
        <meta property="og:image:height" content="300" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gameblasts.com/" />
        <meta property="og:site_name" content="GameBlasts" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Games - Play Best PC Games, Browser Games | GameBlasts" />
        <meta name="twitter:description" content="Best place to play free online games on PC, Desktop and Mobile Browser. No Download Needed. 100% Safe. Play Now!" />
        <meta name="twitter:image" content="https://gameblasts.com/logo.png" />
        <link rel="canonical" href="https://gameblasts.com/" />
      </Head>

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      {/* Category nav — real <a> links so Google crawls each category page */}
      <nav className="categories-bar" aria-label="Game categories">
        <div className="categories-inner">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`cat-btn${activeCategory === cat.id && !search ? ' active' : ''}`}
            >
              {cat.icon && <span aria-hidden="true">{cat.icon}</span>}{cat.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">

            {(dbEmpty && syncStatus !== null) ? (
              <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2 style={{ color: '#e94560', marginBottom: '16px' }}>⚙️ Syncing Games...</h2>
                {syncStatus !== null && (
                  <div style={{ marginBottom: '16px', fontSize: '18px', color: '#4ade80' }}>
                    {syncStatus} games fetched so far!
                  </div>
                )}
                <p style={{ color: '#a0a0b0' }}>Please wait, database is being populated directly from the backend securely.</p>
                <p style={{ color: '#666', fontSize: '13px', marginTop: '10px' }}>This only happens once on a fresh setup. Games will appear shortly.</p>
              </div>
            ) : (
              <>
                {/* SEO Hero — visible on default homepage only, crawlable by Google */}
                {isDefaultView && (
                  <div className="homepage-hero-text">
                    <h1 className="homepage-h1">Play Free Online Games - No Download or Login Required</h1>
                    <p className="homepage-intro">
                      Play free online games instantly on GameBlasts. Explore 2,000+ browser games including action, racing, puzzle, shooting, sports, arcade and 2 player games. No downloads, no installation and no login required. Just choose a game and start playing.
                    </p>
                  </div>
                )}

                <div className="section-title">
                  {search ? (
                    <span>🔍 Results for &quot;{search}&quot; ({total} games)</span>
                  ) : (
                    <span>
                      {activeCategoryObj?.icon}{' '}
                      {activeCategoryObj?.name}
                      <span style={{ fontSize: '14px', color: '#a0a0b0', fontWeight: 400, marginLeft: '8px' }}>
                        ({total} games)
                      </span>
                    </span>
                  )}
                </div>

                {loading ? (
                  <SkeletonGrid />
                ) : games.length === 0 ? (
                  <div className="no-results">
                    <h3>No games found</h3>
                    <p>Try a different category</p>
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
                    <button className="page-btn" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1}>← Prev</button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let p
                      if (totalPages <= 5) p = i + 1
                      else if (currentPage <= 3) p = i + 1
                      else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
                      else p = currentPage - 2 + i
                      return (
                        <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                      )
                    })}
                    <button className="page-btn" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages}>Next →</button>
                  </div>
                )}

                {/* FAQ — only show on default homepage view */}
                {isDefaultView && !loading && <FAQSection />}
              </>
            )}
          </div>
        </main>

        {!dbEmpty && (
          <div className="ad-sidebar">
            <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
            <div style={{ marginTop: '20px' }}>
              <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

// SSR — Google receives pre-rendered HTML with real game titles
export async function getServerSideProps({ query }) {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  const { category = 'all', page = '1', search = '' } = query

  try {
    const params = new URLSearchParams({ category, page, limit: '40' })
    if (search) params.append('search', search)

    const [gamesRes, dbRes] = await Promise.all([
      fetch(`${API}/api/games?${params}`),
      fetch(`${API}/api/db-count`),
    ])

    const gamesData = gamesRes.ok ? await gamesRes.json() : {}
    const dbData = dbRes.ok ? await dbRes.json() : { count: 1, is_syncing: false }

    return {
      props: {
        initialGames: gamesData.games || [],
        initialTotal: gamesData.total || 0,
        initialPages: gamesData.pages || 1,
        initialDbEmpty: (dbData.count || 0) === 0,
        initialIsSyncing: dbData.is_syncing || false,
      },
    }
  } catch {
    return {
      props: {
        initialGames: [],
        initialTotal: 0,
        initialPages: 1,
        initialDbEmpty: false,
        initialIsSyncing: false,
      },
    }
  }
}
