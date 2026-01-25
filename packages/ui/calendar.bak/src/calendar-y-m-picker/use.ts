import type { DateValue } from '@internationalized/date'
import type { ITouchEvent, ScrollViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { startOfYear } from '@internationalized/date'
import { $ } from '@tarojs/extend'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

type ItemsRefMap = Map<number, TaroElement>

export function useCalendarYMPicker() {
  const {
    state,
    locale,
    slots,
    styles,
    size,
    isYMPickerExpanded,
    classNames,
    months: allMonths,
    monthIndexMap,
    activeMonthIndex,
    targetMonthIndex,
    setTargetMonthIndex,
  } = useCalendarContext()

  const effectiveIndex = targetMonthIndex ?? activeMonthIndex
  const currentMonth = allMonths[effectiveIndex] || state.visibleRange.start

  const yDateFormatter = useDateFormatter(locale, {
    year: 'numeric',
    timeZone: state.timeZone,
  })

  const mDateFormatter = useDateFormatter(locale, {
    month: 'long',
    era: currentMonth.calendar.identifier === 'gregory' && currentMonth.era === 'BC' ? 'short' : void 0,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
  })

  // generate per-instance unique id base (ensure starts with `calendar-`)
  const idBaseRef = useRef(`calendar-${Math.random().toString(36).slice(2, 10)}`)

  const ids = useMemo(() => ({
    indicator: `${idBaseRef.current}-picker-indicator`,
    years: `${idBaseRef.current}-picker-years`,
    months: `${idBaseRef.current}-picker-months`,
  }), [])

  // measure indicator -> item height, and control scrollTop for snapping
  const [itemHeight, setItemHeight] = useState(0)

  const [yearsScrollTop, setYearsScrollTop] = useState(0)
  const [monthsScrollTop, setMonthsScrollTop] = useState(0)

  const yearsScrollTopRef = useRef(0)
  const monthsScrollTopRef = useRef(0)

  const yearsItemsRef = useRef<ItemsRefMap>()
  const monthsItemsRef = useRef<ItemsRefMap>()

  const timersRef = useRef<{ years: any, months: any }>({ years: null, months: null })
  const isProgrammaticRef = useRef<{ years: boolean, months: boolean }>({ years: false, months: false })
  const lastSnapIndexRef = useRef<{ years: number, months: number }>({ years: -1, months: -1 })
  // spacer height equals half of list height (bounce at edges)
  const indicatorOffsetsRef = useRef<{ years: number, months: number }>({ years: 0, months: 0 })

  const years = useMemo(() => getYearRange(state.minValue, state.maxValue).map(d => ({
    label: yDateFormatter.format(d.toDate(state.timeZone)),
    value: d.year,
  })), [state.minValue, state.maxValue, yDateFormatter, state.timeZone])

  const months = useMemo(() => getMonthsInYear(currentMonth).map(d => ({
    label: mDateFormatter.format(d.toDate(state.timeZone)),
    value: d.month,
  })), [currentMonth, mDateFormatter, state.timeZone])

  function getItemsRefMap(itemsRef: React.MutableRefObject<ItemsRefMap | undefined>) {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map()
    }

    return itemsRef.current
  }

  function getItemRef(type: 'years' | 'months', value: number, node: TaroElement | null) {
    const itemsRef = type === 'years' ? yearsItemsRef : monthsItemsRef
    const itemsMap = getItemsRefMap(itemsRef)

    if (node) {
      itemsMap.set(value, node)
    }
    else {
      itemsMap.delete(value)
    }
  }

  const scrollTo = useCallback((type: 'years' | 'months', value: number) => {
    const itemsRef = type === 'years' ? yearsItemsRef : monthsItemsRef
    const itemsMap = getItemsRefMap(itemsRef)
    const item = itemsMap.get(value)

    if (!item)
      return

    const index = Number(item.dataset.index)
    const scrollTop = index * itemHeight

    const setter = type === 'years' ? setYearsScrollTop : setMonthsScrollTop
    isProgrammaticRef.current[type] = true
    setter(scrollTop)
    if (type === 'years')
      yearsScrollTopRef.current = scrollTop
    else
      monthsScrollTopRef.current = scrollTop
    setTimeout(() => {
      isProgrammaticRef.current[type] = false
    }, 100)
  }, [itemHeight])

  // init indicator height and scrollTop offset
  useEffect(() => {
    (async () => {
      try {
        const [ind, yCol, mCol] = [
          $(`#${ids.indicator}`),
          $(`#${ids.years}`),
          $(`#${ids.months}`),
        ]

        if (!ind || !yCol || !mCol)
          return

        const [indH, yH, mH] = await Promise.all([
          ind.height(),
          yCol.height(),
          mCol.height(),
        ])

        const rowH = indH && indH > 0 ? Math.floor(indH) : 32
        setItemHeight(rowH)

        // bounce preference: spacer = half of list height subtract indicator
        indicatorOffsetsRef.current.years = Math.floor((yH - rowH) / 2)
        indicatorOffsetsRef.current.months = Math.floor((mH - rowH) / 2)
      }
      catch (e) {
        throw new Error(`Failed to measure indicator height: ${e}`)
      }
    })()
  }, [ids, isYMPickerExpanded])

  useEffect(() => {
    if (!isYMPickerExpanded)
      return

    scrollTo('years', currentMonth.year)
    scrollTo('months', currentMonth.month)
  }, [isYMPickerExpanded, currentMonth, scrollTo])

  const scheduleSnap = useCallback((type: 'years' | 'months') => {
    const lastTop = type === 'years' ? yearsScrollTopRef.current : monthsScrollTopRef.current

    let idx = Math.round(lastTop / itemHeight)

    if (!Number.isFinite(idx))
      idx = 0
    if (Object.is(idx, -0))
      idx = 0

    const len = type === 'years' ? years.length : months.length

    if (idx < 0)
      idx = 0
    if (idx > len - 1)
      idx = len - 1

    if (lastSnapIndexRef.current[type] === idx)
      return
    lastSnapIndexRef.current[type] = idx

    const value = type === 'years' ? years[idx]?.value : months[idx]?.value

    if (value == null)
      return

    if (timersRef.current[type])
      clearTimeout(timersRef.current[type])

    timersRef.current[type] = setTimeout(() => {
      scrollTo(type, value)
      const yv = type === 'years' ? value : currentMonth.year
      const mv = type === 'months' ? value : currentMonth.month

      // Only update if the value actually changed to avoid unnecessary re-renders/jumps
      if (yv !== currentMonth.year || mv !== currentMonth.month) {
        const key = yv * 100 + mv
        const newIndex = monthIndexMap.get(key)

        if (newIndex !== undefined) {
          setTargetMonthIndex(newIndex)
        }

        const date = state.focusedDate.set({ year: yv, month: mv })
        state.setFocusedDate(date)
      }
    }, 200)
  }, [itemHeight, scrollTo, state, currentMonth, years, months, monthIndexMap, setTargetMonthIndex])

  const onYearsScroll = useCallback<NonNullable<ScrollViewProps['onScroll']>>((e) => {
    const top = e?.detail?.scrollTop || 0

    yearsScrollTopRef.current = top
    if (!isProgrammaticRef.current.years)
      scheduleSnap('years')
  }, [scheduleSnap])

  const onMonthsScroll = useCallback<NonNullable<ScrollViewProps['onScroll']>>((e) => {
    const top = e?.detail?.scrollTop || 0

    monthsScrollTopRef.current = top
    if (!isProgrammaticRef.current.months)
      scheduleSnap('months')
  }, [scheduleSnap])

  const onPickerItemTap = useCallback((type: 'years' | 'months', e: ITouchEvent) => {
    const index = Number(e.target.dataset.index)
    const scrollTop = index * itemHeight

    const setter = type === 'years' ? setYearsScrollTop : setMonthsScrollTop
    setter(scrollTop)
  }, [itemHeight])

  return {
    ids,
    indicatorOffsetsRef,
    itemHeight,
    yearsScrollTop,
    monthsScrollTop,
    currentMonth,
    years,
    months,
    size,
    slots,
    styles,
    isYMPickerExpanded,
    classNames,
    getItemRef,
    onYearsScroll,
    onMonthsScroll,
    onPickerItemTap,
  }
}

function getYearRange(start?: DateValue | null, end?: DateValue | null) {
  const years: DateValue[] = []

  if (!start || !end) {
    return years
  }

  let current = startOfYear(start)

  while (current.compare(end) <= 0) {
    years.push(current)
    current = startOfYear(current.add({ years: 1 }))
  }
  return years
}

export function getMonthsInYear(year: DateValue) {
  const firstMonth = startOfYear(year)
  const months = [firstMonth]

  while (months.length < 12) {
    const prevMonth = months[months.length - 1]

    months.push(prevMonth.add({ months: 1 }))
  }

  return months
}
