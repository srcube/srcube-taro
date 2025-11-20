import type { TaroElement } from '@tarojs/runtime'
import type { UseRangeCalendarProps } from './use'
import { forwardRef } from 'react'
import { CalendarBase } from '../calendar-base'
import { CalendarProvider } from '../context'
import { useRangeCalendar } from './use'

export interface RangeCalendarProps extends UseRangeCalendarProps {}

const RangeCalendar = forwardRef<TaroElement, RangeCalendarProps>((props, ref) => {
  const { context, getBaseCalendarProps } = useRangeCalendar({ ...props, ref })

  return (
    <CalendarProvider value={context}>
      <CalendarBase {...getBaseCalendarProps()} />
    </CalendarProvider>
  )
})

RangeCalendar.displayName = 'Srcube.RangeCalendar'

export default RangeCalendar
