export const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: '🎮', blurb: 'Play thousands of free online games instantly in your browser — no downloads, no installs, no sign-ups. Just click and play across action, puzzle, racing, arcade and dozens more categories.' },
  { id: 'action', name: 'Action', icon: '⚔️', blurb: 'Fast-paced free action games online — fighting, shooting, and adrenaline-fueled challenges you can jump into instantly, no download required.' },
  { id: 'adventure', name: 'Adventure', icon: '🗺️', blurb: 'Explore free adventure games online, from story-driven quests to open-world exploration, playable instantly in your browser.' },
  { id: 'arcade', name: 'Arcade', icon: '🕹️', blurb: 'Classic and modern free arcade games — quick, addictive gameplay in the browser, no installs needed.' },
  { id: 'hypercasual', name: 'Hypercasual', icon: '⚡', blurb: 'Simple, addictive free hypercasual games you can pick up in seconds and play instantly online.' },
  { id: 'puzzle', name: 'Puzzle', icon: '🧩', blurb: 'Free puzzle games online to sharpen your mind — logic, matching, and brain teasers playable instantly, no download.' },
  { id: 'racing', name: 'Racing', icon: '🏎️', blurb: 'Free racing games online — high-speed circuits, off-road rally, and karting action right in your browser.' },
  { id: 'sports', name: 'Sports', icon: '⚽', blurb: 'Free sports games online covering football, basketball, and more — instant browser gameplay, no download required.' },
  { id: 'soccer', name: 'Soccer', icon: '🥅', blurb: 'Free soccer games online — score goals and compete instantly in your browser, no installs needed.' },
  { id: '2player', name: '2 Player', icon: '👥', blurb: 'Free 2 player games to play with a friend on the same device — instant browser gameplay, no download required.' },
  { id: 'multiplayer', name: 'Multiplayer', icon: '🌐', blurb: 'Free multiplayer games online — compete or team up with other players instantly in your browser.' },
  { id: 'shooting', name: 'Shooting', icon: '🎯', blurb: 'Free shooting games online — precision aim and action-packed combat playable instantly, no download.' },
  { id: 'strategy', name: 'Strategy', icon: '♟️', blurb: 'Free strategy games online — plan, build, and outthink your opponents instantly in your browser.' },
  { id: 'stickman', name: 'Stickman', icon: '🕴️', blurb: 'Free stickman games online — physics-based action and stick-figure mayhem playable instantly, no download.' },
  { id: 'clicker', name: 'Clicker', icon: '🖱️', blurb: 'Free clicker and idle games online — simple, addictive progression you can play instantly in your browser.' },
  { id: 'cooking', name: 'Cooking', icon: '🍳', blurb: 'Free cooking games online — run a kitchen, serve customers, and master recipes instantly in your browser.' },
  { id: 'girls', name: 'Girls', icon: '👗', blurb: 'Free girls games online — fashion, makeover, and creative games playable instantly, no download required.' },
  { id: 'boys', name: 'Boys', icon: '👦', blurb: 'Free boys games online — action, sports, and competitive challenges playable instantly in your browser.' },
]

// Backend games store the human category name (e.g. "2 Player"), not the url slug.
// Use this to build a correct category link/filter from a game's raw category field.
export function categoryForName(name) {
  if (!name) return CATEGORIES[0]
  const found = CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase())
  return found || CATEGORIES[0]
}
