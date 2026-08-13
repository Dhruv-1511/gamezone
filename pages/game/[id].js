import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import AdBanner from '../../components/AdBanner'
import Footer from '../../components/Footer'
import { SITE_URL, jsonLd, truncate } from '../../lib/seo'
import { categoryForName } from '../../lib/categories'
import { fetchWithTimeout } from '../../lib/fetchTimeout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getServerSideProps({ params, res }) {
  let game = null
  let related = []

  try {
    const gameRes = await fetchWithTimeout(`${API_BASE}/api/games/${params.id}`)
    const data = await gameRes.json()
    if (!data.error) game = data
  } catch (e) {
    console.error('game page: failed to fetch game', e)
  }

  if (!game) {
    res.statusCode = 404
    return { notFound: true }
  }

  try {
    const relatedRes = await fetchWithTimeout(`${API_BASE}/api/games/${params.id}/related`)
    related = await relatedRes.json()
  } catch (e) {
    console.error('game page: failed to fetch related games', e)
  }

  return { props: { game, related } }
}

export default function GamePage({ game, related }) {
  const iframeRef = useRef(null)

  function handleFullscreen() {
    const iframe = iframeRef.current
    if (!iframe) return
    if (iframe.requestFullscreen) iframe.requestFullscreen()
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen()
    else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen()
  }

  const category = categoryForName(game.category)
  const canonicalUrl = `${SITE_URL}/game/${game.id}`
  const metaDescription = truncate(
    game.description || `Play ${game.title} online for free — no download, no login required.`,
    160
  )

  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description || metaDescription,
    image: game.thumb,
    url: canonicalUrl,
    genre: game.category || undefined,
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: category.name, item: `${SITE_URL}/category/${category.id}` },
      { '@type': 'ListItem', position: 3, name: game.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <Head>
        <title>{`${game.title} - Play Free Online | GameZone`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${game.title} - Play Free Online`} />
        <meta property="og:description" content={metaDescription} />
        {game.thumb && <meta property="og:image" content={game.thumb} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameZone" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${game.title} - Play Free Online`} />
        <meta name="twitter:description" content={metaDescription} />
        {game.thumb && <meta name="twitter:image" content={game.thumb} />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(videoGameSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
        />
      </Head>

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{ padding: '10px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: '#a0a0b0' }}
      >
        <Link href="/" style={{ color: '#e94560' }}>Home</Link>
        {' '} / {' '}
        <Link href={`/category/${category.id}`} style={{ color: '#a0a0b0' }}>
          {game.category || 'Games'}
        </Link>
        {' '} / {game.title}
      </nav>

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
          <h1 className="game-title-bar">{game.title}</h1>
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
          <h2 className="section-title" style={{ marginBottom: '12px' }}>
            🎲 More {category.name} Games
          </h2>
          <div className="related-scroll">
            {related.map(g => (
              <Link href={`/game/${g.id}`} key={g.id}>
                <div className="related-card">
                  <img src={g.thumb} alt={g.title} loading="lazy" decoding="async" width="400" height="300" />
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
