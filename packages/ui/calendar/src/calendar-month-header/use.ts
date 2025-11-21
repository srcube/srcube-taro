import type { CalendarDate } from '@internationalized/date'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

export interface UseCalendarMonthHeaderProps {
  monthDate?: CalendarDate
}

export function useCalendarMonthHeader(props: UseCalendarMonthHeaderProps = {}) {
  const { state, locale, styles } = useCalendarContext()
  const { monthDate } = props

  const yDateFormatter = useDateFormatter(locale, {
    year: 'numeric',
    timeZone: state.timeZone,
  })

  const mDateFormatter = useDateFormatter(locale, {
    month: 'long',
    era: monthDate?.calendar.identifier === 'gregory' && monthDate.era === 'BC' ? 'short' : void 0,
    calendar: monthDate?.calendar.identifier,
    timeZone: state.timeZone,
  })

  const displayDate = monthDate ?? state.visibleRange.start

  const content = {
    year: yDateFormatter.format(displayDate.toDate(state.timeZone)),
    month: mDateFormatter.format(displayDate.toDate(state.timeZone)),
  }

  return {
    styles,
    content,
  }
}
