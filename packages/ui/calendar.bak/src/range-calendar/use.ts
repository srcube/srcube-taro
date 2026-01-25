import type { RangeCalendarState } from '@react-stately/calendar'
import type { DateValue, RangeCalendarProps } from '@react-types/calendar'
import type { UseCalendarBaseProps } from '../calendar-base'
import type { CalendarContextType } from '../context'
import { createCalendar, getLocalTimeZone, today } from '@internationalized/date'
import { useRangeCalendarState } from '@react-stately/calendar'
import { useCallback, useMemo } from 'react'
import { useCalendarBase } from '../calendar-base'

export type UseRangeCalendarProps = Exclude<UseCalendarBaseProps<RangeCalendarProps<DateValue>>, 'isRange'>

export function useRangeCalendar(props: UseRangeCalendarProps) {
  const isRange = true

  const {
    domRef,
    slots,
    styles,
    locale,
    size,
    weekdayStyle,
    firstDayOfWeek,
    minValue,
    maxValue,
    classNames,
    isDisabled,
    isReadOnly,
    isYMPickerExpanded,
    setIsYMPickerExpanded,
    months,
    monthIndexMap,
    activeMonthIndex,
    setActiveMonthIndex,
    targetMonthIndex,
    setTargetMonthIndex,
  } = useCalendarBase({ ...props, isRange })

  const state = useRangeCalendarState({
    ...props,
    locale,
    minValue,
    maxValue,
    isDisabled,
    isReadOnly,
    defaultFocusedValue: props.currentMonth ?? today(getLocalTimeZone()),
    createCalendar: id => createCalendar(id),
  })

  const getBaseCalendarProps = useCallback(() => ({
    ...props,
    ref: domRef,
    className: styles.base,
  }), [props, domRef, styles.base])

  const context = useMemo<CalendarContextType<RangeCalendarState>>(() => ({
    state,
    slots,
    styles,
    locale,
    size,
    weekdayStyle,
    firstDayOfWeek,
    isRange,
    classNames,
    isYMPickerExpanded,
    setIsYMPickerExpanded,
    months,
    monthIndexMap,
    activeMonthIndex,
    setActiveMonthIndex,
    targetMonthIndex,
    setTargetMonthIndex,
  }), [state, slots, styles, locale, weekdayStyle, firstDayOfWeek, size, isRange, classNames, isYMPickerExpanded, setIsYMPickerExpanded, months, monthIndexMap, activeMonthIndex, setActiveMonthIndex, targetMonthIndex, setTargetMonthIndex])

  return {
    context,
    state,
    styles,
    getBaseCalendarProps,
  }
}

export type UseCalendarRangeState = ReturnType<typeof useRangeCalendar>
