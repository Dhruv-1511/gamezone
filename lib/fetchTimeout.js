// Plain fetch has no default timeout in Node — if the backend hangs, getServerSideProps
// hangs with it and the whole page never responds. This bounds every SSR backend call.
export async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
