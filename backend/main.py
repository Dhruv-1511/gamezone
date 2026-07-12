from fastapi import FastAPI, Query, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import time
import asyncio
import httpx
from contextlib import asynccontextmanager

import os

def get_db():
    db_path = "/tmp/games.db" if os.getenv("VERCEL") else "games.db"
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS games (
            id TEXT PRIMARY KEY,
            title TEXT,
            description TEXT,
            thumb TEXT,
            url TEXT,
            category TEXT,
            tags TEXT,
            width TEXT,
            height TEXT,
            fetched_at INTEGER
        )
    """)
    db.commit()
    db.close()

def save_games_to_db(games):
    if not games:
        return
    db = get_db()
    now = int(time.time())
    for g in games:
        db.execute("""
            INSERT OR REPLACE INTO games
            (id, title, description, thumb, url, category, tags, width, height, fetched_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            str(g.get("id", "")),
            g.get("title", ""),
            g.get("description", ""),
            g.get("thumb", ""),
            g.get("url", ""),
            g.get("category", ""),
            g.get("tags", ""),
            str(g.get("width", "800")),
            str(g.get("height", "600")),
            now,
        ))
    db.commit()
    db.close()

is_syncing = False

async def fetch_gamemonetize_data(force=False):
    global is_syncing
    """Background task to fetch games from gamemonetize"""
    db = get_db()
    count = db.execute("SELECT COUNT(*) FROM games").fetchone()[0]
    db.close()

    if count > 0 and not force:
        print(f"[Auto-Fetch] Database already has {count} games. Skipping fetch.")
        return

    is_syncing = True
    print("[Auto-Fetch] Starting background sync from GameMonetize...")
    
    categories = [
        {"id": "0",  "name": "Action"}, {"id": "4",  "name": "Adventure"},
        {"id": "5",  "name": "Arcade"}, {"id": "9",  "name": "Puzzle"},
        {"id": "14", "name": "Racing"}, {"id": "18", "name": "Sports"},
        {"id": "2",  "name": "2 Player"}, {"id": "3",  "name": "3D"},
        {"id": "7",  "name": "Girls"}, {"id": "15", "name": "Shooting"},
        {"id": "17", "name": "Strategy"}
    ]

    async with httpx.AsyncClient() as client:
        for cat in categories:
            print(f"[Auto-Fetch] Syncing category: {cat['name']}...")
            url = f"https://gamemonetize.com/feed.php?format=0&num=100&category={cat['id']}&page=1"
            
            success = False
            for attempt in range(5):
                try:
                    res = await client.get(url, timeout=20.0)
                    if res.status_code == 200:
                        games = res.json()
                        if games and isinstance(games, list):
                            save_games_to_db(games)
                            print(f"  -> Saved {len(games)} games for {cat['name']}")
                            success = True
                            break # Success, escape the retry loop
                    elif res.status_code == 429:
                        wait_time = 5 * (attempt + 1) # Wait 5s, 10s, 15s...
                        print(f"  -> HTTP Error 429 (Too Many Requests). Retrying in {wait_time}s (Attempt {attempt+1}/5)...")
                        await asyncio.sleep(wait_time)
                    else:
                        print(f"  -> HTTP Error {res.status_code}. Retrying in 3s (Attempt {attempt+1}/5)...")
                        await asyncio.sleep(3)
                except Exception as e:
                    print(f"  -> Failed: {e}. Retrying in 3s (Attempt {attempt+1}/5)...")
                    await asyncio.sleep(3)
            
            if not success:
                print(f"  -> Skipping category {cat['name']} after 5 failed attempts.")

            # Base Sleep between completely different categories to prevent 429 in the first place
            await asyncio.sleep(4)
            
    db = get_db()
    final_count = db.execute("SELECT COUNT(*) FROM games").fetchone()[0]
    db.close()
    print(f"✅ [Auto-Fetch] Sync Complete! Total games in DB: {final_count}")
    is_syncing = False

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    # Games are only fetched via the /fetch-games admin page.
    # Do NOT auto-fetch here — the DB persists across restarts.
    yield

