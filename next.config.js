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
    return Object.entries(oldToNewCategory).map(([oldSlug, categoryId]) => ({
      source: `/${oldSlug}`,
      destination: `/category/${categoryId}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
