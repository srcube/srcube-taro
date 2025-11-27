import type { UseCalendarMonthHeaderProps } from './use'
import { Text, View } from '@tarojs/components'
import { useCalendarMonthHeader } from './use'

export interface CalendarMonthHeaderProps extends UseCalendarMonthHeaderProps {}

function CalendarMonthHeader(props: CalendarMonthHeaderProps) {
  const { styles, content, monthDate } = useCalendarMonthHeader(props)

  return (
    <View
      id={`calendar-month-header-${monthDate?.year}-${monthDate?.month}`}
      className={styles.monthHeader}
      role="heading"
      aria-level={2}
    >
      <Text>{content.month}</Text>
      <Text>{content.year}</Text>
    </View>
  )
}

CalendarMonthHeader.displayName = 'Srcube.CalendarMonthHeader'

export default CalendarMonthHeader
