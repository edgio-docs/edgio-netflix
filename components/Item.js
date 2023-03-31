import Link from 'next/link'
import { Prefetch } from '@edgio/react'
import { createNextDataURL } from '@edgio/next/client'
import Image from 'next/image'

const Item = ({ id, name, image }) => {
  return (
    <Link href={`/show/${id}`}>
      {/* Prefetch the JSON data for each show into the service worker cache when the link scrolls into the viewport so that navigation is instant */}
      <Prefetch
        url={createNextDataURL({
          href: `/show/${id}`,
          routeParams: { id },
        })}
      >
        <div
          className="flex flex-col"
          style={{ position: 'relative' }}
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.homeScrollLeave = window.scrollY
            }
          }}
        >
          <div style={{ aspectRatio: '150 / 225' }}>
            <Image alt={name} src={image.original} width="0" height="0" sizes="25vw" style={{ width: '100%', height: 'auto' }} />
          </div>
          <h3 className="mt-3 max-w-[200px] text-gray-300">{name}</h3>
        </div>
      </Prefetch>
    </Link>
  )
}

export default Item
