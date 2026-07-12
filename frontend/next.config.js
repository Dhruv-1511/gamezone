/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Target modern browsers to eliminate legacy polyfills (~13 KiB savings)
  // Removes polyfills for Array.at, flat, flatMap, Object.fromEntries, Object.hasOwn, etc.
  experimental: {
    browsersListForSwc: true,
  },

  images: {
    // Enable modern formats for automatic WebP/AVIF conversion
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    // Cache optimised images for 7 days instead of the default 60s
    minimumCacheTTL: 604800,
    // Breakpoints that match the sizes attr on GameCard
    deviceSizes: [480, 768, 1024, 1200, 1400],
    imageSizes: [128, 160, 200, 256],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
