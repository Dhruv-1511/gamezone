import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import GameCard from '../../components/GameCard'
import AdBanner from '../../components/AdBanner'
import Footer from '../../components/Footer'
import { idFromSlug, gameSlug } from '../../utils/slug'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')

export default function GamePage({ game, related }) {
  const iframeRef = useRef(null)

  function handleFullscreen() {
    const iframe = iframeRef.current
    if (!iframe) return
    if (iframe.requestFullscreen) iframe.requestFullscreen()
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen()
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen()
  }

  const canonicalSlug = gameSlug(game)
  const canonicalUrl = `https://gameblasts.com/game/${canonicalSlug}`
  const seoTitle = `${game.title} - Play Free Online | GameBlasts`
  const seoDescription = game.description
    ? game.description.slice(0, 160)
    : `Play ${game.title} free online on GameBlasts. No download or login required. Instant browser gameplay.`

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${game.title}, ${game.title} online, play ${game.title}, ${game.title} free, ${game.title} browser game, ${game.tags || ''}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph — game.thumb as preview image */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={game.thumb} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="384" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameBlasts" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={game.thumb} />

        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      {/* Breadcrumb */}
      <div style={{ padding: '10px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: '#a0a0b0' }}>
        <Link href="/" style={{ color: '#e94560' }}>Home</Link>
        {' '}/{' '}
        <Link href={game.category ? `/${game.category.toLowerCase()}-games` : '/'} style={{ color: '#a0a0b0' }}>
          {game.category || 'Games'}
        </Link>
        {' '}/ {game.title}
      </div>

      {/* SEO H1 — crawlable game title */}
      <div className="game-h1-bar">
        <h1>{game.title} — Play Free Online</h1>
      </div>

      {/* Game iframe */}
      <div className="game-iframe-container" style={{ height: 'calc(100vh - 180px)' }}>
        <iframe
          ref={iframeRef}
          src={game.url}
          title={`${game.title} - Free Online Game`}
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
            <Link href={`/${game.category.toLowerCase()}-games`} className="game-cat-badge">
              {game.category}
            </Link>
          )}
          <button className="fullscreen-btn" onClick={handleFullscreen}>
            ⛶ Fullscreen
          </button>
        </div>
      </div>

      {/* Square Ad */}
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <AdBanner adKey="7475e51389b2bae93ec922165c68c873" width="300" height="250" />
      </div>

      {/* ── Crawlable game content ───────────────────────────────────── */}
      <div className="game-content-wrap">

        {/* About section */}
        {game.description && (
          <section className="game-content-section">
            <h2>About {game.title}</h2>
            <p>{game.description}</p>
          </section>
        )}

        {/* Game Features */}
        <section className="game-content-section">
          <h2>Game Features</h2>
          <ul className="game-features-list">
            <li>✅ Free to play — no purchase required</li>
            <li>✅ No download or installation needed</li>
            <li>✅ Play instantly in your browser</li>
            <li>✅ No login or account required</li>
            <li>✅ Works on desktop, mobile and tablet</li>
            {game.category && <li>✅ Category: {game.category} games</li>}
            {game.tags && <li>✅ Tags: {game.tags}</li>}
          </ul>
        </section>

        {/* How to Play */}
        <section className="game-content-section">
          <h2>How to Play {game.title}</h2>
          <p>
            {game.description
              ? `${game.title} is a free browser game you can play instantly on GameBlasts. ${game.description.slice(0, 200)}${game.description.length > 200 ? '...' : ''}`
              : `${game.title} is a free online game available on GameBlasts. Click the game area above to start playing. Use your mouse or keyboard controls as indicated in the game. No download or login is required — just click and play.`}
          </p>
          <p style={{ marginTop: '12px', color: 'var(--text2)', fontSize: '14px' }}>
            Tip: Click the <strong>Fullscreen</strong> button above for the best playing experience. Works on desktop and mobile browsers.
          </p>
        </section>

      </div>

      {/* Related Games */}
      {related.length > 0 && (
        <div className="related-section">
          <div className="section-title" style={{ marginBottom: '12px' }}>
            🎲 More {game.category || ''} Games
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

// SSR — game HTML is pre-rendered; Google sees title, description, features
export async function getServerSideProps({ params }) {
  const { slug } = params
  const id = idFromSlug(slug)
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  try {
    const [gameRes, relatedRes] = await Promise.all([
      fetch(`${API}/api/games/${id}`),
      fetch(`${API}/api/featured`),
    ])

    const game = gameRes.ok ? await gameRes.json() : null
    const related = relatedRes.ok ? await relatedRes.json() : []

    if (!game || game.error) return { notFound: true }

    // Canonical redirect — ensures only the correct slug URL is indexed
    const canonical = gameSlug(game)
    if (slug !== canonical) {
      return { redirect: { destination: `/game/${canonical}`, permanent: true } }
    }

    return { props: { game, related: related || [] } }
  } catch {
    return { notFound: true }
  }
}
