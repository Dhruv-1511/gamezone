import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const debounceRef = useRef(null)

  // Sync state if url changes externally (e.g. initial load or back button)
  useEffect(() => {
    if (router.isReady) {
      setSearch(router.query.search || '')
    }
  }, [router.isReady, router.query.search])

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearch(val)
    
    if (debounceRef.current) clearTimeout(debounceRef.current)
    
    debounceRef.current = setTimeout(() => {
      if (val.trim()) {
        router.push(`/?search=${encodeURIComponent(val.trim())}`)
      } else {
        router.push('/')
      }
    }, 500)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`)
    } else {
      router.push('/')
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/">
          <div className="logo">🎮 Game<span>Zone</span></div>
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-box">
            <svg width="16" height="16" fill="none" stroke="#a0a0b0" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </form>

        <div className="stats-text">
          2000+ Free Games
        </div>
      </div>
    </nav>
  )
}
