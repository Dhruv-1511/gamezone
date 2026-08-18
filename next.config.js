/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
  async redirects() {
    // Old category URL scheme (pre Aug-2026 restructure), still indexed by Google.
    // 301s here preserve SEO value and stop sending crawlers/users to a 404.
    const oldToNewCategory = {
      'action-games': 'action',
      'adventure-games': 'adventure',
      'arcade-games': 'arcade',
      'puzzle-games': 'puzzle',
      'racing-games': 'racing',
      'sports-games': 'sports',
      '2-player-games': '2player',
      'shooting-games': 'shooting',
      'strategy-games': 'strategy',
      'girls-games': 'girls',
    }
    const categoryRedirects = Object.entries(oldToNewCategory).map(([oldSlug, categoryId]) => ({
      source: `/${oldSlug}`,
      destination: `/category/${categoryId}`,
      permanent: true,
    }))

    // Old game URLs were slug-suffixed (e.g. /game/speed-master-cars-67100);
    // the trailing number is the real numeric id used by the current /game/[id] route.
    const gameSlugRedirect = {
      source: '/game/:slug-:id(\\d+)',
      destination: '/game/:id',
      permanent: true,
    }

    return [...categoryRedirects, gameSlugRedirect]
  },
}

module.exports = nextConfig
