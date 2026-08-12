import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="logo">
          <img src="/logo.avif" alt="GameZone" className="logo-img" />
        </div>
      </Link>

      <form onSubmit={handleSearch}>
        <div className="search-box">
          <svg width="16" height="16" fill="none" stroke="#a0a0b0" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className="navbar-badge">
        2000+ Free Games
      </div>
    </nav>
  )
}
