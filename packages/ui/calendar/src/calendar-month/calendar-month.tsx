import type { CalendarDate } from '@internationalized/date'
import type { UseCalendarMonthProps } from './use'
import { getWeeksInMonth } from '@internationalized/date'
import { View } from '@tarojs/components'
import { Fragment, useCallback, useMemo } from 'react'
import { CalendarCell } from '../calendar-cell'
import { CalendarMonthHeader } from '../calendar-month-header'
import { VirtualList } from '../virtual-list'
import { useCalendarMonth } from './use'

export interface CalendarMonthProps extends UseCalendarMonthProps {}

function CalendarMonth(props: CalendarMonthProps) {
  const { firstDayOfWeek } = props

  const {
    state,
    styles,
    locale,
    isRange,
    weekDays,
    startDate,
    cellContent,
  } = useCalendarMonth(props)

  const weekDaysContent = weekDays.map((d, i) => <View key={i} className={styles.weekday} role="columnheader">{d}</View>)

  const monthsStartDates: CalendarDate[] = useMemo(() => {
    const { minValue, maxValue } = state

    const months: CalendarDate[] = []

    if (isRange && minValue && maxValue) {
      let current = (startDate ?? minValue) as CalendarDate
      while (current.compare(maxValue as CalendarDate) <= 0) {
        months.push(current)
        current = current.add({ months: 1 })
      }
    }
    else {
      months.push((startDate ?? state.visibleRange.start) as CalendarDate)
    }

    return months
  }, [state, isRange, startDate])

  const listStart = monthsStartDates[0]
  const currentVisibleMonth = state.visibleRange.start
  const activeIndex = useMemo(() => {
    if (!isRange || !listStart || !currentVisibleMonth)
      return 0
    const diff = (currentVisibleMonth.year - listStart.year) * 12 + (currentVisibleMonth.month - listStart.month)
    return Math.max(0, Math.min(monthsStartDates.length - 1, diff))
  }, [isRange, listStart, currentVisibleMonth, monthsStartDates.length])

  const weeksDaysForMonthContent = useCallback((monthStart: CalendarDate) => {
    const count = getWeeksInMonth(monthStart, locale, firstDayOfWeek)
    const rows = [...Array.from({ length: count }).keys()].map(weekIndex => (
      <View key={`${monthStart.year}-${monthStart.month}-w${weekIndex}`} className={styles.days} role="row">
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

  const monthContent = useCallback((m: CalendarDate) => (
    <Fragment>
      {isRange && <CalendarMonthHeader monthDate={m} />}
      {weeksDaysForMonthContent(m)}
    </Fragment>
  ), [isRange, weeksDaysForMonthContent])

  return (
    <View className={styles.monthContent}>
      <View className={styles.weekdays} role="row">
        {weekDaysContent}
      </View>
      <View className={styles.months}>
        <VirtualList
          data={monthsStartDates}
          itemContent={m => monthContent(m)}
          scrollToIndex={activeIndex}
          onScrollEnd={({ startIndex }) => {
            const target = monthsStartDates[startIndex]
            if (!target)
              return
            const fd = state.focusedDate
            if (fd.year !== target.year || fd.month !== target.month) {
              state.setFocusedDate(target)
            }
          }}
        />
      </View>
    </View>
  )
}

CalendarMonth.displayName = 'Srcube.CalendarMonth'

export default CalendarMonth
