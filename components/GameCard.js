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
          decoding="async"
          width="512"
          height="384"
        />
        <div className="game-card-info">
          <div className="game-card-title">{game.title}</div>
          <div className="game-card-cat">{game.category || 'Game'}</div>
        </div>
      </div>
    </Link>
  )
}
