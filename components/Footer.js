import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', marginTop: '40px', fontSize: '13px', color: '#a0a0b0', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Link href="/games" style={{ color: '#a0a0b0' }}>All Games</Link>
      <Link href="/top-games" style={{ color: '#a0a0b0' }}>Top Games</Link>
      <Link href="/new-games" style={{ color: '#a0a0b0' }}>New Games</Link>
      <Link href="/blog" style={{ color: '#a0a0b0' }}>Blog</Link>
      <Link href="/about" style={{ color: '#a0a0b0' }}>About</Link>
      <Link href="/contact" style={{ color: '#a0a0b0' }}>Contact</Link>
      <Link href="/privacy" style={{ color: '#a0a0b0' }}>Privacy Policy</Link>
      <Link href="/terms" style={{ color: '#a0a0b0' }}>Terms of Service</Link>
    </footer>
  )
}
