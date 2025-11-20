import { Button } from '@srcube-taro/button'
import { View } from '@tarojs/components'
import { useCalendarYMButton } from './use'

function CalendarYMButton() {
  const {
    size,
    slots,
    monthYearContent,
    getButtonProps,
  } = useCalendarYMButton()

  return (
    <Button
      color="default"
      variant="flat"
      round="full"
      size={size}
      endContent={<View className={slots.iChevronDown()} />}
      {...getButtonProps()}
    >
      {monthYearContent}
    </Button>
  )
}

CalendarYMButton.displayName = 'Srcube.CalendarYMButton'

export default CalendarYMButton
