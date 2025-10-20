'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/images/hero-fallback.svg',
  className = '',
  width,
  height,
  priority = false
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      priority={priority}
      onError={handleError}
    />
  )
}