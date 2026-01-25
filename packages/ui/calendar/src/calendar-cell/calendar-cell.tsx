import type { CalendarDate } from '@internationalized/date'
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { CalendarReturnType, CalendarSlots } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MutableRefObject, ReactNode } from 'react'
import { Box } from '@srcube-taro/box'
import { memo, startTransition, useCallback, useMemo } from 'react'

export interface CalendarDay {
  date: CalendarDate
  isToday: boolean
  isSelected: boolean
  isUnavailable: boolean
  isDisabled: boolean
}

export interface CalendarCellProps {
  stateRef: MutableRefObject<CalendarState | RangeCalendarState>
  data: CalendarDate
  slots: CalendarReturnType
  classNames?: SlotsToClasses<CalendarSlots>
  content?: (state: CalendarDay) => ReactNode
  // Derived props to avoid re-calculating and complex memo checks
  isRange: boolean
  isSelected: boolean
  isDisabled: boolean
  isUnavailable: boolean
  isRangeSelection: boolean
  isSelectionStart: boolean
  isSelectionEnd: boolean
  isToday: boolean
}

function CalendarCell(props: CalendarCellProps) {
  const {
    data,
    stateRef,
    slots,
    classNames,
    content,
    isRange,
    isSelected,
    isDisabled,
    isUnavailable,
    isRangeSelection,
    isSelectionStart,
    isSelectionEnd,
    isToday,
  } = props

  const cellContent = useMemo(() =>
    content?.({
      date: data,
      isToday,
      isSelected,
      isUnavailable,
      isDisabled,
    }) || data.day, [content, data, isToday, isSelected, isUnavailable, isDisabled])

  const handleDayTap = useCallback(() => {
    // Always use the latest state from ref to avoid stale closures without re-rendering
    const state = stateRef.current
    if (state.isReadOnly || state.isDisabled || isUnavailable) {
      return
    }

    try {
      startTransition(() => {
        state.selectDate(data)
        state.setFocusedDate(data)
      })
    }
    catch (error) {
      console.error('Srcube UI: Error handling date selection:', error)
    }
  }, [data, isUnavailable, stateRef])

  return (
    <Box
      className={slots.cell({
        className: [classNames?.cell],
      })}
      data-date={data.toString()}
      onTap={handleDayTap}
      role="gridcell"
      aria-selected={isSelected}
      aria-disabled={isDisabled || isUnavailable}
    >
      <Box className={slots.day({
        isRange,
        isToday,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isRangeSelection,
        isDisabled,
        className: [classNames?.day],
      })}
      >
        {cellContent}
      </Box>
    </Box>
  )
}

function arePropsEqual(prev: CalendarCellProps, next: CalendarCellProps) {
  if (prev.data.toString() !== next.data.toString())
    return false

  if (prev.slots !== next.slots)
    return false

  if (prev.classNames !== next.classNames)
    return false

  if (prev.content !== next.content)
    return false

  return prev.isSelected === next.isSelected
    && prev.isDisabled === next.isDisabled
    && prev.isUnavailable === next.isUnavailable
    && prev.isRangeSelection === next.isRangeSelection
    && prev.isSelectionStart === next.isSelectionStart
    && prev.isSelectionEnd === next.isSelectionEnd
    && prev.isToday === next.isToday
    && prev.isRange === next.isRange
}

CalendarCell.displayName = 'CalendarCell'

export default memo(CalendarCell, arePropsEqual)
