import { useState } from 'react'
import Head from 'next/head'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const CATEGORIES = [
  { id: "0",  name: "Action" },
  { id: "4",  name: "Adventure" },
  { id: "5",  name: "Arcade" },
  { id: "9",  name: "Puzzle" },
  { id: "14", name: "Racing" },
  { id: "18", name: "Sports" },
  { id: "2",  name: "2 Player" },
  { id: "3",  name: "3D" },
  { id: "7",  name: "Girls" },
  { id: "15", name: "Shooting" },
  { id: "17", name: "Strategy" },
]

export default function FetchGamesPage() {
  const [status, setStatus] = useState('idle')
  const [logs, setLogs] = useState([])
  const [totalSaved, setTotalSaved] = useState(0)
  const [progress, setProgress] = useState(0)

  function addLog(msg) {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  async function fetchAndSave() {
    setStatus('running')
    setLogs([])
    setTotalSaved(0)
    setProgress(0)

    let grandTotal = 0
    const totalSteps = CATEGORIES.length

    for (let i = 0; i < CATEGORIES.length; i++) {
      const cat = CATEGORIES[i]
      addLog(`Fetching: ${cat.name}...`)

      try {
        const url = `https://gamemonetize.com/feed.php?format=0&num=100&category=${cat.id}&page=1`
        const res = await fetch(url)

        if (!res.ok) {
          addLog(`  ⚠ ${cat.name}: HTTP ${res.status} (Wait 5s and try again)`)
          await new Promise(r => setTimeout(r, 5000));
          continue
        }

        const games = await res.json()

        if (!Array.isArray(games) || games.length === 0) {
          addLog(`  ⚠ ${cat.name}: No games returned`)
        } else {
          addLog(`  ✓ ${cat.name}: ${games.length} games fetched`)

          const saveRes = await fetch(`${API_BASE}/api/save-games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ games }),
          })

          const saveData = await saveRes.json()
          grandTotal = saveData.total_in_db
          setTotalSaved(grandTotal)
          addLog(`  ✓ Saved! Total in DB: ${grandTotal}`)
        }
      } catch (err) {
        addLog(`  ✗ ${cat.name} error: ${err.message}`)
      }

      setProgress(Math.round(((i + 1) / totalSteps) * 100))
      // BIG DELAY (2 seconds) to prevent 429 Too Many Requests from GameMonetize
      await new Promise(r => setTimeout(r, 2000))
    }

    setStatus('done')
    addLog(`✅ DONE! Total ${grandTotal} games saved to database.`)
    addLog(`🎮 Now open http://localhost:3000 to see your games!`)
  }

  return (
    <>
      <Head><title>Fetch Games - GameZone Setup</title></Head>
      <div style={{
        minHeight: '100vh',
        background: '#0f0f1a',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '40px 24px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#e94560' }}>
          🎮 GameZone — Backend DB Setup
        </h1>
        <p style={{ color: '#a0a0b0', marginBottom: '32px', fontSize: '14px' }}>
          Fetch games from GameMonetize and save them securely to Python backend SQLite Database.
        </p>

        <button
          onClick={fetchAndSave}
          disabled={status === 'running'}
          style={{
            background: status === 'running' ? '#444' : '#e94560',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: status === 'running' ? 'not-allowed' : 'pointer',
            marginBottom: '24px',
            width: '100%',
          }}
        >
          {status === 'idle' && '🚀 Populate Database'}
          {status === 'running' && '⏳ Fetching & Saving...'}
          {status === 'done' && '✅ Done! Fetch Again'}
        </button>

        {status !== 'idle' && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#a0a0b0' }}>
              <span>Progress</span>
              <span>{progress}% — {totalSaved} games saved</span>
            </div>
            <div style={{ background: '#1e1e32', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
              <div style={{ background: '#e94560', width: `${progress}%`, height: '100%', transition: 'width 0.3s' }} />
            </div>
          </div>
        )}

        {logs.length > 0 && (
          <div style={{
            background: '#1d1f36', border: '1px solid #2d2d4e', borderRadius: '10px', padding: '16px',
            fontSize: '13px', lineHeight: '1.8', maxHeight: '400px', overflowY: 'auto',
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: log.includes('✅') || log.includes('✓') ? '#4ade80' : log.includes('✗') || log.includes('error') ? '#f87171' : log.includes('⚠') ? '#fbbf24' : '#a0a0b0' }}>
                {log}
              </div>
            ))}
          </div>
        )}

        {status === 'done' && (
          <div style={{ marginTop: '24px', background: '#0f2d1f', border: '1px solid #166534', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#4ade80', marginBottom: '8px' }}>
              {totalSaved} Games Saved in DB!
            </div>
            <a href="/" style={{ display: 'inline-block', background: '#e94560', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              🎮 Open GameZone →
            </a>
          </div>
        )}
      </div>
    </>
  )
}
