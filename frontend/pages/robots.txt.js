export default function Robots() {
  return null
}

export async function getServerSideProps({ res }) {
  const SITE_URL = 'https://gameblasts.com'

  const robots = `User-agent: *
Allow: /

Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400')
  res.write(robots)
  res.end()

  return { props: {} }
}
