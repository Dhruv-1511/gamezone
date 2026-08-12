import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SITE_URL } from '../lib/seo'

const metaTitle = 'About GameZone - Free Online Games'
const metaDescription = 'GameZone is a free browser gaming site with 700+ instant-play games across action, puzzle, racing, sports and more. No download, no login required.'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:site_name" content="GameZone" />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 className="section-title">About GameZone</h1>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          GameZone is a free online gaming site with over 700 browser games spanning action, adventure,
          puzzle, racing, sports, and more. Every game runs instantly in your browser — no download,
          no install, and no account required.
        </p>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          Our library is organized by category so you can quickly find the type of game you're in the
          mood for, and new titles are added regularly. GameZone is supported by advertising, which is
          how we're able to keep every game free to play.
        </p>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7 }}>
          Have a question or feedback? Visit our <a href="/contact" style={{ color: '#e94560' }}>Contact page</a>.
        </p>
      </div>

      <Footer />
    </>
  )
}
