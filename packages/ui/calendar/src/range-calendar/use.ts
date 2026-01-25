import type { DateValue } from '@internationalized/date'
import type { RangeCalendarState } from '@react-stately/calendar'
import type { RangeCalendarProps } from '@react-types/calendar'
import type { CalendarContextType, UseCalendarProps } from '../_calendar/use'
import { createCalendar, getLocalTimeZone, today } from '@internationalized/date'
import { useRangeCalendarState } from '@react-stately/calendar'
import { useCallback, useMemo } from 'react'
import { useCalendar } from '../_calendar/use'

export type UseRangeCalendarProps = UseCalendarProps<RangeCalendarProps<DateValue>>

export function useRangeCalendar(props: UseRangeCalendarProps) {
  const isRange = true

  const {
    slots,
    locale,
    firstDayOfWeek,
    months,
    currentMonth,
    minValue,
    maxValue,
    size,
    isDisabled,
    isReadOnly,
  } = useCalendar({ ...props, isRange })

  const defaultFocusedValue = useMemo(
    () => props.currentMonth ?? today(getLocalTimeZone()),
    [props.currentMonth],
  )

  const state = useRangeCalendarState({
    ...props,
    locale,
    minValue,
    maxValue,
    isDisabled,
    isReadOnly,
    defaultFocusedValue,
    createCalendar: id => createCalendar(id),
  })

  const getCalendarProps = useCallback(() => ({
    ...props,
  }), [props])

  const context = useMemo<CalendarContextType<RangeCalendarState>>(() => ({
    state,
    months,
    currentMonth,
    minValue,
    maxValue,
    slots,
    locale,
    firstDayOfWeek,
    size,
    classNames: props.classNames,
  }), [state, months, slots, locale, firstDayOfWeek, size, minValue, maxValue, props.classNames])

  return {
    context,
    getCalendarProps,
  }
}
