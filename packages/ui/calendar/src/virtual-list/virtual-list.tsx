import type { TaroElement } from '@tarojs/runtime'
import { ScrollView, View } from '@tarojs/components'
import { $ } from '@tarojs/extend'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export interface VirtualListProps<T> {
  data: T[]
  defaultRowHeight?: number
  overscan?: number
  windowCount?: number
  itemContent: (item: T, index: number) => JSX.Element
  initialIndex?: number
  scrollToIndex?: number
  onScrollEnd?: (payload: { scrollTop: number, startIndex: number, endIndex: number }) => void
}

const WINDOW_COUNT = 6

function VirtualList<T>(props: VirtualListProps<T>) {
  const {
    data,
    defaultRowHeight,
    itemContent,
    windowCount,
    overscan = 6,
    initialIndex,
    scrollToIndex,
    onScrollEnd,
  } = props

  const containerRef = useRef<TaroElement>(null)

  const [forcedTop, setForcedTop] = useState<number | null>(null)
  const [scrollTop, setScrollTop] = useState<number>(0)

  const latestScrollTopRef = useRef<number>(0)
  const rafIdRef = useRef<number | null>(null)
  const lastScrollTsRef = useRef<number>(0)
  const pendingHeightsRef = useRef<Map<number, number>>(new Map())
  const measureTimerRef = useRef<any>(null)
  const scrollEndTimerRef = useRef<any>(null)
  const isUserScrollingRef = useRef<boolean>(false)
  const ignoreScrollToUntilRef = useRef<number>(0)
  const itemsRefMap = useRef<Map<number, TaroElement>>(new Map())
  const idBaseRef = useRef(`virtual-list-${Math.random().toString(36).slice(2, 10)}`)

  const [measuredHeights, setMeasuredHeights] = useState<number[]>([])

  useLayoutEffect(() => {
    setMeasuredHeights((prev) => {
      const next = prev.slice()
      if (next.length !== data.length) {
        next.length = data.length
        for (let i = 0; i < data.length; i++) {
          if (typeof next[i] !== 'number') {
            next[i] = 0
          }
        }
      }
      return next
    })
  }, [data.length])

  // Internal default row height for placeholder (only used when not yet measured)
  const DEFAULT_ROW_HEIGHT = defaultRowHeight ?? 250

  function getItemRef(index: number, node: TaroElement | null) {
    if (node)
      itemsRefMap.current.set(index, node)
    else
      itemsRefMap.current.delete(index)
  }

  const heights = useMemo(
    () => data.map((_, i) => (measuredHeights[i] && measuredHeights[i] > 0) ? measuredHeights[i] : DEFAULT_ROW_HEIGHT),
    [DEFAULT_ROW_HEIGHT, data, measuredHeights],
  )

  const offsets = useMemo(() => {
    const acc: number[] = []
    let sum = 0
    for (let i = 0; i < heights.length; i++) {
      acc.push(sum)
      sum += heights[i]
    }
    return acc
  }, [heights])
  const totalHeight = useMemo(() => heights.reduce((s, h) => s + h, 0), [heights])

  const findStartIndex = useCallback((top: number) => {
    let lo = 0
    let hi = offsets.length - 1
    let ans = 0
    while (lo <= hi) {
      const mid = (lo + hi) >> 1
      if (offsets[mid] <= top) {
        ans = mid
        lo = mid + 1
      }
      else {
        hi = mid - 1
      }
    }
    return ans
  }, [offsets])

  const startIndex = useMemo(() => {
    return Math.max(0, findStartIndex(scrollTop))
  }, [scrollTop, findStartIndex])
  const endIndex = useMemo(() => {
    const wc = windowCount ?? WINDOW_COUNT
    return Math.min(data.length - 1, startIndex + wc - 1)
  }, [data.length, startIndex, windowCount])

  const commitPendingHeights = useCallback(() => {
    // Apply any buffered height measurements into measuredHeights state in one batch.
    if (pendingHeightsRef.current.size === 0) {
      return
    }
    setMeasuredHeights((prev) => {
      const next = prev.slice()
      let changed = false
      pendingHeightsRef.current.forEach((h, idx) => {
        if (typeof h === 'number' && h > 0 && next[idx] !== h) {
          next[idx] = h
          changed = true
        }
      })
      pendingHeightsRef.current.clear()
      return changed ? next : prev
    })
  }, [])

  const winStart = Math.max(0, startIndex - overscan)
  const winEnd = Math.min(data.length - 1, endIndex + overscan)

  const topSpacer = offsets[winStart] ?? 0
  const visibleItems = data.slice(winStart, winEnd + 1)
  const visibleHeight = visibleItems.reduce((s, _it, i) => s + heights[winStart + i], 0)
  const bottomSpacer = totalHeight - topSpacer - visibleHeight

  const measureVisibleHeights = useCallback(async () => {
    // Measure heights for items in the overscan window.
    // Results are buffered into pendingHeightsRef and committed in a single state update.
    try {
      const promises: Promise<number | null>[] = []
      for (let i = winStart; i <= winEnd; i++) {
        const node = itemsRefMap.current.get(i)
        if (node) {
          const el = $(`#${idBaseRef.current}-vi-${i}`)
          if (el) {
            promises.push((el.height() as unknown as Promise<number>).then(h => typeof h === 'number' && h > 0 ? h : null))
          }
        }
      }
      const results = await Promise.all(promises)
      let idx = 0
      for (let i = winStart; i <= winEnd; i++) {
        const h = results[idx++] ?? null
        if (h && h > 0) {
          pendingHeightsRef.current.set(i, h)
        }
      }
      commitPendingHeights()
    }
    catch {
    }
  }, [winStart, winEnd, commitPendingHeights])

  const scheduleUpdate = useCallback((top: number) => {
    // Record the last scroll time and value.
    lastScrollTsRef.current = Date.now()
    latestScrollTopRef.current = top
    isUserScrollingRef.current = true
    // Defer state updates to the next animation frame to reduce render pressure during fast scrolls.
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        setScrollTop(latestScrollTopRef.current)
      })
    }
    // Debounce height measurements until scrolling has been idle for ~120ms.
    if (measureTimerRef.current) {
      clearTimeout(measureTimerRef.current)
    }
    measureTimerRef.current = setTimeout(() => {
      measureTimerRef.current = null
      measureVisibleHeights()
    }, 120)
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current)
    }
    scrollEndTimerRef.current = setTimeout(() => {
      const si = Math.max(0, findStartIndex(latestScrollTopRef.current))
      const wc = windowCount ?? WINDOW_COUNT
      const ei = Math.min(data.length - 1, si + wc - 1)

      onScrollEnd?.({ scrollTop: latestScrollTopRef.current, startIndex: si, endIndex: ei })
      isUserScrollingRef.current = false
      ignoreScrollToUntilRef.current = Date.now() + 200
      setForcedTop(null)
    }, 120)
  }, [measureVisibleHeights, findStartIndex, windowCount, data.length, onScrollEnd])

  useLayoutEffect(() => {
    if (typeof initialIndex === 'number' && initialIndex >= 0 && initialIndex < data.length) {
      const top = offsets[initialIndex] ?? 0
      setForcedTop(top)
      setScrollTop(top)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex, data.length])

  useLayoutEffect(() => {
    if (typeof scrollToIndex === 'number' && scrollToIndex >= 0 && scrollToIndex < data.length) {
      if (Date.now() < ignoreScrollToUntilRef.current)
        return
      const top = offsets[scrollToIndex] ?? 0
      const currentTop = latestScrollTopRef.current
      // Ignore while user is actively scrolling
      if (isUserScrollingRef.current)
        return
      // If already near desired position, skip
      if (Math.abs(currentTop - top) < 1)
        return
      setForcedTop(top)
      setScrollTop(top)
      scheduleUpdate(top)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToIndex, data.length, offsets])

  useEffect(() => {
    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (measureTimerRef.current) {
        clearTimeout(measureTimerRef.current)
      }
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current)
      }
    }
  }, [])

  return (
    <ScrollView
      ref={containerRef}
      scrollY
      enhanced
      fastDeceleration
      style={{ height: '100%', width: '100%', position: 'relative' }}
      scrollTop={forcedTop ?? undefined}
      onScroll={e => scheduleUpdate(e.detail.scrollTop ?? 0)}
    >
      <View style={{ height: `${topSpacer}px` }} />
      {visibleItems.map((it, i) => (
        <View
          id={`${idBaseRef.current}-vi-${winStart + i}`}
          key={`${idBaseRef.current}-vi-${winStart + i}`}
          ref={node => getItemRef(winStart + i, node as TaroElement)}
        >
          {itemContent(it, winStart + i)}
        </View>
      ))}
      <View style={{ height: `${bottomSpacer}px` }} />
    </ScrollView>
  )
}

VirtualList.displayName = 'Srcube.VirtualList'

export default VirtualList
