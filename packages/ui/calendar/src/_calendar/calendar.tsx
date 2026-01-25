import type { TaroElement } from '@tarojs/runtime'
import type { UseCalendarProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import CalendarContent from '../calendar-content/calendar-content'
import { CalendarYMPicker } from '../calendar-y-m-picker'
import { useCalendarContext } from '../context'

export interface CalendarProps extends UseCalendarProps {}

const Calendar = forwardRef<TaroElement, CalendarProps>((props, ref) => {
  const { weekdayStyle, firstDayOfWeek, className } = props

  const { slots, classNames } = useCalendarContext()

  return (
    <View ref={ref} className={slots.wrapper({ className: [classNames?.wrapper, className] })}>
      <View className={slots.action({ className: classNames?.action })}>
        <CalendarYMPicker />
      </View>
      <CalendarContent weekdayStyle={weekdayStyle} firstDayOfWeek={firstDayOfWeek} />
    </View>
  )
})

Calendar.displayName = 'Srcube.Calendar'

export default Calendar
