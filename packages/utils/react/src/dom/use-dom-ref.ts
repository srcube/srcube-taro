import type { ReactRef } from 'types'
import { useImperativeHandle, useRef } from 'react'

export function useDOMRef<T = any>(
  ref?: ReactRef<T | null>,
) {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current)

  return domRef
}
