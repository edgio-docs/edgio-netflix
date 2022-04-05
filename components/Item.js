import Image from './Image'
import Link from 'next/link'

const Item = ({ id, name, image }) => {
  return (
    <Link href={`/show/${id}`}>
      <a>
        {/* it's critical that the keys match the param names in your next page routes */}
        <div
          className="flex flex-col items-center text-center"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.homeScrollLeave = window.scrollY
            }
          }}
        >
          <Image
            proxyImage={image.hasOwnProperty('medium') ? image['medium'] : image['original']}
          />
          <h3 className="mt-3 text-gray-300 max-w-[250px]">{name}</h3>
        </div>
      </a>
    </Link>
  )
}

export default Item
