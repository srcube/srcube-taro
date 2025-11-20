import type { CalendarDate } from '@internationalized/date'
import type { CalendarPropsBase } from '@react-types/calendar'
import type { CalendarCellProps } from '../calendar-cell'
import { getWeeksInMonth, startOfWeek, today } from '@internationalized/date'
import { useMemo } from 'react'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

export interface UseCalendarMonthProps extends CalendarPropsBase {
  /**
   * Start date of the month to render.
   */
  startDate?: CalendarDate
  /**
   * End date of the month to render.
   */
  endDate?: CalendarDate
  /**
   * The style of weekday names to display in the calendar grid header,
   * e.g. single letter, abbreviation, or full day name.
   * @default "narrow"
   */
  weekdayStyle?: 'narrow' | 'short' | 'long'
  /**
   * Custom content to render in each calendar cell.
   */
  cellContent?: CalendarCellProps['content']
}

export function useCalendarMonth(props: UseCalendarMonthProps) {
  const { startDate, weekdayStyle = 'narrow', firstDayOfWeek, cellContent } = props

  const { state, locale, styles, isRange, isYMPickerExpanded } = useCalendarContext()

  const dayFormatter = useDateFormatter(locale, { weekday: weekdayStyle, timeZone: state.timeZone })

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(today(state.timeZone), locale, firstDayOfWeek)
    return [...Array.from({ length: 7 }).keys()].map((index) => {
      const date = weekStart.add({ days: index })
      const dateDay = date.toDate(state.timeZone)
      return dayFormatter.format(dateDay)
    })
  }, [locale, state.timeZone, dayFormatter, firstDayOfWeek])

  const weeksInMonth = getWeeksInMonth(startDate ?? today(state.timeZone), locale, firstDayOfWeek)

  const weeksDays = [...Array.from({ length: weeksInMonth }).keys()].map(weekIndex => state.getDatesInWeek(weekIndex, startDate).map(date => date ?? null))

  return {
    state,
    styles,
    startDate,
    locale,
    isRange,
    isYMPickerExpanded,
    weekDays,
    weeksInMonth,
    weeksDays,
    cellContent,
  }
}

export type UseCalendarMonthReturn = ReturnType<typeof useCalendarMonth>
