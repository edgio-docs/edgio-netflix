import Link from 'next/link'
import '../styles/globals.css'
import { useEffect } from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import Prefetch from '@layer0/react/Prefetch'
import { install } from '@layer0/prefetch/window'
import { Metrics } from '@layer0/rum'

new Metrics({ token: '5238fa35-ae29-4984-b516-b2f03e920130' }).collect()

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  // Include cache misses if not found in PDP
  useEffect(() => {
    install({
      includeCacheMisses: true,
    })

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
    <div className="w-full flex flex-col items-center">
      <Link href="/">
        <a>
          <Prefetch url="/">
            <div className="pt-10 flex flex-row items-center justify-center gap-x-2">
              <NextImage
                src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/layer0.png'}
                height={39 * 0.8}
                width={159 * 0.8}
              />
              <NextImage
                src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/plus.png'}
                height={10 * 0.8}
                width={10 * 0.8}
              />
              <NextImage
                src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/tvmaze.png'}
                height={40 * 0.8}
                width={126.5 * 0.8}
              />
            </div>
          </Prefetch>
        </a>
      </Link>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
