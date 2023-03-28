import Link from 'next/link'
import Prefetch from '@edgio/react/Prefetch'
import { createNextDataURL } from '@edgio/next/client'

const Navbar = () => {
  return (
    <Link passHref href="/">
      <Prefetch url={createNextDataURL({ href: '/' })}>
        <div className="mt-10 flex flex-row items-center justify-start gap-x-2">
          <img src="/logo/white.svg" width="75px" />
          <img src="/plus.png" height={10 * 0.8} width={10 * 0.8} />
          <img src="/logo/tvmaze.png" height={40 * 0.8} width={126.5 * 0.8} />
        </div>
      </Prefetch>
    </Link>
  )
}

export default Navbar
