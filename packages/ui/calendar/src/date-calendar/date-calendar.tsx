import type { TaroElement } from '@tarojs/runtime'
import type { UseDateCalendarProps } from './use'
import { forwardRef, memo } from 'react'
import { Calendar } from '../_calendar'
import { CalendarProvider } from '../context'
import { useDateCalendar } from './use'

export type DateCalendarProps = Omit<UseDateCalendarProps, 'isRange'>

const DateCalendar = memo(forwardRef<TaroElement, DateCalendarProps>((props, ref) => {
  const { context, getCalendarProps } = useDateCalendar(props)

  return (
    <CalendarProvider value={context}>
      <Calendar ref={ref} {...getCalendarProps()} />
    </CalendarProvider>
  )
}))

DateCalendar.displayName = 'Srcube.DateCalendar'

export default DateCalendar
