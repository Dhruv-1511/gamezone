import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SITE_URL } from '../lib/seo'

const metaTitle = 'Privacy Policy - GameZone'
const metaDescription = 'Read the GameZone privacy policy covering cookies, advertising, and how we handle visitor data.'

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 className="section-title">Privacy Policy</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Information We Collect</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          GameZone does not require an account to play games. We do not collect names, emails, or
          payment information from visitors. Standard server logs (IP address, browser type, pages
          visited) are collected automatically for security and analytics purposes.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Cookies &amp; Advertising</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          GameZone displays advertising to keep games free. Our ad partners may use cookies or similar
          technologies to serve relevant ads and measure ad performance. You can control cookies through
          your browser settings.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Third-Party Games</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          Games on GameZone are embedded from third-party providers and may have their own privacy
          practices. We recommend reviewing the policies of individual game providers if you have concerns.
        </p>

        <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>Contact</h2>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7 }}>
          Questions about this policy? Visit our <Link href="/contact" style={{ color: '#e94560' }}>Contact page</Link>.
        </p>
      </div>

      <Footer />
    </>
  )
}
