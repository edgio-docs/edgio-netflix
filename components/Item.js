import Link from 'next/link'
import { Prefetch } from '@edgio/react'
import { createNextDataURL } from '@edgio/next/client'
import Image from 'next/image'

const Item = ({ id, name, image }) => {
  return (
    <Link href={`/show/${id}`} className="w-[150px]">
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
          <Image alt={name} src={image.original} width="0" height="0" sizes="25vw" style={{ width: '100%', height: 'auto' }} />
          <h3 className="mt-3 max-w-[200px] text-gray-300">{name}</h3>
        </div>
      </Prefetch>
    </Link>
  )
}

export default Item
