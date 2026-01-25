import type { TaroElement } from '@tarojs/runtime'
import type { UseRangeCalendarProps } from './use'
import { forwardRef, memo } from 'react'
import Calendar from '../_calendar/calendar'
import { CalendarProvider } from '../context'
import { useRangeCalendar } from './use'

export type RangeCalendarProps = Omit<UseRangeCalendarProps, 'isRange'>

const RangeCalendar = memo(forwardRef<TaroElement, RangeCalendarProps>((props, ref) => {
  const { context, getCalendarProps } = useRangeCalendar(props)

  return (
    <CalendarProvider value={context}>
      <Calendar ref={ref} {...getCalendarProps()} />
    </CalendarProvider>
  )
}))

RangeCalendar.displayName = 'Srcube.RangeCalendar'

export default RangeCalendar
