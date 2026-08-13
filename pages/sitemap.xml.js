import { SITE_URL } from '../lib/seo'
import { CATEGORIES } from '../lib/categories'
import { BLOG_POSTS } from '../lib/blogPosts'
import { fetchWithTimeout } from '../lib/fetchTimeout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function urlEntry(loc, { changefreq, priority }) {
  return `<url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

export async function getServerSideProps({ res }) {
  let gameIds = []
  try {
    const limit = 100
    const MAX_PAGES = 50 // safety cap: up to 5000 games in the sitemap
    for (let page = 1; page <= MAX_PAGES; page++) {
      const r = await fetchWithTimeout(`${API_BASE}/api/games?limit=${limit}&page=${page}`, {}, 8000)
      const data = await r.json()
      const games = data.games || []
      gameIds.push(...games.map(g => g.id))
      if (games.length < limit) break
    }
  } catch (e) {
    console.error('sitemap: failed to fetch games from API', e)
  }

  const entries = [
    urlEntry(`${SITE_URL}/`, { changefreq: 'daily', priority: '1.0' }),
    urlEntry(`${SITE_URL}/games`, { changefreq: 'weekly', priority: '0.8' }),
    urlEntry(`${SITE_URL}/top-games`, { changefreq: 'daily', priority: '0.8' }),
    urlEntry(`${SITE_URL}/new-games`, { changefreq: 'daily', priority: '0.8' }),
    ...CATEGORIES.filter(c => c.id !== 'all').map(c =>
      urlEntry(`${SITE_URL}/category/${c.id}`, { changefreq: 'daily', priority: '0.7' })
    ),
    urlEntry(`${SITE_URL}/blog`, { changefreq: 'weekly', priority: '0.6' }),
    ...BLOG_POSTS.map(p =>
      urlEntry(`${SITE_URL}/blog/${p.slug}`, { changefreq: 'monthly', priority: '0.5' })
    ),
    urlEntry(`${SITE_URL}/about`, { changefreq: 'monthly', priority: '0.4' }),
    urlEntry(`${SITE_URL}/contact`, { changefreq: 'monthly', priority: '0.4' }),
    urlEntry(`${SITE_URL}/privacy`, { changefreq: 'yearly', priority: '0.3' }),
    urlEntry(`${SITE_URL}/terms`, { changefreq: 'yearly', priority: '0.3' }),
    ...gameIds.map(id =>
      urlEntry(`${SITE_URL}/game/${id}`, { changefreq: 'weekly', priority: '0.6' })
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function SiteMap() {
  return null
}
