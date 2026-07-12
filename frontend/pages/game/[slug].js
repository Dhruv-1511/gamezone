import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import GameCard from '../../components/GameCard'
import AdBanner from '../../components/AdBanner'
import Footer from '../../components/Footer'
import { idFromSlug, gameSlug } from '../../utils/slug'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')

export default function GamePage() {
  const router = useRouter()
  // slug format: "idle-restaurant-tale-60800"
  const { slug } = router.query
  const iframeRef = useRef(null)

  const [game, setGame] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const id = idFromSlug(slug)
    fetchGame(id)
    fetchRelated()
  }, [slug])

  async function fetchGame(id) {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/games/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setGame(data)

      // If someone opens /game/60800 (old ID-only URL), redirect to the canonical slug URL
      if (data && !data.error) {
        const canonical = gameSlug(data)
        if (slug !== canonical) {
          router.replace(`/game/${canonical}`, undefined, { shallow: false })
        }
      }
    } catch (err) {
      // silently handle
    }
    setLoading(false)
  }

  async function fetchRelated() {
    try {
      const res = await fetch(`${API_BASE}/api/featured`)
      if (!res.ok) return
      const data = await res.json()
      setRelated(data)
    } catch (err) {
      // silently handle
    }
  }

  function handleFullscreen() {
    const iframe = iframeRef.current
    if (!iframe) return
    if (iframe.requestFullscreen) iframe.requestFullscreen()
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen()
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen()
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#a0a0b0' }}>
          Loading game...
        </div>
      </>
    )
  }

  if (!game || game.error) {
    return (
      <>
        <Navbar />
        <div className="no-results">
          <h3>Game not found</h3>
          <Link href="/" style={{ color: '#e94560' }}>← Back to home</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{game.title} - GameBlasts</title>
        <meta name="description" content={game.description?.slice(0, 160) || `Play ${game.title} for free online. No download required.`} />
        <meta name="keywords" content={game.tags || game.category} />

        {/* Open Graph */}
        <meta property="og:title" content={`${game.title} - GameBlasts`} />
        <meta property="og:description" content={game.description?.slice(0, 200) || `Play ${game.title} free online on GameBlasts.`} />
        <meta property="og:image" content={game.thumb} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="384" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://gameblasts.com/game/${gameSlug(game)}`} />
        <meta property="og:site_name" content="GameBlasts" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${game.title} - GameBlasts`} />
        <meta name="twitter:description" content={game.description?.slice(0, 160) || `Play ${game.title} free online.`} />
        <meta name="twitter:image" content={game.thumb} />

        <link rel="canonical" href={`https://gameblasts.com/game/${gameSlug(game)}`} />
      </Head>

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      {/* Breadcrumb */}
      <div style={{ padding: '10px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: '#a0a0b0' }}>
        <Link href="/" style={{ color: '#e94560' }}>Home</Link>
        {' '} / {' '}
        <Link href={`/?category=${game.category?.toLowerCase() || 'all'}`} style={{ color: '#a0a0b0' }}>
          {game.category || 'Games'}
        </Link>
        {' '} / {game.title}
      </div>

      {/* Game iframe */}
      <div className="game-iframe-container" style={{ height: 'calc(100vh - 160px)' }}>
        <iframe
          ref={iframeRef}
          src={game.url}
          title={game.title}
          allowFullScreen
          allow="gamepad *; microphone *; autoplay *"
          scrolling="no"
        />
      </div>

      {/* Game info bar */}
      <div className="game-info-bar">
        <div>
          <div className="game-title-bar">{game.title}</div>
          <div style={{ fontSize: '12px', color: '#a0a0b0', marginTop: '2px' }}>
            {game.tags || 'Free online game'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {game.category && (
            <span className="game-cat-badge">{game.category}</span>
          )}
          <button className="fullscreen-btn" onClick={handleFullscreen}>
            ⛶ Fullscreen
          </button>
        </div>
      </div>

      {/* Description */}
      {game.description && (
        <div style={{ padding: '16px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '14px', color: '#a0a0b0', lineHeight: 1.6 }}>
            {game.description}
          </p>
        </div>
      )}

      {/* Square Ad Below Details */}
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <AdBanner adKey="7475e51389b2bae93ec922165c68c873" width="300" height="250" />
      </div>

      {/* Related Games */}
      {related.length > 0 && (
        <div className="related-section">
          <div className="section-title" style={{ marginBottom: '12px' }}>
            🎲 More Games
          </div>
          <div className="related-scroll">
            {related.map(g => (
              <Link href={`/game/${gameSlug(g)}`} key={g.id}>
                <div className="related-card">
                  <Image
                    src={g.thumb}
                    alt={g.title}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    unoptimized={false}
                  />
                  <p>{g.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
