/**
 * 👍🏻 Code reference from @hero-ui/use-callback-ref
 */

import { useCallback, useLayoutEffect, useRef } from 'react'

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param fn the function to persist
 * @param deps the function dependency list
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
  fn: T | undefined,
  deps: React.DependencyList = [],
): T {
  const ref = useRef(fn)

  useLayoutEffect(() => {
    ref.current = fn
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current?.(...args)) as T, deps)
}
