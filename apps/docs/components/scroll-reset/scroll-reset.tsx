'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

      window.addEventListener('load', scrollToTop)
      window.scrollTo(0, 0)

      return () => {
        window.removeEventListener('load', scrollToTop)
      }
    }
  }, [pathname])

  return null
}

ScrollReset.displayName = 'ScrollReset'

export default ScrollReset
