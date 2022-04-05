import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import { shimmer, toBase64 } from '@/lib/shimmer'

const Image = ({ proxyImage }) => {
  // Initilaize the prop blur placeholder
  const [prop, setProp] = useState({
    placeholder: 'blur',
    blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`,
  })

  // On mounted, if the image is available in the window, dehydrate blur
  useEffect(() => {
    if (window[proxyImage]) {
      setProp({})
    }
  }, [])

  return (
    <NextImage
      {...prop}
      width={250}
      quality={100}
      layout="fixed"
      height={351.19}
      objectFit="contain"
      src={proxyImage}
      onLoad={() => {
        // if window is available, set image in window
        if (typeof window !== 'undefined') {
          window[proxyImage] = true
        }
      }}
      className="rounded-lg"
    />
  )
}

export default Image
