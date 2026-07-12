import Link from 'next/link'
import Image from 'next/image'
import { gameSlug } from '../utils/slug'

// priority=true for the first ~8 cards to fix LCP
export default function GameCard({ game, priority = false }) {
  return (
    <Link href={`/game/${gameSlug(game)}`} prefetch={false}>
      <div className="game-card">
        <Image
          src={game.thumb}
          alt={game.title}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 20vw, 200px"
          style={{ objectFit: 'cover' }}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized={false}
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
