import type { DateValue } from '@internationalized/date'
import type { CalendarState } from '@react-stately/calendar'
import type { CalendarProps } from '@react-types/calendar'
import type { UseCalendarBaseProps } from '../calendar-base'
import type { CalendarContextType } from '../context'
import { createCalendar } from '@internationalized/date'
import { useCalendarState } from '@react-stately/calendar'
import { useCallback, useMemo } from 'react'
import { useCalendarBase } from '../calendar-base'

export type UseDateCalendarProps = Exclude<UseCalendarBaseProps<CalendarProps<DateValue>>, 'isRange'>

export function useDateCalendar(props: UseDateCalendarProps) {
  const isRange = false

  const {
    domRef,
    slots,
    styles,
    size,
    locale,
    minValue,
    maxValue,
    weekdayStyle,
    firstDayOfWeek,
    isDisabled,
    isReadOnly,
    isYMPickerExpanded,
    setIsYMPickerExpanded,
  } = useCalendarBase({ ...props, isRange })

  const state = useCalendarState({
    minValue,
    maxValue,
    locale,
    isDisabled,
    isReadOnly,
    createCalendar: id => createCalendar(id),
  })

  const getBaseCalendarProps = useCallback(() => {
    return {
      ...props,
      ref: domRef,
      className: styles.wrapper,
    }
  }, [props, domRef, styles])

  const context = useMemo<CalendarContextType<CalendarState>>(() => ({
    state,
    slots,
    styles,
    locale,
    size,
    weekdayStyle,
    firstDayOfWeek,
    isRange,
    isYMPickerExpanded,
    setIsYMPickerExpanded,
  }), [state, slots, styles, locale, weekdayStyle, size, isRange, isYMPickerExpanded, setIsYMPickerExpanded])

  return {
    domRef,
    state,
    context,
    slots,
    styles,
    getBaseCalendarProps,
  }
}

export type UseDateCalendarReturn = ReturnType<typeof useDateCalendar>
