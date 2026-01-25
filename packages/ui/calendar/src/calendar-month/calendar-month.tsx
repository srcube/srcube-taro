import type { CalendarDate, DateValue } from '@internationalized/date'
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { CalendarCellProps } from '../calendar-cell/calendar-cell'
import { getWeeksInMonth, isToday as isDateToday, isEqualDay, isSameDay, isSameMonth, startOfWeek } from '@internationalized/date'
import { Box } from '@srcube-taro/box'
import { useCallback, useMemo, useRef } from 'react'
import { CalendarCell } from '../calendar-cell'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

export interface CalendarMonthProps {
  data: {
    key: string
    index: number
    date: CalendarDate
    type: 'header' | 'body'
  }
}

function resolveCellState(
  date: CalendarDate,
  state: CalendarState | RangeCalendarState,
  effectiveRange: { start: DateValue, end: DateValue } | null | undefined,
  selectableRange: DateValue[] | undefined,
  selectedDate: DateValue | null | undefined,
) {
  const isSelectionStart = effectiveRange?.start ? isSameDay(date, effectiveRange.start) : false
  const isSelectionEnd = effectiveRange?.end ? isSameDay(date, effectiveRange.end) : false
  const isRangeSelection = effectiveRange?.start && effectiveRange?.end
    ? (date.compare(effectiveRange.start) > 0 && date.compare(effectiveRange.end) < 0)
    : false

  const isOutOfRange = selectableRange
    ? (date.compare(selectableRange[0]) < 0 || date.compare(selectableRange[1]) > 0)
    : false

  const isUnavailable = isOutOfRange || (state.isCellUnavailable ? state.isCellUnavailable(date) : false)
  const isDisabled = state.isDisabled || isUnavailable
  const isToday = isDateToday(date, state.timeZone)

  const isRangeMode = 'highlightedRange' in state
  const isSelected = isRangeMode
    ? (isSelectionStart || isSelectionEnd)
    : !!selectedDate && isSameDay(date, selectedDate) && !isDisabled

  return {
    isSelected,
    isDisabled,
    isUnavailable,
    isRangeSelection,
    isSelectionStart,
    isSelectionEnd,
    isToday,
  }
}

function CalendarMonth(props: CalendarMonthProps) {
  const { data } = props
  const { state, slots, classNames, locale, firstDayOfWeek } = useCalendarContext()

  // Use a ref to hold the latest state, allowing CalendarCell to avoid re-rendering
  // when state changes but the derived props for that cell remain the same.
  const stateRef = useRef(state)
  stateRef.current = state

  const monthFormatter = useDateFormatter(locale, { month: 'long', timeZone: state.timeZone })

  // Memoize grid structure to avoid recalculating dates on every render
  // This ensures date objects are stable references across selection changes
  const grid = useMemo(() => {
    if (data.type === 'header')
      return []
    const date = data.date as CalendarDate
    const weeksInMonth = getWeeksInMonth(date, locale, firstDayOfWeek)
    const weekStart = startOfWeek(date.set({ day: 1 }), locale, firstDayOfWeek)

    return Array.from({ length: weeksInMonth }, (_, weekIndex) => {
      const startDate = weekStart.add({ weeks: weekIndex })
      return Array.from({ length: 7 }, (_, dayIndex) => startDate.add({ days: dayIndex }))
    })
  }, [data.date, locale, firstDayOfWeek, data.type])

  // Pre-calculate range info once per render
  const highlightedRange = 'highlightedRange' in state ? state.highlightedRange : null

  const isRange = highlightedRange !== null
  const rangeState = isRange ? state as RangeCalendarState : null

  const selectableRange = useMemo(() =>
    state.minValue && state.maxValue ? [state.minValue, state.maxValue] : undefined, [state.minValue, state.maxValue])

  const getCellProps = useCallback((date: CalendarDate): CalendarCellProps => {
    const isToday = isDateToday(date, state.timeZone)


    const committedRange = rangeState?.value ?? null
    const effectiveRange = highlightedRange ?? committedRange

    const isSelectionStart = effectiveRange?.start ? isSameDay(effectiveRange.start, date) : false
    const isSelectionEnd = effectiveRange?.end ? isSameDay(effectiveRange.end, date) : false

    const isSelected = isRange ? (isSelectionStart || isSelectionEnd) : state.isSelected(date)

    const isRangeSelection = effectiveRange?.start && effectiveRange?.end
    ? (date.compare(effectiveRange.start) > 0 && date.compare(effectiveRange.end) < 0)
    : false
    // const isUnavailable = (isDateUnavailable?.(date) ?? false)
    //   || isOutOfRange
    //   || (state.isCellUnavailable ? state.isCellUnavailable(date) : false)

    // const isDisabled = state.isDisabled || isUnavailable

    return {
      stateRef,
      data: date,
      slots,
      classNames,
      isRange,
      isToday,
      isSelected,
      isRangeSelection,
      isSelectionStart,
      isSelectionEnd,
      isDisabled: false,
      isUnavailable: false,
      // ...resolveCellState(date, state, highlightedRange, selectableRange, selectedDate),
    }
  }, [state, highlightedRange, stateRef, slots, classNames, isRange])

  if (data.type === 'header') {
    const month = monthFormatter.format(data.date.toDate(state.timeZone))

    return (
      <Box className={slots.monthHeader({ className: [classNames?.monthHeader] })}>
        {month}
      </Box>
    )
  }

  const weekClassName = slots.week({ className: [classNames?.week] })
  const weeksClassName = slots.weeks({ className: [classNames?.week] })

  return (
    <Box className={weeksClassName}>
      {grid.map((weekDates, weekIndex) => (
        <Box key={weekIndex} className={weekClassName} role="row">
          {weekDates.map((date, dayIndex) => {
            if (!date || !isSameMonth(date, data.date))
              return <Box key={dayIndex} />

            return (
              <CalendarCell
                key={`${date.year}-${date.month}-${date.day}`}
                {...getCellProps(date)}
              />
            )
          })}
        </Box>
      ))}
    </Box>
  )
}

CalendarMonth.displayName = 'CalendarMonth'

export default CalendarMonth
