/**
 * Dynamic XML sitemap — generated server-side on every request.
 * At build time (next build + next start), Next.js will call this via
 * getServerSideProps which hits the API for all games.
 *
 * URL: /sitemap.xml
 */

import { slugify, gameSlug } from '../utils/slug'

const SITE_URL = 'https://gameblasts.com'

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/?category=action', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=adventure', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=arcade', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=puzzle', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=racing', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=sports', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=2player', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=shooting', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=strategy', priority: '0.8', changefreq: 'daily' },
  { url: '/?category=girls', priority: '0.8', changefreq: 'daily' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { url: '/terms-and-conditions', priority: '0.3', changefreq: 'monthly' },
]

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap(games) {
  const today = new Date().toISOString().split('T')[0]

  const staticEntries = STATIC_PAGES.map(
    ({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${escapeXml(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('')

  const gameEntries = games.map(game => {
    const slug = gameSlug(game)
    const image = game.thumb ? `
    <image:image>
      <image:loc>${escapeXml(game.thumb)}</image:loc>
      <image:title>${escapeXml(game.title)}</image:title>
    </image:image>` : ''

    return `
  <url>
    <loc>${SITE_URL}/game/${escapeXml(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>${image}
  </url>`
  }).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${staticEntries}
${gameEntries}
</urlset>`
}

export default function Sitemap() {
  // getServerSideProps handles the response — this component never renders
  return null
}

export async function getServerSideProps({ res }) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')

  let games = []

  try {
    const response = await fetch(
      `${API_BASE}/api/games?category=all&page=1&limit=2000`,
      { headers: { Accept: 'application/json' } }
    )
    if (response.ok) {
      const data = await response.json()
      games = data.games || []
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch games:', err.message)
  }

  const sitemap = buildSitemap(games)

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  // Cache for 12 hours on CDN, revalidate in background
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=43200, stale-while-revalidate=86400'
  )
  res.write(sitemap)
  res.end()

  return { props: {} }
}
