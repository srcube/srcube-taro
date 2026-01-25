import type { DateValue } from '@internationalized/date'
import type { CalendarState } from '@react-stately/calendar'
import type { CalendarProps } from '@react-types/calendar'
import type { CalendarContextType, UseCalendarProps } from '../_calendar/use'
import { createCalendar, getLocalTimeZone, today } from '@internationalized/date'
import { useCalendarState } from '@react-stately/calendar'
import { useCallback, useMemo } from 'react'
import { useCalendar } from '../_calendar/use'

export type UseDateCalendarProps = UseCalendarProps<CalendarProps<DateValue>>

export function useDateCalendar(props: UseDateCalendarProps) {
  const isRange = false

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

  const state = useCalendarState({
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

  const context = useMemo<CalendarContextType<CalendarState>>(() => ({
    state,
    currentMonth,
    months,
    minValue,
    maxValue,
    slots,
    locale,
    firstDayOfWeek,
    size,
    classNames: props.classNames,
  }), [state, currentMonth, months, slots, locale, firstDayOfWeek, size, minValue, maxValue, props.classNames])

  return {
    context,
    getCalendarProps,
  }
}

export type UseDateCalendarReturn = ReturnType<typeof useDateCalendar>
