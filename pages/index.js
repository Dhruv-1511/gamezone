import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import GameCard from '../components/GameCard'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import { CATEGORIES } from '../lib/categories'
import { SITE_URL, jsonLd, truncate } from '../lib/seo'
import { fetchWithTimeout } from '../lib/fetchTimeout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getServerSideProps({ query, res }) {
  const category = typeof query.category === 'string' ? query.category : 'all'
  const page = parseInt(query.page) || 1
  const search = typeof query.search === 'string' ? query.search : ''

  // Categories used to live at /?category=X. Now they have real crawlable
  // pages at /category/X — send a permanent redirect so old links/rankings
  // consolidate onto the new URL instead of splitting signal across both.
  if (category !== 'all' && !search) {
    res.writeHead(301, { Location: `/category/${category}${page > 1 ? `?page=${page}` : ''}` })
    res.end()
    return { props: {} }
  }

  const params = new URLSearchParams({ category, page: String(page), limit: '40' })
  if (search) params.append('search', search)

  // Run both backend calls in parallel — sequential awaits would stack their
  // timeouts (worst case 2x wait) if the backend is slow or unreachable.
  const [countSettled, gamesSettled] = await Promise.allSettled([
    fetchWithTimeout(`${API_BASE}/api/db-count`).then(r => r.json()),
    fetchWithTimeout(`${API_BASE}/api/games?${params}`).then(r => r.json()),
  ])

  if (countSettled.status === 'rejected') {
    console.error('homepage: failed to check db-count', countSettled.reason)
  } else if (countSettled.value.count === 0) {
    return { props: { dbEmpty: true, syncCount: countSettled.value.count, games: [], total: 0, totalPages: 1, category, page, search } }
  }

  if (gamesSettled.status === 'rejected') {
    console.error('homepage: failed to fetch games', gamesSettled.reason)
    return { props: { dbEmpty: false, games: [], total: 0, totalPages: 1, category, page, search } }
  }

  const data = gamesSettled.value
  return {
    props: {
      dbEmpty: false,
      games: data.games || [],
      total: data.total || 0,
      totalPages: data.pages || 1,
      category,
      page,
      search,
    },
  }
}

