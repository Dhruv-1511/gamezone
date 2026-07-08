# 🎮 GameZone - Full Stack Game Platform
### Next.js + Python FastAPI + GameMonetize API

---

## 📁 Project Structure

```
game-platform/
├── backend/          ← Python FastAPI server
│   ├── main.py
│   └── requirements.txt
└── frontend/         ← Next.js website
    ├── pages/
    │   ├── index.js          (Home page - game grid)
    │   └── game/[id].js      (Game player page)
    ├── components/
    │   ├── Navbar.js
    │   └── GameCard.js
    └── styles/globals.css
```

---

## 🚀 Setup & Run (Step by Step)

### STEP 1 — Python Backend Start Karo

```bash
# backend folder ma jao
cd game-platform/backend

# Dependencies install karo
pip install -r requirements.txt

# Server start karo
uvicorn main:app --reload --port 8000
```

✅ Backend chalu thay: http://localhost:8000

Test karo: http://localhost:8000/api/games

---

### STEP 2 — Next.js Frontend Start Karo

```bash
# New terminal kholo
cd game-platform/frontend

# Dependencies install karo
npm install

# Development server start karo
npm run dev
```

✅ Website chalu thay: http://localhost:3000

---

### STEP 3 — Games Fetch Karo (First Time)

Pehli var site kholso tyare automatic games fetch thase.
Ya manually refresh kari sakso:

```bash
curl -X POST http://localhost:8000/api/refresh-games
```

---

## 🌐 Features

- ✅ 2000+ Free HTML5 Games (GameMonetize)
- ✅ Categories: Action, Puzzle, Racing, Sports, 2Player...
- ✅ Search functionality
- ✅ Fullscreen game play
- ✅ Mobile responsive
- ✅ Fast loading with skeleton screens
- ✅ Related games suggestions
- ✅ SQLite database caching
- ✅ Pagination

---

## 📡 API Endpoints

| Endpoint | Description |
|---------|-------------|
| GET /api/games | All games (with filter/search/page) |
| GET /api/games/{id} | Single game |
| GET /api/categories | All categories |
| GET /api/featured | 6 random games |
| POST /api/refresh-games | Refresh game data |

---

## 🌍 Production Deploy

### Backend (Python) - Deploy on Railway/Render:
```bash
# Render.com par free deploy thay
# Build command: pip install -r requirements.txt
# Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Next.js) - Deploy on Vercel:
```bash
# Vercel par free deploy
# .env.local ma API URL update karo:
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 💰 Revenue (Optional)

GameMonetize account banao → games ma ads auto-inject thase → 45%+ revenue share!
Register: https://gamemonetize.com
