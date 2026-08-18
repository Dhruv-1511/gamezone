import Link from 'next/link'

export default function Pagination({ currentPage, totalPages, buildHref }) {
  if (totalPages <= 1) return null

  const pageNumbers = []
  for (let i = 0; i < Math.min(5, totalPages); i++) {
    let p
    if (totalPages <= 5) p = i + 1
    else if (currentPage <= 3) p = i + 1
    else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
    else p = currentPage - 2 + i
    pageNumbers.push(p)
  }

  function scrollTop() {
    window.scrollTo(0, 0)
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className="page-btn" onClick={scrollTop}>
          ← Prev
        </Link>
      ) : (
        <span className="page-btn" aria-disabled="true">← Prev</span>
      )}

      {pageNumbers.map(p =>
        p === currentPage ? (
          <span key={p} className="page-btn active" aria-current="page">{p}</span>
        ) : (
          <Link key={p} href={buildHref(p)} className="page-btn" onClick={scrollTop}>{p}</Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className="page-btn" onClick={scrollTop}>
          Next →
        </Link>
      ) : (
        <span className="page-btn" aria-disabled="true">Next →</span>
      )}
    </nav>
  )
}
