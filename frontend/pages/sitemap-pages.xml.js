/** /sitemap-pages.xml — Static pages */
export default function SitemapPages() { return null }

export async function getServerSideProps({ res }) {
  const SITE = 'https://gameblasts.com'
  const today = new Date().toISOString().split('T')[0]

  const pages = [
    { url: '/',                       priority: '1.0', changefreq: 'daily' },
    { url: '/privacy-policy',         priority: '0.3', changefreq: 'monthly' },
    { url: '/terms-and-conditions',   priority: '0.3', changefreq: 'monthly' },
  ]

  const entries = pages.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
