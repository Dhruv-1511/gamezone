import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SITE_URL, jsonLd } from '../lib/seo'

const metaTitle = 'Terms of Service - GameZone'
const metaDescription = 'Terms of service for using GameZone, our free online games platform.'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${SITE_URL}/terms` },
  ],
}

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/terms`} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 className="section-title">Terms of Service</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Use of GameZone</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          GameZone provides free access to browser-based games for personal, non-commercial entertainment.
          By using this site you agree not to misuse it — including attempting to disrupt service,
          scrape content at scale, or redistribute games without permission from their original creators.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Third-Party Content</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          Games hosted or embedded on GameZone are provided by third-party developers and platforms.
          GameZone does not guarantee uninterrupted availability of any individual game and is not
          responsible for the content or behavior of third-party game code.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Changes to These Terms</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          We may update these terms from time to time. Continued use of GameZone after changes are
          posted means you accept the updated terms.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Contact</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7 }}>
          Questions about these terms? Visit our <Link href="/contact" style={{ color: '#e94560' }}>Contact page</Link>.
        </p>
      </div>

      <Footer />
    </>
  )
}
