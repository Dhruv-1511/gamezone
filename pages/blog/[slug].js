import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { BLOG_POSTS, getBlogPost } from '../../lib/blogPosts'
import { SITE_URL, jsonLd } from '../../lib/seo'

export async function getStaticPaths() {
  return {
    paths: BLOG_POSTS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) return { notFound: true }
  return { props: { post } }
}

export default function BlogPostPage({ post }) {
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@type': 'Organization', name: 'GameZone' },
    publisher: {
      '@type': 'Organization',
      name: 'GameZone',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.avif` },
    },
    mainEntityOfPage: canonicalUrl,
  }

  return (
    <>
      <Head>
        <title>{`${post.title} - GameZone Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="GameZone" />
        <meta property="og:image" content={`${SITE_URL}/logo.avif`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.avif`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      </Head>

      <Navbar />

      <div className="page-container" style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: '#a0a0b0', marginBottom: '16px' }}>
          <Link href="/blog" style={{ color: '#e94560' }}>Blog</Link> / {post.title}
        </nav>

        <h1 className="section-title">{post.title}</h1>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '20px' }}>
          {new Date(post.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {post.paragraphs.map((p, i) => (
          <p key={i} style={{ color: '#a0a0b0', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            {p}
          </p>
        ))}

        <p style={{ marginTop: '24px' }}>
          <Link href="/games" style={{ color: '#e94560' }}>Browse all game categories →</Link>
        </p>
      </div>

      <Footer />
    </>
  )
}