export default function HomePage({ dbEmpty, syncCount, games, total, totalPages, category, page, search }) {
  const router = useRouter()
  const activeCategory = category || 'all'
  const currentPage = page || 1

  // Rare, one-time bootstrap case: DB is still being populated on first deploy.
  // A hard reload is simplest here since it always re-runs getServerSideProps.
  useEffect(() => {
    if (!dbEmpty) return
    const t = setTimeout(() => window.location.reload(), 5000)
    return () => clearTimeout(t)
  }, [dbEmpty])

  function setCategory(cat) {
    router.push({ pathname: '/', query: { category: cat, page: 1 } })
  }

  function setPage(p) {
    router.push({ pathname: '/', query: { category: activeCategory, page: p, ...(search ? { search } : {}) } })
    window.scrollTo(0, 0)
  }

  const activeCategoryMeta = CATEGORIES.find(c => c.id === activeCategory)
  const showHero = activeCategory === 'all' && !search && currentPage === 1 && !dbEmpty

  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : ''
  let metaTitle, metaDescription
  if (search) {
    metaTitle = `Search results for "${search}"${pageSuffix} - GameZone`
    metaDescription = `Found ${total} free online games matching "${search}". Play instantly in your browser, no download needed.`
  } else if (activeCategory !== 'all' && activeCategoryMeta) {
    metaTitle = `Play Free ${activeCategoryMeta.name} Games Online${pageSuffix} - GameZone`
    metaDescription = truncate(
      `Play ${total}+ free ${activeCategoryMeta.name} games online. No download, no login required — instant browser gameplay.`,
      160
    )
  } else {
    metaTitle = `GameZone - Play Free Online Games${pageSuffix}`
    metaDescription = `Play ${total || '2000'}+ free online games instantly in your browser — action, puzzle, racing, arcade and more. No download required.`
  }

  const canonicalParams = new URLSearchParams()
  if (activeCategory !== 'all') canonicalParams.set('category', activeCategory)
  if (currentPage > 1) canonicalParams.set('page', String(currentPage))
  if (search) canonicalParams.set('search', search)
  const canonicalQuery = canonicalParams.toString()
  const canonicalUrl = `${SITE_URL}/${canonicalQuery ? `?${canonicalQuery}` : ''}`

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GameZone',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GameZone',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.avif`,
  }

  const FAQS = [
    { q: 'Are the games on GameZone free to play?', a: `Yes. All ${total || '2000'}+ games on GameZone are completely free to play, with no purchase or subscription required.` },
    { q: 'Do I need to download or install anything?', a: 'No download or install is needed. Every game runs directly in your browser — just click and play instantly.' },
    { q: 'Do I need to create an account to play?', a: 'No account or login is required. You can start playing any game on GameZone right away.' },
    { q: 'Can I play GameZone games on mobile?', a: 'Most games work on both desktop and mobile browsers. For the best experience on phones and tablets, use the fullscreen button on the game page.' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const itemListSchema = games.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: games.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/game/${g.id}`,
      name: g.title,
    })),
  } : null

  const HeadingTag = showHero ? 'h2' : 'h1'

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        {search && <meta name="robots" content="noindex,follow" />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />

        {showHero && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
        )}
        {showHero && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }} />
        )}
        {showHero && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}
        {itemListSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />
        )}
      </Head>

      {dbEmpty && syncCount > 0 && (
        <div style={{ background: '#3b82f6', color: 'white', textAlign: 'center', padding: '8px', fontSize: '13px' }}>
          ⏳ Fetching new games in background... {syncCount} imported so far.
        </div>
      )}

      <Navbar />

      {/* Top Banner Ads */}
      <AdBanner adKey="cb8a86192cbd60e68342f7c1326fe438" width="728" height="90" className="ad-desktop" />
      <AdBanner adKey="e81a99924f7e6dbb9f55755c8d179f31" width="320" height="50" className="ad-mobile" />

      <div className="categories-bar">
        <button className="cat-btn active" onClick={() => setCategory('all')}>
          🎮 All Games
        </button>
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
          <Link key={cat.id} href={`/category/${cat.id}`}>
            <span className="cat-btn" style={{ display: 'inline-block' }}>
              {cat.icon} {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {showHero && (
        <div className="hero">
          <h1>🎮 Play Free Online Games</h1>
          <p>{total}+ games — No download, No login required!</p>
        </div>
      )}

      {showHero && (
        <div className="page-container" style={{ paddingBottom: 0 }}>
          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Play</h3>
              <p>Jump straight into any game in your browser — no downloads or installs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>No Login Needed</h3>
              <p>Play every game for free without creating an account or signing in.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Works Everywhere</h3>
              <p>Fully playable on desktop, tablet, and mobile browsers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕹️</div>
              <h3>{total || '2000'}+ Games</h3>
              <p>A huge library across 17 categories, updated with new games regularly.</p>
            </div>
          </div>
        </div>
      )}

      <div className="homepage-layout">
        <main className="homepage-main">
          <div className="page-container">
            {dbEmpty ? (
              <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h1 style={{ color: '#e94560', marginBottom: '16px', fontSize: '24px' }}>⚙️ Syncing Games...</h1>
                {syncCount > 0 && (
                  <div style={{ marginBottom: '16px', fontSize: '18px', color: '#4ade80' }}>
                    {syncCount} games fetched so far!
                  </div>
                )}
                <p style={{ color: '#a0a0b0' }}>Please wait, database is being populated directly from the backend securely.</p>
                <p style={{ color: '#666', fontSize: '13px', marginTop: '10px' }}>This only happens once on a fresh setup. Games will appear shortly.</p>
              </div>
            ) : (
              <>
                <HeadingTag className="section-title">
                  {search ? (
                    <span>🔍 Results for &quot;{search}&quot; ({total} games)</span>
                  ) : (
                    <span>
                      {activeCategoryMeta?.icon}{' '}
                      {activeCategoryMeta?.name}
                      <span style={{ fontSize: '14px', color: '#a0a0b0', fontWeight: 400, marginLeft: '8px' }}>
                        ({total} games)
                      </span>
                    </span>
                  )}
                </HeadingTag>

                {games.length === 0 ? (
                  <div className="no-results">
                    <h2>No games found</h2>
                    <p>Try a different category</p>
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
                     {/* Square Ad before Pagination */}
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

                {showHero && (
                  <div style={{ marginTop: '40px', maxWidth: '900px' }}>
                    <h2 className="section-title">Why Play on GameZone?</h2>
                    <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                      GameZone hosts {total || '2000'}+ free browser games across 17 categories — action, puzzle,
                      racing, sports, strategy, and more — so you can jump straight from picking a genre to
                      playing, with no download, install, or account required.
                    </p>
                    <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6 }}>
                      Every game runs directly in your browser on desktop or mobile. Browse by category to
                      find your favorite genre, check <Link href="/new-games" style={{ color: '#e94560' }}>New Games</Link> for
                      the latest additions, or head to <Link href="/top-games" style={{ color: '#e94560' }}>Top Games</Link> for
                      our most popular picks.
                    </p>
                  </div>
                )}

                {showHero && (
                  <div style={{ marginTop: '40px' }}>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    {FAQS.map(f => (
                      <div key={f.q} style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '15px', marginBottom: '4px' }}>{f.q}</h3>
                        <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6 }}>{f.a}</p>
                      </div>
                    ))}
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
