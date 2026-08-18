// Plain fetch has no default timeout in Node — if the backend hangs, getServerSideProps
// hangs with it and the whole page never responds. This bounds every SSR backend call.
//
// One retry with a longer timeout covers the backend's free-tier cold start (it spins
// down after ~15 min idle and can take well past a normal timeout to wake up) — without
// it, a sleeping backend makes a perfectly valid page look 404 to both users and Googlebot.
export async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  try {
    return await attempt(url, options, timeoutMs)
  } catch (e) {
    return await attempt(url, options, 20000)
  }
}

async function attempt(url, options, timeoutMs) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
