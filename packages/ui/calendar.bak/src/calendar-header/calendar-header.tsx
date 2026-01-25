import { Button } from '@srcube-taro/button'
import { View } from '@tarojs/components'
import { CalendarYMButton } from '../calendar-y-m-button'
import { useCalendarHeader } from './use'

function CalendarHeader() {
  const { slots, isRange, getPrevProps, getNextProps } = useCalendarHeader()

  const prevActionContent = !isRange && (
    <Button variant="text" isIcon {...getPrevProps()}>
      <View className={slots.iPrevAction()} />
    </Button>
  )

  const nextActionContent = !isRange && (
    <Button variant="text" isIcon {...getNextProps()}>
      <View className={slots.iNextAction()} />
    </Button>
  )

  return (
    <View className={slots.header()}>
      <View>
        {prevActionContent}
      </View>
      <CalendarYMButton />
      <View>
        {nextActionContent}
      </View>
    </View>
  )
}

CalendarHeader.displayName = 'Srcube.CalendarHeader'

export default CalendarHeader
