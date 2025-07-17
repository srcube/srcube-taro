import { useLayoutEffect, useRef, useState } from 'react'

export function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | null>()
  const observer = useRef<IntersectionObserver>()

  useLayoutEffect(() => {
    const elements = selectors.map(selector => document.querySelector(selector))

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.getAttribute('id'))
        }
      })
    }, options)
    elements.forEach(el => el && observer.current?.observe(el))

    if (!activeId) {
      setActiveId(elements[0]?.getAttribute('id') || null)
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }

    return () => observer.current?.disconnect()
  }, [selectors, options, activeId])

  return { activeId, updateActiveId: setActiveId }
}
