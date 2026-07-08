import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import AdBanner from '../components/AdBanner'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

import { LuGamepad2, LuSwords } from "react-icons/lu";
import { FaMapMarkedAlt, FaChess } from "react-icons/fa";
import { SiApplearcade } from "react-icons/si";
import { BsFillPuzzleFill } from "react-icons/bs";
import { GiRaceCar, GiArcheryTarget, GiAmpleDress } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";

const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: <LuGamepad2 /> },
  { id: 'action', name: 'Action', icon: <LuSwords /> },
  { id: 'adventure', name: 'Adventure', icon: <FaMapMarkedAlt /> },
  { id: 'arcade', name: 'Arcade', icon: <SiApplearcade /> },
  { id: 'puzzle', name: 'Puzzle', icon: <BsFillPuzzleFill /> },
  { id: 'racing', name: 'Racing', icon: <GiRaceCar /> },
  { id: 'sports', name: 'Sports', icon: <IoIosFootball /> },
  { id: '2player', name: '2 Player', icon: <FaUserGroup /> },
  { id: 'shooting', name: 'Shooting', icon: <GiArcheryTarget /> },
  { id: 'strategy', name: 'Strategy', icon: <FaChess /> },
  { id: 'girls', name: 'Girls', icon: <GiAmpleDress /> },
]

function SkeletonGrid() {
  return (
    <div className="loading-grid">
      {Array(20).fill(0).map((_, i) => (
        <div className="skeleton" key={i}>
          <div className="skeleton-img" />
          <div className="skeleton-text" />
          <div className="skeleton-text-sm" />
        </div>
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
  const pollingRef = useRef(false)

  // 1. Only fetch games when category/page/search changes
  useEffect(() => {
    if (!router.isReady) return
    fetchGames()
  }, [router.isReady, category, page, search])

  // 2. Only check DB once on mount
  useEffect(() => {
    if (!router.isReady) return
    checkDB()
  }, [router.isReady])

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
    } catch (e) { console.error(e) }
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
        fetchGames()
      }
      
      if (data.count > 0 && dbEmpty) {
        setDbEmpty(false)
        fetchGames()
      }
    } catch (e) {
      pollingRef.current = false
    }
  }

  async function fetchGames() {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        category: category || 'all',
        page: page || '1',
        limit: '40',
      })
      if (search) params.append('search', search)
      const res = await fetch(`${API_BASE}/api/games?${params}`)
      const data = await res.json()
      setGames(data.games || [])
      setTotal(data.total || 0)
      setTotalPages(data.pages || 1)
    } catch (err) {
      console.error('Failed to fetch games:', err)
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
        <title>GameZone - Play Free Online Games</title>
        <meta name="description" content="Play free online games!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {syncStatus !== null && !dbEmpty && (
        <div style={{ background: '#3b82f6', color: 'white', textAlign: 'center', padding: '8px', fontSize: '13px' }}>
          ⏳ Fetching new games in background... {syncStatus} imported so far.
        </div>
      )}

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
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="homepage-layout">
        <div className="homepage-main">
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
                    {games.map(game => (
                      <GameCard key={game.id} game={game} />
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
        </div>
        
        {!dbEmpty && (
          <div className="ad-sidebar">
            <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
            <div style={{ marginTop: '20px' }}>
              <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

