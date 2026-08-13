import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { GA_MEASUREMENT_ID, pageview } from '../lib/gtag'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const handleRouteChange = (url) => pageview(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
