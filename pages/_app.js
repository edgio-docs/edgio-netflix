import Link from 'next/link'
import '../styles/globals.css'
import { useEffect } from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { Metrics } from '@layer0/rum'

new Metrics({
  token: 'f40d8a44-c529-40ce-89da-7847c7321c11',
}).collect()

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  // Include cache misses if not found in PDP
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.href.replace(/\/$/, '') === window.location.origin.replace(/\/$/, '')) {
        window.requestAnimationFrame(() => window.scrollTo(0, window.homeScrollLeave))
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <div className="bg-[#181818] w-full flex flex-col items-center">
      <Link href="/">
        <a>
          <div className="pt-10 flex flex-row items-center justify-center gap-x-2">
            <NextImage src="/assets/layer0.png" height={39 * 0.8} width={159 * 0.8} />
            <NextImage src="/assets/plus.png" height={10 * 0.8} width={10 * 0.8} />
            <NextImage src="/assets/tvmaze.png" height={40 * 0.8} width={126.5 * 0.8} />
          </div>
        </a>
      </Link>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
