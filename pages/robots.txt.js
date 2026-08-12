import { SITE_URL } from '../lib/seo'

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain')
  res.write(
    `User-agent: *\nAllow: /\nDisallow: /fetch-games\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  )
  res.end()
  return { props: {} }
}

export default function Robots() {
  return null
}
