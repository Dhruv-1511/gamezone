import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CATEGORIES } from '../lib/categories'

const metaTitle = 'Page Not Found - GameZone'
const metaDescription = "The page you're looking for doesn't exist. Browse free online games by category on GameZone instead."

export default function NotFoundPage() {
  const categories = CATEGORIES.filter(c => c.id !== 'all').slice(0, 8)

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,follow" />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎮</div>
        <h1 className="section-title" style={{ justifyContent: 'center', fontSize: '28px' }}>404 - Page Not Found</h1>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
          Looks like this page took a wrong turn. It may have been moved or no longer exists —
          but there are still 700+ free games waiting for you below.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link href="/" className="page-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            🏠 Go Home
          </Link>
          <Link href="/games" className="page-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            🕹️ Browse All Games
          </Link>
          <Link href="/top-games" className="page-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            🏆 Top Games
          </Link>
        </div>

        <h2 className="section-title" style={{ justifyContent: 'center', fontSize: '18px' }}>Popular Categories</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="search-tag">
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
