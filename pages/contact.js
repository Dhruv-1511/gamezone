import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SITE_URL, jsonLd } from '../lib/seo'

const metaTitle = 'Contact GameZone'
const metaDescription = 'Get in touch with the GameZone team for support, feedback, or business inquiries.'

// TODO: replace with your real support address before deploying.
const CONTACT_EMAIL = 'support@yourdomain.com'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
}

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
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
        <h1 className="section-title">Contact Us</h1>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
          Questions, feedback, broken game reports, or business inquiries — we'd like to hear from you.
        </p>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7 }}>
          Email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#e94560' }}>{CONTACT_EMAIL}</a>
        </p>
      </div>

      <Footer />
    </>
  )
}
