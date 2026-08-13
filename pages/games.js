import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CATEGORIES } from '../lib/categories'
import { POPULAR_SEARCHES } from '../lib/popularSearches'
import { SITE_URL, jsonLd } from '../lib/seo'

const metaTitle = 'Browse All Games - GameZone'
const metaDescription = 'Browse every game category on GameZone — action, puzzle, racing, sports, strategy, and more. 700+ free online games, no download required.'

export default function GamesHubPage() {
  const categories = CATEGORIES.filter(c => c.id !== 'all')

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/category/${c.id}`,
      name: `${c.name} Games`,
    })),
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/games`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/games`} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 className="section-title">Browse All Games</h1>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
          Every game on GameZone is organized into one of the categories below. Pick a genre to see
          the full list of free, instant-play games in it — or jump straight to{' '}
          <Link href="/top-games" style={{ color: '#e94560' }}>Top Games</Link> or{' '}
          <Link href="/new-games" style={{ color: '#e94560' }}>New Games</Link>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              style={{
                display: 'block',
                padding: '16px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{cat.icon} {cat.name}</div>
              <div style={{ fontSize: '13px', color: '#a0a0b0' }}>Play free {cat.name.toLowerCase()} games</div>
            </Link>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '48px' }}>Popular Searches</h2>
        <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
          Some of the most common ways people look for free browser games — jump straight to the closest match below.
        </p>
        <div className="search-tags">
          {POPULAR_SEARCHES.map(item => (
            <Link key={item.label} href={item.href} className="search-tag">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
