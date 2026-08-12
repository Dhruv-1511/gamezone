import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import { CATEGORIES } from '../lib/categories'
import { SITE_URL, jsonLd } from '../lib/seo'
import { fetchWithTimeout } from '../lib/fetchTimeout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1
  // Assumes the backend orders/accepts `sort=newest`. If the backend ignores
  // unknown query params it just falls back to default ordering — verify
  // against the actual /api/games contract before relying on this for ranking.
  const params = new URLSearchParams({ sort: 'newest', page: String(page), limit: '40' })

  let games = []
  let total = 0
  let totalPages = 1
  try {
    const r = await fetchWithTimeout(`${API_BASE}/api/games?${params}`)
    const data = await r.json()
    games = data.games || []
    total = data.total || 0
    totalPages = data.pages || 1
  } catch (e) {
    console.error('new-games page: failed to fetch games', e)
  }

  return { props: { games, total, totalPages, page } }
}

export default function NewGamesPage({ games, total, totalPages, page }) {
  const router = useRouter()
  const currentPage = page || 1
  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : ''
  const metaTitle = `New Games${pageSuffix} - Latest Free Online Games - GameZone`
  const metaDescription = `Browse the newest free online games added to GameZone. ${total}+ games — no download, no login required.`
  const canonicalUrl = `${SITE_URL}/new-games${currentPage > 1 ? `?page=${currentPage}` : ''}`

  function setPage(p) {
    router.push(`/new-games${p > 1 ? `?page=${p}` : ''}`)
    window.scrollTo(0, 0)
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'New Games', item: `${SITE_URL}/new-games` },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metaTitle,
    description: metaDescription,
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: games.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/game/${g.id}`,
        name: g.title,
      })),
    },
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
        {games.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema) }} />
        )}
      </Head>

      <Navbar />

      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      <nav
        aria-label="Breadcrumb"
        style={{ padding: '10px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: '#a0a0b0' }}
      >
        <Link href="/" style={{ color: '#e94560' }}>Home</Link>
        {' '} / {' '}New Games
      </nav>

      <div className="categories-bar">
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
          <Link key={cat.id} href={`/category/${cat.id}`}>
            <span className="cat-btn" style={{ display: 'inline-block' }}>
              {cat.icon} {cat.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">
            <h1 className="section-title">
              🆕 New Games
              <span style={{ fontSize: '14px', color: '#a0a0b0', fontWeight: 400, marginLeft: '8px' }}>
                ({total} games)
              </span>
            </h1>
            <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, maxWidth: '900px', marginBottom: '20px' }}>
              The latest free online games added to GameZone, freshest first. No download, no login — just click and play.
            </p>

            {games.length === 0 ? (
              <div className="no-results">
                <h2>No games found</h2>
              </div>
            ) : (
              <div className="games-grid">
                {games.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}

            {games.length > 0 && (
              <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                <AdBanner adKey="7475e51389b2bae93ec922165c68c873" width="300" height="250" />
              </div>
            )}

            {totalPages > 1 && (
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
          </div>
        </main>

        <div className="ad-sidebar">
          <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
          <div style={{ marginTop: '20px' }}>
            <AdBanner adKey="25663cfe779cf8113cf8b57b80a6b5ca" width="160" height="600" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
