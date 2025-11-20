import type { TaroElement } from '@tarojs/runtime'
import type { UseDateCalendarProps } from './use'
import { forwardRef } from 'react'
import { CalendarBase } from '../calendar-base'
import { CalendarProvider } from '../context'
import { useDateCalendar } from './use'

export type DateCalendarProps = UseDateCalendarProps

const DateCalendar = forwardRef<TaroElement, DateCalendarProps>((props, ref) => {
  const { context, getBaseCalendarProps } = useDateCalendar({ ...props, ref })

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...getBaseCalendarProps()} />
    </CalendarProvider>
  )
})

DateCalendar.displayName = 'Srcube.DateCalendar'

export default DateCalendar
