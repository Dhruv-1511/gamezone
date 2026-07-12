/**
 * /sitemap-games.xml
 * Fetches all games from the API at build/request time and generates
 * a full game sitemap with image:image tags (Google Image Sitemap).
 */
import { gameSlug } from '../utils/slug'

const SITE = 'https://gameblasts.com'

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default function SitemapGames() { return null }

export async function getServerSideProps({ res }) {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  const today = new Date().toISOString().split('T')[0]

  let games = []
  try {
    const response = await fetch(`${API}/api/games?category=all&page=1&limit=2000`)
    if (response.ok) {
      const data = await response.json()
      games = data.games || []
    }
  } catch (err) {
    console.error('[sitemap-games] API error:', err.message)
  }

  const entries = games.map(game => {
    const slug = gameSlug(game)
    const imageTag = game.thumb ? `
    <image:image>
      <image:loc>${escapeXml(game.thumb)}</image:loc>
      <image:title>${escapeXml(game.title)}</image:title>
    </image:image>` : ''

    return `
  <url>
    <loc>${SITE}/game/${escapeXml(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>${imageTag}
  </url>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  // Cache for 12 hours; Google re-crawls on revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}
