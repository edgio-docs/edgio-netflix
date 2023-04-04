import '@/styles/globals.css'
import { useEffect } from 'react'
import initRUM from 'edgio/rum'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import { useServiceWorker } from '@edgio/react'

// Include the RUM Analytics in the production build only
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  initRUM('42c2e33e-f277-483d-993b-7fb0ef907969')
}

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  // Install the service worker to enable prefetching
  useServiceWorker({ dev: false /* set to true to install the service worker in development mode */ })

  useEffect(() => {
    // Enable devtools manually, instead of relying on defaults by Layer0
    const handleRouteChange = () => {
      if (window.location.href.replace(/\/$/, '') === window.location.origin.replace(/\/$/, '')) {
        window.requestAnimationFrame(() => window.scrollTo(0, window.homeScrollLeave))
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <div className="flex w-full max-w-6xl flex-col items-start px-5">
        <Navbar />
        <Component key={router.asPath} {...pageProps} />
        <div className="w-full py-5"></div>
        <div className="flex flex-row space-x-2">
          <span className="text-gray-300">Author:</span>
          <a className="font-semibold text-white" target="_blank" href="https://linkedin.com/in/rishi-raj-jain">
            Rishi Raj Jain
          </a>
        </div>
        <div className="w-full py-5"></div>
      </div>
    </div>
  )
}

export default MyApp