app = FastAPI(title="Game Platform API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routes ──────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Game Platform API is running!"}

@app.get("/api/db-count")
def db_count():
    db = get_db()
    count = db.execute("SELECT COUNT(*) FROM games").fetchone()[0]
    db.close()
    return {"count": count, "is_syncing": is_syncing}

@app.get("/api/sync-games")
async def trigger_sync(background_tasks: BackgroundTasks):
    global is_syncing
    if is_syncing:
        return {"status": "already syncing"}
    background_tasks.add_task(fetch_gamemonetize_data, force=True)
    return {"status": "sync started"}

@app.post("/api/save-games")
async def save_games(request: Request):
    body = await request.json()
    games = body.get("games", [])
    save_games_to_db(games)
    db = get_db()
    total = db.execute("SELECT COUNT(*) FROM games").fetchone()[0]
    db.close()
    return {"saved": len(games), "total_in_db": total}

@app.get("/api/games")
def get_games(
    category: str = Query("all"),
    page: int = Query(1),
    limit: int = Query(40),
    search: str = Query(""),
):
    db = get_db()
    offset = (page - 1) * limit

    CATEGORY_MAP = {
        "action": "Action", "adventure": "Adventure", "arcade": "Arcade",
        "puzzle": "Puzzle", "racing": "Racing", "sports": "Sports",
        "2player": "2 Player", "shooting": "Shooting", "strategy": "Strategy",
        "girls": "Girls", "3d": "3D",
    }

    if search:
        rows = db.execute(
            "SELECT * FROM games WHERE title LIKE ? LIMIT ? OFFSET ?",
            (f"%{search}%", limit, offset)
        ).fetchall()
        total = db.execute(
            "SELECT COUNT(*) FROM games WHERE title LIKE ?", (f"%{search}%",)
        ).fetchone()[0]
    elif category != "all" and category in CATEGORY_MAP:
        cat_name = CATEGORY_MAP[category]
        rows = db.execute(
            "SELECT * FROM games WHERE category LIKE ? LIMIT ? OFFSET ?",
            (f"%{cat_name}%", limit, offset)
        ).fetchall()
        total = db.execute(
            "SELECT COUNT(*) FROM games WHERE category LIKE ?", (f"%{cat_name}%",)
        ).fetchone()[0]
    else:
        rows = db.execute("SELECT * FROM games LIMIT ? OFFSET ?", (limit, offset)).fetchall()
        total = db.execute("SELECT COUNT(*) FROM games").fetchone()[0]

    db.close()
    return {
        "games": [dict(r) for r in rows],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, (total + limit - 1) // limit),
    }

@app.get("/api/games/{game_id}")
def get_game(game_id: str):
    db = get_db()
    row = db.execute("SELECT * FROM games WHERE id = ?", (game_id,)).fetchone()
    db.close()
    return dict(row) if row else {"error": "Not found"}

@app.get("/api/featured")
def get_featured():
    db = get_db()
    rows = db.execute("SELECT * FROM games ORDER BY RANDOM() LIMIT 12").fetchall()
    db.close()
    return [dict(r) for r in rows]

@app.get("/api/categories")
def get_categories():
    return {"categories": [
        {"id": "all",       "name": "All Games",  "icon": "🎮"},
        {"id": "action",    "name": "Action",     "icon": "⚔️"},
        {"id": "adventure", "name": "Adventure",  "icon": "🗺️"},
        {"id": "arcade",    "name": "Arcade",     "icon": "🕹️"},
        {"id": "puzzle",    "name": "Puzzle",     "icon": "🧩"},
        {"id": "racing",    "name": "Racing",     "icon": "🏎️"},
        {"id": "sports",    "name": "Sports",     "icon": "⚽"},
        {"id": "2player",   "name": "2 Player",   "icon": "👥"},
        {"id": "shooting",  "name": "Shooting",   "icon": "🎯"},
        {"id": "strategy",  "name": "Strategy",   "icon": "♟️"},
        {"id": "girls",     "name": "Girls",      "icon": "👗"},
    ]}
