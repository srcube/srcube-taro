import type { CalendarDate } from '@internationalized/date'
import type { ListboxRef } from '@srcube-taro/ui'
import type { UseCalendarMonthProps } from './use'
import { getWeeksInMonth } from '@internationalized/date'
import { Listbox, ListboxItem } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CalendarCell } from '../calendar-cell'
import { CalendarMonthHeader } from '../calendar-month-header'
import { useCalendarMonth } from './use'

export interface CalendarMonthProps extends UseCalendarMonthProps {}

function CalendarMonth(props: CalendarMonthProps) {
  const { firstDayOfWeek } = props

  const {
    state,
    styles,
    slots,
    locale,
    weekDays,
    cellContent,
    months,
    monthIndexMap,
    targetMonthIndex,
    setActiveMonthIndex,
    setTargetMonthIndex,
  } = useCalendarMonth(props)

  const listboxRef = useRef<ListboxRef>(null)

  const weekDaysContent = weekDays.map((d, i) => <View key={i} className={styles.weekday} role="columnheader">{d}</View>)

  const items = useMemo(() => months.flatMap((m, i) => ([
    { key: `${i}-header`, index: i, date: m, type: 'header' as const },
    { key: `${i}-body`, index: i, date: m, type: 'body' as const },
  ])), [months])

  const hasScrolledToInitialDate = useRef(false)

  // Initial scroll to visibleRange.start
  useEffect(() => {
    if (hasScrolledToInitialDate.current)
      return

    const start = state.visibleRange.start
    const key = start.year * 100 + start.month
    const index = monthIndexMap.get(key)
    if (index !== undefined) {
      setTargetMonthIndex(index)
      hasScrolledToInitialDate.current = true
    }
  }, [state.visibleRange.start, monthIndexMap, setTargetMonthIndex])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (targetMonthIndex !== null && targetMonthIndex >= 0) {
      timer = setTimeout(() => {
        listboxRef.current?.virtualizer?.scrollToIndex(targetMonthIndex * 2, { align: 'start' })
      }, 50)
    }
    return () => clearTimeout(timer)
  }, [targetMonthIndex])

  const weeksDaysForMonthContent = useCallback((monthStart: CalendarDate) => {
    const count = getWeeksInMonth(monthStart, locale, firstDayOfWeek)
    const rows = [...Array.from({ length: count }).keys()].map(weekIndex => (
      <View
        key={`${monthStart.year}-${monthStart.month}-w${weekIndex}`}
        id={`calendar-month-week-${monthStart.year}-${monthStart.month}-w${weekIndex}`}
        className={styles.days}
        role="row"
      >
        {state.getDatesInWeek(weekIndex, monthStart).map((date, i) => (
          date ? <CalendarCell key={i} date={date} start={monthStart} content={cellContent} /> : <View key={i} />
        ))}
      </View>
    ))
    return (
      <View className={styles.weeks}>
        {rows}
      </View>
    )
  }, [styles, state, locale, firstDayOfWeek, cellContent])

  const renderMonthHeader = useCallback((m: CalendarDate) => (
    <CalendarMonthHeader monthDate={m} />
  ), [])

  const renderMonthBody = useCallback((m: CalendarDate) => (
    weeksDaysForMonthContent(m)
  ), [weeksDaysForMonthContent])

  const handleActiveStickyChange = useCallback((index: number) => {
    const monthIndex = Math.floor(index / 2)
    state.setFocusedDate(months[monthIndex])
    setActiveMonthIndex(monthIndex)
  }, [state, months, setActiveMonthIndex])

  return (
    <View className={styles.monthContent}>
      <View className={styles.weekdays} role="row">
        {weekDaysContent}
      </View>
      <View className={slots.months()}>
        <Listbox
          ref={listboxRef}
          items={items}
          fastDeceleration
          classNames={{
            wrapper: 'flex-grow min-h-0',
            scrollview: 'block',
            content: 'flex-grow',
            maskTop: 'invisible',
          }}
          stickyIndices={Array.from({ length: months.length }, (_, i) => i * 2)}
          onActiveStickyChange={handleActiveStickyChange}
        >
          {item => (
            <ListboxItem key={item.key}>
              {item.type === 'header' ? renderMonthHeader(item.date) : renderMonthBody(item.date)}
            </ListboxItem>
          )}
        </Listbox>
      </View>
    </View>
  )
}

CalendarMonth.displayName = 'Srcube.CalendarMonth'

export default CalendarMonth
