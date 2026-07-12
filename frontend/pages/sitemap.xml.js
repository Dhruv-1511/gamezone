/**
 * /sitemap.xml — Sitemap Index
 * Points Google to the three child sitemaps.
 */
export default function SitemapIndex() { return null }

export async function getServerSideProps({ res }) {
  const SITE = 'https://gameblasts.com'
  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-categories.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-games.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=172800')
  res.write(xml)
  res.end()
  return { props: {} }
}
