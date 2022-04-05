import Link from 'next/link'
import '../styles/globals.css'
import { useEffect } from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'

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
