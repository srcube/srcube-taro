import type { CalendarDate } from '@internationalized/date'
import { useMemo } from 'react'
import { useCalendarContext } from '../context'
import '@formatjs/intl-datetimeformat/polyfill'

export interface UseCalendarMonthHeaderProps {
  monthDate?: CalendarDate
}

export function useCalendarMonthHeader(props: UseCalendarMonthHeaderProps = {}) {
  const { state, locale, styles } = useCalendarContext()
  const { monthDate } = props

  const formatter = {
    year: new Intl.DateTimeFormat(locale, { year: 'numeric' }),
    month: new Intl.DateTimeFormat(locale, { month: 'long' }),
  }

  const displayDate = monthDate ?? state.visibleRange.start

  const content = {
    year: formatter.year.format(displayDate.toDate(state.timeZone)),
    month: formatter.month.format(displayDate.toDate(state.timeZone)),
  }

  return {
    styles,
    content,
  }
}
