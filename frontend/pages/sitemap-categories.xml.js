/** /sitemap-categories.xml — 10 category pages */
export default function SitemapCategories() { return null }

export async function getServerSideProps({ res }) {
  const SITE = 'https://gameblasts.com'
  const today = new Date().toISOString().split('T')[0]

  const categories = [
    '/action-games',
    '/adventure-games',
    '/arcade-games',
    '/puzzle-games',
    '/racing-games',
    '/sports-games',
    '/2-player-games',
    '/shooting-games',
    '/strategy-games',
    '/girls-games',
  ]

  const entries = categories.map(url => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=172800')
  res.write(xml)
  res.end()
  return { props: {} }
}
