import type { TaroElement } from '@tarojs/runtime'
import type { ReactRef } from '../types'
import { useImperativeHandle, useRef } from 'react'

export function useDOMRef<T = TaroElement>(
  ref?: ReactRef<T | null>,
) {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current)

  return domRef
}
