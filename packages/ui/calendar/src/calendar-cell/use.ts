import type { CalendarDate } from '@internationalized/date'
import type { RangeCalendarState } from '@react-stately/calendar'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { isToday as isDateToday, isSameDay, isSameMonth } from '@internationalized/date'
import { useCallback, useMemo } from 'react'
import { useCalendarContext } from '../context'
import '@formatjs/intl-datetimeformat/polyfill'

export interface CalendarDay {
  date: CalendarDate
  isOutsideMonth: boolean
  isToday: boolean
  isSelected: boolean
  isUnavailable: boolean
  isDisabled: boolean
}

export interface UseCalendarCellProps {
  date: CalendarDate
  start?: CalendarDate
  content?: (state: CalendarDay) => ReactNode
  isDateUnavailable?: (date: CalendarDate) => boolean
}

export function useCalendarCell(props: UseCalendarCellProps) {
  const { date, start, content, isDateUnavailable } = props

  const { state, locale, slots, isRange, classNames } = useCalendarContext()

  const label = new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(
    date.toDate(state.timeZone),
  )

  const selectableRange = state.minValue && state.maxValue ? [state.minValue, state.maxValue] : undefined

  const isOutsideMonth = !isSameMonth(date, start || state.visibleRange.start)
  const isToday = isDateToday(date, state.timeZone)

  // Range selection state (supports in-progress and committed ranges)
  const rangeState = isRange ? (state as RangeCalendarState) : null
  const highlightedRange = rangeState?.highlightedRange ?? null
  const committedRange = rangeState?.value ?? null
  const effectiveRange = highlightedRange ?? committedRange

  const isSelectionStart = effectiveRange?.start ? isSameDay(date, effectiveRange.start) : false
  const isSelectionEnd = effectiveRange?.end ? isSameDay(date, effectiveRange.end) : false

  // In range mode, "selected" applies to range edges; single mode uses state
  const isSelected = isRange ? (isSelectionStart || isSelectionEnd) : state.isSelected(date)

  // Middle range highlight: strictly between start and end
  const isRangeSelection = effectiveRange?.start && effectiveRange?.end
    ? (date.compare(effectiveRange.start) > 0 && date.compare(effectiveRange.end) < 0)
    : false

  // Outside-of-range should be strict (< min or > max), boundaries selectable
  const isOutOfRange = selectableRange
    ? (date.compare(selectableRange[0] as CalendarDate) < 0
      || date.compare(selectableRange[1] as CalendarDate) > 0)
    : false

  const isUnavailable = (isDateUnavailable?.(date) ?? false)
    || isOutOfRange
    || (state.isCellUnavailable ? state.isCellUnavailable(date) : false)

  const isDisabled = state.isDisabled || isUnavailable

  const cellContent = useMemo(() => {
    return content?.({
      date,
      isOutsideMonth,
      isToday,
      isSelected,
      isUnavailable,
      isDisabled,
    }) || date.day
  }, [date, isOutsideMonth, isToday, isSelected, isUnavailable, isDisabled, content])

  const handleCellTap = useCallback(() => {
    if (state.isReadOnly || state.isDisabled || isUnavailable) {
      return
    }

    try {
      state.selectDate(date)
      state.setFocusedDate(date)
    }
    catch (error) {
      console.error('Srcube UI: Error handling date selection:', error)
    }
  }, [state, date, isUnavailable])

  const getCellProps = useCallback((): ViewProps => {
    return {
      className: slots.cell({ class: classNames?.cell }),
    }
  }, [slots, classNames?.cell])

  const getDayProps = useCallback((): ViewProps => {
    return {
      className: slots.day({
        isRange,
        isOutsideMonth,
        isToday,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isRangeSelection,
        isDisabled,
        class: classNames?.day,
      }),
      onTap: handleCellTap,
    }
  }, [slots, classNames?.day, isRange, isOutsideMonth, isToday, isSelected, isSelectionStart, isSelectionEnd, isRangeSelection, isDisabled, handleCellTap])

  return {
    label,
    cellContent,
    isRange,
    isToday,
    isOutsideMonth,
    isSelected,
    isDisabled,
    getCellProps,
    getDayProps,
  }
}

export type UseCalendarCellReturn = ReturnType<typeof useCalendarCell>
