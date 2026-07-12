/**
 * Converts a game title into a URL-friendly slug.
 * e.g. "Idle Restaurant Tale!" → "idle-restaurant-tale"
 */
export function slugify(title = '') {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // remove special chars
    .trim()
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // collapse multiple hyphens
}

/**
 * Builds a full game slug: "{title-slug}-{id}"
 * e.g. "idle-restaurant-tale-60800"
 */
export function gameSlug(game) {
  return `${slugify(game.title)}-${game.id}`
}

/**
 * Extracts the numeric game ID from a slug string.
 * e.g. "idle-restaurant-tale-60800" → "60800"
 */
export function idFromSlug(slug = '') {
  const parts = slug.split('-')
  return parts[parts.length - 1]
}
