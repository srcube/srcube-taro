import type { CalendarDate } from '@internationalized/date'
import type { BaseEventOrigFunction, ScrollViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { getWeeksInMonth } from '@internationalized/date'
import { $ } from '@tarojs/extend'
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useCalendarContext } from '../context'

export interface UseCalendarMonthListProps {
  data: CalendarDate[]
  itemContent: (item: CalendarDate, index: number) => JSX.Element
  scrollToIndex?: number
}

export function useCalendarMonthList(props: UseCalendarMonthListProps) {
  const { data, itemContent, scrollToIndex } = props

  const { state, locale, firstDayOfWeek, isYMPickerExpanded } = useCalendarContext()

  const [measured, setMeasured] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [rowHeight, setRowHeight] = useState(0)
  const [startIndexState, setStartIndexState] = useState(0)
  const [scrollIntoViewId, setScrollIntoViewId] = useState<string | undefined>(undefined)

  const idBaseRef = useRef(`cml-${Math.random().toString(36).slice(2, 8)}`)
  const containerRef = useRef<TaroElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimerRef = useRef<any>(null)
  const lastScrollEndAtRef = useRef(0)
  const lastChangeByScrollRef = useRef(false)
  const resetScrollChangeTimerRef = useRef<any>(null)

  const measureItemIndex = useMemo(() => {
    if (typeof scrollToIndex === 'number' && scrollToIndex >= 0 && scrollToIndex < data.length)
      return scrollToIndex
    return 0
  }, [scrollToIndex, data.length])

  useLayoutEffect(() => {
    if (measured)
      return

    const measure = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        const date = data[measureItemIndex]
        const monthHeaderEl = $(`#calendar-month-header-${date.year}-${date.month}`)
        const weekRowEl = $(`#calendar-month-week-${date.year}-${date.month}-w0`)
        if (!monthHeaderEl || !weekRowEl)
          return
        const [monthHeaderH, weekRowH] = await Promise.all([
          monthHeaderEl.height(),
          weekRowEl.height(),
        ])
        if (!monthHeaderH || !weekRowH)
          return
        setHeaderHeight(monthHeaderH)
        setRowHeight(weekRowH)
        setMeasured(true)
      }
      catch {}
    }

    measure()
  }, [measured, data, measureItemIndex])

  const { offsets, totalHeight } = useMemo(() => {
    if (!measured)
      return { offsets: [], totalHeight: 0 }
    const os: number[] = []
    let h = 0
    for (const date of data) {
      os.push(h)
      const weeks = getWeeksInMonth(date, locale, firstDayOfWeek)
      h += headerHeight + weeks * rowHeight
    }
    return { offsets: os, totalHeight: h }
  }, [measured, data, locale, firstDayOfWeek, headerHeight, rowHeight])

  const findStartIndex = useCallback((top: number) => {
    let lo = 0
    let hi = offsets.length - 1
    while (lo <= hi) {
      const mid = (lo + hi) >> 1
      if (offsets[mid] <= top) {
        if (mid === offsets.length - 1 || offsets[mid + 1] > top)
          return mid
        lo = mid + 1
      }
      else {
        hi = mid - 1
      }
    }
    return 0
  }, [offsets])

  const startIndex = useMemo(() => {
    if (!measured)
      return 0
    return startIndexState
  }, [startIndexState, measured])

  const windowCount = 4
  const overscan = 2
  const renderStartIndex = Math.max(0, startIndex - overscan)
  const renderEndIndex = Math.min(data.length - 1, startIndex + windowCount + overscan)

  const visibleItems = useMemo(() => {
    if (!measured)
      return [] as Array<{ item: CalendarDate, index: number }>
    return data.slice(renderStartIndex, renderEndIndex + 1).map((item, i) => ({
      item,
      index: renderStartIndex + i,
    }))
  }, [data, renderStartIndex, renderEndIndex, measured])

  const handleScroll = useCallback<BaseEventOrigFunction<ScrollViewProps.onScrollDetail>>((e) => {
    const top = e.detail.scrollTop
    isScrollingRef.current = true
    requestAnimationFrame(() => {
      setStartIndexState(findStartIndex(top))
    })
    if (scrollTimerRef.current)
      clearTimeout(scrollTimerRef.current)

    // Simulate scroll end handler
    scrollTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false
      lastScrollEndAtRef.current = Date.now()
      const si = findStartIndex(top)
      if (!isYMPickerExpanded) {
        const target = data[si]
        if (target) {
          const fd = state.focusedDate
          if (fd.year !== target.year || fd.month !== target.month) {
            state.setFocusedDate(target)
            lastChangeByScrollRef.current = true
            if (resetScrollChangeTimerRef.current)
              clearTimeout(resetScrollChangeTimerRef.current)
            // allow sufficient time on lower-end devices
            resetScrollChangeTimerRef.current = setTimeout(() => {
              lastChangeByScrollRef.current = false
            }, 1000)
          }
        }
      }
    }, 150)
  }, [findStartIndex, isYMPickerExpanded, state, data])

  useLayoutEffect(() => {
    if (!measured)
      return
    if (typeof scrollToIndex !== 'number' || scrollToIndex < 0 || offsets[scrollToIndex] === undefined)
      return
    if (lastChangeByScrollRef.current)
      return
    setStartIndexState(scrollToIndex)
    const anchor = `${idBaseRef.current}-${scrollToIndex}`
    setScrollIntoViewId(anchor)
    setTimeout(() => setScrollIntoViewId(undefined), 150)
  }, [measured, offsets, scrollToIndex])

  const topSpacer = offsets[renderStartIndex] || 0
  const bottomSpacer = totalHeight - topSpacer - visibleItems.reduce((acc, { item }) => {
    const weeks = getWeeksInMonth(item, locale, firstDayOfWeek)
    return acc + headerHeight + weeks * rowHeight
  }, 0)

  return {
    itemContent,
    measured,
    measureItemIndex,
    containerRef,
    idBase: idBaseRef.current,
    scrollIntoViewId,
    visibleItems,
    topSpacer,
    bottomSpacer,
    handleScroll,
  }
}

export type UseCalendarMonthListReturn = ReturnType<typeof useCalendarMonthList>
