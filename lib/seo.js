export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

// Safe to embed inside a <script type="application/ld+json"> tag —
// escapes "<" so a title/description containing "</script>" can't break out of it.
export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function truncate(str, max) {
  if (!str) return ''
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str
}
