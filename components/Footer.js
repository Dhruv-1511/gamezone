import Link from 'next/link'

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { href: '/games', label: 'All Games' },
      { href: '/top-games', label: 'Top Games' },
      { href: '/new-games', label: 'New Games' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.avif" alt="GameZone" className="footer-logo" />
          <p>Play free online games instantly in your browser — no download, no login required.</p>
        </div>

        <div className="footer-columns">
          {FOOTER_LINKS.map(col => (
            <div className="footer-col" key={col.title}>
              <h3>{col.title}</h3>
              {col.links.map(link => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {year} GameZone. All rights reserved.
      </div>
    </footer>
  )
}
