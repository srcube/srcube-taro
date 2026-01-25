import type { CalendarDate } from '@internationalized/date'
import type { ListboxRef } from '@srcube-taro/listbox'
import type { CalendarProps } from '../_calendar/calendar'
import { getWeeksInMonth, startOfWeek, today } from '@internationalized/date'
import { Box } from '@srcube-taro/box'
import { Listbox, ListboxItem } from '@srcube-taro/listbox'
import { nextTick } from '@tarojs/taro'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { CalendarMonth } from '../calendar-month'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

export interface CalendarContentProps {
  weekdayStyle?: 'narrow' | 'short' | 'long'
  firstDayOfWeek?: CalendarProps['firstDayOfWeek']
}

function ESTIMATE_SIZE(weeks: number) {
  return {
    xs: {
      header: 16,
      body: 8 + weeks * 28,
    },
    sm: {
      header: 24,
      body: 12 + weeks * 36,
    },
    md: {
      header: 32,
      body: 32 + weeks * 45,
    },
    lg: {
      header: 44,
      body: 20 + weeks * 52,
    },
  }
}

function CalendarContent(props: CalendarContentProps) {
  const { weekdayStyle = 'narrow', firstDayOfWeek = 'sun' } = props

  const { state, minValue, maxValue, slots, locale, size, classNames } = useCalendarContext()

  const listboxRef = useRef<ListboxRef>(null)

  const weekdayFormatter = useDateFormatter(locale, { weekday: weekdayStyle, timeZone: state.timeZone })

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(today(state.timeZone), locale, firstDayOfWeek)
    return [...Array.from({ length: 7 }).keys()].map((index) => {
      const date = weekStart.add({ days: index })
      const dateDay = date.toDate(state.timeZone)
      return weekdayFormatter.format(dateDay)
    })
  }, [locale, state.timeZone, weekdayFormatter, firstDayOfWeek])

  const months = useMemo(() => {
    const [start, end] = [minValue, maxValue] as CalendarDate[]
    const records: CalendarDate[] = []

    let cur = start
    while (cur.compare(end) <= 0) {
      records.push(cur)
      cur = cur.add({ months: 1 })
    }
    return records
  }, [minValue, maxValue])

  const items = useMemo(() => months.flatMap((m, i) => ([
    { key: `${i}-header`, index: i, date: m, type: 'header' as const },
    { key: `${i}-body`, index: i, date: m, type: 'body' as const },
  ])), [months])

  const stickyIndices = useMemo(
    () => Array.from({ length: items.length / 2 }).map((_, i) => i * 2),
    [items.length],
  )

  const estimateSize = useCallback((itemIndex: number) => {
    const item = items[itemIndex]
    if (!item)
      return 0

    const weeks = item.type === 'body' ? getWeeksInMonth(item.date, locale, firstDayOfWeek) : 0
    const sizeKey = size as keyof ReturnType<typeof ESTIMATE_SIZE>
    const next = ESTIMATE_SIZE(weeks)[sizeKey]

    return item.type === 'header' ? next.header : next.body
  }, [firstDayOfWeek, items, locale, size])

  const currentDate = state.focusedDate

  const isManualScroll = useRef(false)
  const ignoreNextScroll = useRef(false)
  const hasSyncedInitialPosition = useRef(false)

  const currentMIndex = useMemo(() => {
    if (!minValue)
      return 0

    const diffMonths = (currentDate.year - minValue.year) * 12 + (currentDate.month - minValue.month)
    return Math.min(Math.max(0, diffMonths), Math.max(0, months.length - 1))
  }, [currentDate.month, currentDate.year, minValue, months.length])

  const currentItemIndex = currentMIndex * 2

  const activeStickyIndex = useRef(currentItemIndex)

  // Sync YM picker state postion with calendar content
  useEffect(() => {
    // 1. Initial sync is mandatory
    if (!hasSyncedInitialPosition.current) {
      ignoreNextScroll.current = true
      // Use nextTick to ensure virtualizer is ready
      nextTick(() => {
        listboxRef.current?.virtualizer?.scrollToIndex(currentItemIndex, { align: 'start' })
        hasSyncedInitialPosition.current = true
      })
      return
    }

    // 2. If user is manually scrolling, do not interfere
    if (isManualScroll.current)
      return

    // 3. Check if target index is already visible
    const virtualizer = listboxRef.current?.virtualizer
    if (!virtualizer)
      return

    const visibleItems = virtualizer.getVirtualItems()
    // Check if the month header or body is already visible
    // currentItemIndex is header, currentItemIndex + 1 is body
    const isVisible = visibleItems.some(item => item.index === currentItemIndex || item.index === currentItemIndex + 1)

    if (isVisible) {
      return
    }

    ignoreNextScroll.current = true
    virtualizer.scrollToIndex(currentItemIndex, { align: 'start' })
  }, [currentItemIndex]) // Remove state.focusedDate dependency to avoid jumping on same-month selection

  const handleActiveStickyChange = useDebouncedCallback((index: number) => {
    const date = items[index].date

    const current = state.focusedDate

    if (date.month !== current.month || date.year !== current.year) {
      state.setFocusedDate(date)
    }
    activeStickyIndex.current = index
  }, 200)

  const handleScroll = useCallback(() => {
    if (ignoreNextScroll.current) {
      ignoreNextScroll.current = false
      return
    }
    if (!hasSyncedInitialPosition.current) {
      return
    }
    isManualScroll.current = true
  }, [])

  const handleScrollEnd = useCallback(() => {
    isManualScroll.current = false
  }, [])

  return (
    <Box className={slots.content()}>
      <Box className={slots.weekdays({ className: [classNames?.weekday] })}>
        {weekDays.map(
          (d, i) => <Box key={i} className={slots.weekday({ className: [classNames?.weekday] })} role="columnheader">{d}</Box>,
        )}
      </Box>
      <Listbox
        ref={listboxRef}
        items={items}
        estimateSize={estimateSize}
        stickyIndices={stickyIndices}
        fastDeceleration
        onActiveStickyChange={handleActiveStickyChange}
        classNames={{
          wrapper: 'flex-grow min-h-0',
          content: '',
          maskTop: 'invisible',
        }}
        className={slots.monthContent({ className: [classNames?.monthContent] })}
        onScroll={handleScroll}
        onScrollEnd={handleScrollEnd}
      >
        {item => (
          <ListboxItem key={item.key} role="rowgroup">
            <CalendarMonth data={item} />
          </ListboxItem>
        )}
      </Listbox>
    </Box>
  )
}

CalendarContent.displayName = 'CalendarContent'

export default CalendarContent
