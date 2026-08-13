import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { BLOG_POSTS } from '../../lib/blogPosts'
import { SITE_URL } from '../../lib/seo'

const metaTitle = 'Blog - GameZone'
const metaDescription = 'Guides and tips for browser gaming — how to play games online, picking a game category, and more from the GameZone blog.'

export default function BlogIndexPage() {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 className="section-title">GameZone Blog</h1>
        <p style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
          Guides and tips for getting the most out of browser gaming.
        </p>

        {BLOG_POSTS.map(post => (
          <div key={post.slug} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '6px' }}>
              <Link href={`/blog/${post.slug}`} style={{ color: '#e94560' }}>{post.title}</Link>
            </h2>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>
              {new Date(post.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p style={{ color: '#a0a0b0', fontSize: '14px', lineHeight: 1.6 }}>{post.excerpt}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
