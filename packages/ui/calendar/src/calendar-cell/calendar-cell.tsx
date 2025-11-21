import type { UseCalendarCellProps } from './use'
import { View } from '@tarojs/components'
import { useCalendarCell } from './use'

export interface CalendarCellProps extends UseCalendarCellProps {}

function CalendarCell(props: CalendarCellProps) {
  const {
    cellContent,
    isToday,
    isOutsideMonth,
    isSelected,
    isDisabled,
    isRange,
    getCellProps,
    getDayProps,
  } = useCalendarCell(props)

  if (isRange && isOutsideMonth)
    return <View />

  return (
    <View
      {...getCellProps()}
      role="gridcell"
      aria-selected={isSelected ? 'true' : 'false'}
      aria-disabled={isDisabled ? 'true' : 'false'}
      aria-current={isToday ? 'date' : undefined}
    >
      <View {...getDayProps()}>{cellContent}</View>
    </View>
  )
}

CalendarCell.displayName = 'Srcube.CalendarCell'

export default CalendarCell
