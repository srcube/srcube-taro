import { useLayoutEffect, useState } from 'react'

export interface UseVisibilityProps {
  isOpen?: boolean
  duration?: number
}

export function useAnimatePresence(props: UseVisibilityProps) {
  const { isOpen, duration = 500 } = props

  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useLayoutEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsClosing(false)
    }
    else {
      setIsClosing(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsClosing(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration])

  return { isVisible, isClosing }
}
