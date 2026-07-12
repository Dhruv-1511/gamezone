import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const debounceRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Sync state if url changes externally (e.g. initial load or back button)
  useEffect(() => {
    if (router.isReady) {
      setSearch(router.query.search || "");
    }
  }, [router.isReady, router.query.search]);

  // Focus mobile input when search opens
  useEffect(() => {
    if (searchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [router.asPath]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.trim()) {
        router.push(`/?search=${encodeURIComponent(val.trim())}`);
      } else {
        router.push("/");
      }
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/");
    }
    setSearchOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/logo.png"
            alt="GameBlast Logo"
            width={266}
            height={63}
            priority
            fetchpriority="high"
            className="logo-img"
          />
        </Link>

        {/* Desktop search */}
        <form className="search-form desktop-search" onSubmit={handleSearch}>
          <div className="search-box">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Search games"
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="navbar-actions">
          <span className="stats-badge">
            <span className="stats-dot" />
            2000+ Free Games
          </span>

          {/* Mobile search toggle */}
          <button
            className={`icon-btn mobile-search-btn${searchOpen ? " active" : ""}`}
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Toggle search"
          >
            {searchOpen ? (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className={`mobile-search-bar${searchOpen ? " visible" : ""}`}>
        <form className="mobile-search-form" onSubmit={handleSearch}>
          <div className="search-box">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={mobileInputRef}
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Search games mobile"
            />
            {search && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => {
                  setSearch("");
                  router.push("/");
                }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-inner">
          <Link
            href="/"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Link>
          <div className="mobile-divider" />
          <div className="mobile-stats">
            <span className="stats-dot" />
            2,000+ Free Games Available
          </div>
        </div>
      </div>
    </nav>
  );
}
