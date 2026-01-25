import type { CalendarDate, CalendarDateTime, ZonedDateTime } from '@internationalized/date'
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { CalendarProps, RangeCalendarProps } from '@react-types/calendar'
import type { CalendarReturnType, CalendarSlots, CalendarVariantProps } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { calendar } from '@srcube-taro/theme'
import { useMemo } from 'react'

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime

interface Props extends NativeProps<ViewProps> {
  /**
   * The locale to display and edit the value according to
   * @default en
   */
  locale?: 'en' | 'zh-CN' | 'zh-TW'
  /**
   * The minimum date value that is available for selection.
   */
  minValue?: DateValue | null
  /**
   * The maximum date value that is available for selection.
   */
  maxValue?: DateValue | null
  /**
   * A function that returns true if the date is unavailable for selection.
   */
  isDateUnavailable?: (date: DateValue) => boolean
  /**
   * Whether the calendar is disabled.
   */
  isDisabled?: boolean
  /**
   * Whether the calendar is read-only.
   */
  isReadOnly?: boolean
  /**
   * The first day of the week.
   * @default 'sun'
   */
  firstDayOfWeek?: 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'
  /**
   * The style of weekday labels
   * @default narrow
   */
  weekdayStyle?: 'narrow' | 'short' | 'long'
  /**
   * Whether the calendar is invalid.
   */
  isInvalid?: boolean
  /**
   * The error message to display when the calendar is invalid.
   */
  errorMessage?: ReactNode
  /**
   * The current month to display
   */
  currentMonth?: CalendarDate
  /**
   * Custom class names for the calendar slots
   */
  classNames?: SlotsToClasses<CalendarSlots>
}

export interface CalendarDay {
  date: CalendarDate
  isToday: boolean
  isSelected: boolean
  isOutsideMonth: boolean
  isDisabled: boolean
  isSelectable: boolean
  isUnavailable: boolean
}

export interface CalendarContextType<T extends CalendarState | RangeCalendarState> {
  state: T
  currentMonth: CalendarDate
  months: CalendarDate[]
  minValue: DateValue | null
  maxValue: DateValue | null
  slots: CalendarReturnType
  size: NonNullable<CalendarVariantProps['size']>
  locale: NonNullable<Props['locale']>
  firstDayOfWeek: NonNullable<Props['firstDayOfWeek']>
  classNames?: SlotsToClasses<CalendarSlots>
}

export type UseCalendarProps<T extends CalendarProps<DateValue> | RangeCalendarProps<DateValue> | unknown = unknown> = Props & CalendarVariantProps & T

const DEFAULT_MIN_DATE = parseDate('1900-01-01')
const DEFAULT_MAX_DATE = parseDate('2099-12-31')

export function useCalendar(props: UseCalendarProps) {
  const {
    size = 'md',
    color = 'primary',
    locale = 'en',
    minValue = DEFAULT_MIN_DATE,
    maxValue = DEFAULT_MAX_DATE,
    weekdayStyle = 'narrow',
    firstDayOfWeek = 'sun',
    currentMonth = today(getLocalTimeZone()),
    isRange,
    isDisabled,
    classNames,
    ...rest
  } = props

  const slots = useMemo(
    () => calendar({ size, color, isRange, isDisabled }),
    [size, color, isRange, isDisabled],
  )

  const months = useMemo(() => {
    const [start, end] = [minValue, maxValue] as [CalendarDate, CalendarDate]

    const ms: CalendarDate[] = []
    let current = start

    while (current.compare(end) <= 0) {
      ms.push(current)
      current = current.add({ months: 1 })
    }
    return ms
  }, [minValue, maxValue])

  return {
    slots,
    size,
    locale,
    minValue,
    maxValue,
    isDisabled,
    weekdayStyle,
    firstDayOfWeek,
    currentMonth,
    months,
    classNames,
    ...rest,
  }
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>
