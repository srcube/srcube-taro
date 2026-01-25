import { useCallback } from 'react'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'

export function useCalendarYMButton() {
  const { state, slots, size, locale, isRange, isYMPickerExpanded, classNames, setIsYMPickerExpanded } = useCalendarContext()

  const ymDateFormatter = useDateFormatter(locale, {
    year: 'numeric',
    month: 'long',
    timeZone: state.timeZone,
  })

  const current = isRange ? state.focusedDate : state.visibleRange.start
  const monthYearContent = ymDateFormatter.format(current.toDate(state.timeZone))

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
