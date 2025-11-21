import type { TaroElement } from '@tarojs/runtime'
import type { UseCalendarBaseProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { CalendarHeader } from '../calendar-header'
import { CalendarMonth } from '../calendar-month'
import { CalendarYMPicker } from '../calendar-y-m-picker'
import { useCalendarContext } from '../context'
// import '../polyfill'

export interface CalendarBaseProps extends UseCalendarBaseProps {}

const CalendarBase = forwardRef<TaroElement, CalendarBaseProps>((_, ref) => {
  const { styles } = useCalendarContext()

  return (
    <View ref={ref} className={styles.wrapper}>
      <CalendarHeader />
      <View className={styles.content}>
        <CalendarYMPicker />
        <CalendarMonth />
      </View>
    </View>
  )
})

CalendarBase.displayName = 'Srcube.CalendarBase'

export default CalendarBase
