import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import GameCard from '../../components/GameCard'
import AdBanner from '../../components/AdBanner'
import Footer from '../../components/Footer'
import Pagination from '../../components/Pagination'
import { CATEGORIES } from '../../lib/categories'
import { SITE_URL, jsonLd, truncate } from '../../lib/seo'
import { fetchWithTimeout } from '../../lib/fetchTimeout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getServerSideProps({ params, query, res }) {
  const meta = CATEGORIES.find(c => c.id === params.slug && c.id !== 'all')
  if (!meta) {
    res.statusCode = 404
    return { notFound: true }
  }

  const page = parseInt(query.page) || 1
  const params2 = new URLSearchParams({ category: params.slug, page: String(page), limit: '40' })

  let games = []
  let total = 0
  let totalPages = 1
  try {
    const r = await fetchWithTimeout(`${API_BASE}/api/games?${params2}`)
    const data = await r.json()
    games = data.games || []
    total = data.total || 0
    totalPages = data.pages || 1
  } catch (e) {
    console.error('category page: failed to fetch games', e)
  }

  return { props: { slug: params.slug, games, total, totalPages, page } }
}

export default function CategoryPage({ slug, games, total, totalPages, page }) {
  const meta = CATEGORIES.find(c => c.id === slug)
  const currentPage = page || 1
  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : ''

  const metaTitle = `Play Free ${meta.name} Games Online${pageSuffix} - GameZone`
  const metaDescription = truncate(
    `Play ${total}+ free ${meta.name} games online. No download, no login required — instant browser gameplay.`,
    160
  )
  const canonicalUrl = `${SITE_URL}/category/${slug}${currentPage > 1 ? `?page=${currentPage}` : ''}`

  function pageHref(p) {
    return `/category/${slug}${p > 1 ? `?page=${p}` : ''}`
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: meta.name, item: `${SITE_URL}/category/${slug}` },
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

      <AdBanner adKey="accc346ac85ebb23eaf24024f7dfe74a" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="8e72acdcd4881b0f2455a7f10f8cb1c6" width="320" height="50" className="ad-mobile" />

      <nav
        aria-label="Breadcrumb"
        style={{ padding: '10px 24px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', fontSize: '13px', color: '#a0a0b0' }}
      >
        <Link href="/" style={{ color: '#e94560' }}>Home</Link>
        {' '} / {' '}{meta.name}
      </nav>

      <div className="categories-bar">
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
          <Link key={cat.id} href={`/category/${cat.id}`}>
            <span className={`cat-btn ${cat.id === slug ? 'active' : ''}`} style={{ display: 'inline-block' }}>
              {cat.icon} {cat.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">
            <h1 className="section-title">
              {meta.icon} {meta.name} Games
              <span style={{ fontSize: '14px', color: '#a0a0b0', fontWeight: 400, marginLeft: '8px' }}>
                ({total} games)
              </span>
            </h1>

            {meta.description && (
              <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, maxWidth: '900px', marginBottom: '20px' }}>
                {meta.description}
              </p>
            )}

            {games.length === 0 ? (
              <div className="no-results">
                <h2>No games found</h2>
                <p>Check back soon — we're adding new {meta.name.toLowerCase()} games regularly.</p>
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
                <AdBanner adKey="8c14d8d28f5a663ab90c9d1e1d08b4a1" width="300" height="250" lazy />
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={pageHref} />

            {(meta.why || meta.tips) && (
              <div style={{ marginTop: '40px', maxWidth: '900px' }}>
                {meta.why && (
                  <>
                    <h2 className="section-title">Why Play {meta.name} Games?</h2>
                    <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                      {meta.why}
                    </p>
                    {meta.related && meta.related.length > 0 && (
                      <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                        Also check out{' '}
                        {meta.related.map((id, i) => {
                          const relCat = CATEGORIES.find(c => c.id === id)
                          if (!relCat) return null
                          return (
                            <span key={id}>
                              {i > 0 && ' and '}
                              <Link href={`/category/${id}`} style={{ color: '#e94560' }}>
                                {relCat.name} Games
                              </Link>
                            </span>
                          )
                        })}
                        .
                      </p>
                    )}
                  </>
                )}
                {meta.tips && meta.tips.length > 0 && (
                  <>
                    <h2 className="section-title">How to Play {meta.name} Games</h2>
                    <ul style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px' }}>
                      {meta.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </main>

        <div className="ad-sidebar">
          <AdBanner adKey="5dc031c1f40c4cbf27b0c179a0be275d" width="160" height="600" lazy />
          <div style={{ marginTop: '20px' }}>
            <AdBanner adKey="5dc031c1f40c4cbf27b0c179a0be275d" width="160" height="600" lazy />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
