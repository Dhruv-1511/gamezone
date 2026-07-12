import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')

// Inline SVGs instead of react-icons — eliminates icon library JS from TBT
const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M8 12h.01M16 12h.01"/></svg> },
  { id: 'action', name: 'Action', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 9H17v1.5c0 .83-.67 1.5-1.5 1.5S14 11.33 14 10.5 14.67 9 15.5 9z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 15H7v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg> },
  { id: 'adventure', name: 'Adventure', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> },
  { id: 'arcade', name: 'Arcade', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { id: 'puzzle', name: 'Puzzle', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { id: 'racing', name: 'Racing', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="9" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg> },
  { id: 'sports', name: 'Sports', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg> },
  { id: '2player', name: '2 Player', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'shooting', name: 'Shooting', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg> },
  { id: 'strategy', name: 'Strategy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M3 3h6l3 9H3l3-9z"/><path d="M15 3h6l-3 9h-6l3-9z"/><path d="M12 12v9"/><path d="M9 21h6"/></svg> },
  { id: 'girls', name: 'Girls', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
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
      {Array(20).fill(0).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const { category = 'all', page = '1', search = '' } = router.query

  const [games, setGames] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [dbEmpty, setDbEmpty] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null) // holds fetched count if syncing

  const currentPage = parseInt(page) || 1
  const abortRef = useRef(null)
  const pollingRef = useRef(false)

  // 1. Check DB once when router is ready (independent of games fetching)
  useEffect(() => {
    if (!router.isReady) return
    checkDB()
  }, [router.isReady])

  // 2. Fetch games whenever category/page/search changes (only after router is ready)
  useEffect(() => {
    if (!router.isReady) return
    // Cancel any in-flight request before starting a new one
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    fetchGames(abortRef.current.signal)
    return () => { if (abortRef.current) abortRef.current.abort() }
  }, [category, page, search, router.isReady])

  async function checkDB() {
    try {
      const res = await fetch(`${API_BASE}/api/db-count`)
      const data = await res.json()
      
      if (data.is_syncing) {
        setSyncStatus(data.count)
        if (!pollingRef.current) {
          pollingRef.current = true
          setTimeout(() => checkDBSilent(), 3000)
        }
      } else {
        setSyncStatus(null)
      }

      if (data.count === 0) {
        setDbEmpty(true)
        return
      }
    } catch (e) { /* silently ignore db-count errors */ }
    setDbEmpty(false)
  }

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
        // Refresh games list once syncing is done
        if (abortRef.current) abortRef.current.abort()
        abortRef.current = new AbortController()
        fetchGames(abortRef.current.signal)
        setDbEmpty(false)
      }
    } catch (e) {
      pollingRef.current = false
    }
  }

  async function fetchGames(signal) {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        category: category || 'all',
        page: page || '1',
        limit: '40',
      })
      if (search) params.append('search', search)
      const res = await fetch(`${API_BASE}/api/games?${params}`, { signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setGames(data.games || [])
      setTotal(data.total || 0)
      setTotalPages(data.pages || 1)
    } catch (err) {
      // Ignore aborted requests (navigation / cleanup) silently
      if (err.name !== 'AbortError') {
        setGames([])
        setTotal(0)
      }
    }
    setLoading(false)
  }

  function setCategory(cat) {
    router.push({ pathname: '/', query: { category: cat, page: 1 } })
  }

  function setPage(p) {
    router.push({ pathname: '/', query: { category, page: p, ...(search ? { search } : {}) } })
    window.scrollTo(0, 0)
  }

  async function triggerManualSync() {
    try {
      await fetch(`${API_BASE}/api/sync-games`)
      checkDB()
    } catch (err) {
      console.error(err)
    }
  }

  const activeCategory = category || 'all'

  return (
    <>
      <Head>
        <title>GameBlasts - Play 2000+ Free Online Games</title>
        <meta name="description" content="Play 2,000+ free online games instantly — no download, no sign-up required. Action, puzzle, racing, arcade, sports and more!" />
        <meta name="keywords" content="free online games, browser games, play games online, html5 games, arcade games, puzzle games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="GameBlasts - Play 2000+ Free Online Games" />
        <meta property="og:description" content="Play 2,000+ free online games instantly — no download, no sign-up required." />
        <meta property="og:image" content="https://gameblasts.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gameblasts.com/" />
        <meta property="og:site_name" content="GameBlasts" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GameBlasts - Play 2000+ Free Online Games" />
        <meta name="twitter:description" content="Play 2,000+ free online games instantly — no download, no sign-up required." />
        <meta name="twitter:image" content="https://gameblasts.com/logo.png" />

        <link rel="canonical" href="https://gameblasts.com/" />
      </Head>

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      <div className="categories-bar">
        <div className="categories-inner">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {cat.icon && <span aria-hidden="true">{cat.icon}</span>} {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">
            {dbEmpty ? (
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
                <div className="section-title">
                  {search ? (
                    <span>🔍 Results for &quot;{search}&quot; ({total} games)</span>
                  ) : (
                    <span>
                      {CATEGORIES.find(c => c.id === activeCategory)?.icon}{' '}
                      {CATEGORIES.find(c => c.id === activeCategory)?.name}
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
                     {/* Square Ad before Pagination */}
                     <AdBanner adKey="7475e51389b2bae93ec922165c68c873" width="300" height="250" />
                  </div>
                )}

                {!loading && totalPages > 1 && (
                  <div className="pagination">
                    <button className="page-btn" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1}>
                      ← Prev
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let p
                      if (totalPages <= 5) p = i + 1
                      else if (currentPage <= 3) p = i + 1
                      else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
                      else p = currentPage - 2 + i
                      return (
                        <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setPage(p)}>
                          {p}
                        </button>
                      )
                    })}
                    <button className="page-btn" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages}>
                      Next →
                    </button>
                  </div>
                )}
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

