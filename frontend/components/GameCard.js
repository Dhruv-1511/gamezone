import Link from 'next/link'
import { useState } from 'react'

export default function GameCard({ game }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <Link href={`/game/${game.id}`}>
      <div className="game-card">
        <img
          src={imgErr ? '/placeholder.png' : game.thumb}
          alt={game.title}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
        <div className="game-card-play">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div className="game-card-info">
          <div className="game-card-title">{game.title}</div>
        </div>
      </div>
    </Link>
  )
}
