import { useCallback } from 'react'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'
import '@formatjs/intl-datetimeformat/polyfill'

export function useCalendarYMButton() {
  const { state, slots, size, locale, isRange, isYMPickerExpanded, classNames, setIsYMPickerExpanded } = useCalendarContext()

  const myDateFormatter = useDateFormatter(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  })

  const current = isRange ? state.focusedDate : state.visibleRange.start
  const monthYearContent = myDateFormatter.format(current.toDate(state.timeZone))

  const getButtonProps = useCallback(() => ({
    className: slots.pickerTrigger({ class: classNames?.pickerTrigger }),
    onTap: () => {
      setIsYMPickerExpanded(!isYMPickerExpanded)
    },
  }), [slots, isYMPickerExpanded, classNames, setIsYMPickerExpanded])

  return {
    slots,
    size,
    monthYearContent,
    getButtonProps,
  }
}
