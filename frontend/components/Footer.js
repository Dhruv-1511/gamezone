import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { id: "action",    name: "Action",    href: "/action-games" },
  { id: "adventure", name: "Adventure", href: "/adventure-games" },
  { id: "arcade",   name: "Arcade",    href: "/arcade-games" },
  { id: "puzzle",   name: "Puzzle",    href: "/puzzle-games" },
  { id: "racing",   name: "Racing",    href: "/racing-games" },
  { id: "sports",   name: "Sports",    href: "/sports-games" },
  { id: "2player",  name: "2 Player",  href: "/2-player-games" },
  { id: "shooting", name: "Shooting",  href: "/shooting-games" },
  { id: "strategy", name: "Strategy",  href: "/strategy-games" },
  { id: "girls",    name: "Girls",     href: "/girls-games" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link">
            <Image
              src="/logo.png"
              alt="GameBlasts Logo"
              width={160}
              height={38}
              className="footer-logo"
            />
          </Link>
          <p className="footer-tagline">
            Your go-to destination for free online games. No downloads, no
            sign-up. just play instantly.
          </p>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/">All Games</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-col-title">Categories</h4>
          <ul className="footer-links two-col">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About / contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">About</h4>
          <p className="footer-about-text">
            GameBlasts offers 2,000+ free browser games across all genres. We
            believe gaming should be accessible to everyone — anywhere, anytime.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">
            © {year} GameBlasts. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="footer-dot">·</span>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
