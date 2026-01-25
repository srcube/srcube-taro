import type {
  CalendarDate,
  CalendarIdentifier,
  DateValue,
} from '@internationalized/date'
import type { CalendarProps, CalendarPropsBase, RangeCalendarProps } from '@react-types/calendar'
import type { CalendarSlots, CalendarVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { parseDate } from '@internationalized/date'
import { calendar } from '@srcube-taro/theme'
import { useControlledState, useDOMRef } from '@srcube-taro/utils-react'
import { useEffect, useMemo, useState } from 'react'

interface Props extends Exclude<NativeProps<ViewProps>, ''>, CalendarPropsBase {
  /**
   * Ref to the DOM node
   */
  ref?: ReactRef<TaroElement | null>
  /**
   * The locale to display and edit the value according to
   * [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale.
   * @default en
   */
  locale?: 'en' | 'zh-CN' | 'zh-TW'
  /**
   * The calendar system used by the date picker
   */
  calendar?: CalendarIdentifier
  /**
   * The style of weekday labels
   * @default narrow
   */
  weekdayStyle?: 'narrow' | 'short' | 'long'
  /**
   * Whether the MMYYYY picker is expanded
   */
  isMYPickerExpanded?: boolean
  /**
   * Whether the MMYYYY picker is expanded by default
   */
  isMYPickerDefaultExpanded?: boolean
  /**
   * Custom class names for the calendar slots
   */
  classNames?: SlotsToClasses<CalendarSlots>
  /**
   * Callback when the MMYYYY picker is expanded or collapsed
   */
  onMYPickerExpandedChange?: (isExpanded: boolean) => void
  /**
   * The current month to display
   */
  currentMonth?: CalendarDate
}

/**
 * Extended calendar day with state information
 */
export interface CalendarDay {
  /** The date value */
  date: CalendarDate
  /** Whether this day is today */
  isToday: boolean
  /** Whether this day is selected */
  isSelected: boolean
  /** Whether this day is outside the current month */
  isOutsideMonth: boolean
  /** Whether this day is disabled */
  isDisabled: boolean
  /** Whether this day is selectable */
  isSelectable: boolean
  /** Whether this day is unavailable */
  isUnavailable: boolean
}

export type UseCalendarBaseProps<T extends CalendarProps<DateValue> | RangeCalendarProps<DateValue> | unknown = unknown> = Props & CalendarVariantProps & T

export function useCalendarBase(props: UseCalendarBaseProps) {
  const {
    ref,
    size = 'md',
    color = 'primary',
    locale = 'en',
    minValue = parseDate('1900-01-01'),
    maxValue = parseDate('2099-12-31'),
    weekdayStyle = 'narrow',
    firstDayOfWeek,
    isRange,
    isDisabled,
    isReadOnly,
    isMYPickerExpanded: isMYPickerExpandedProp,
    isMYPickerDefaultExpanded,
    className,
    classNames,
    onMYPickerExpandedChange,
  } = props

  const domRef = useDOMRef(ref)

  const [isYMPickerExpanded, setIsYMPickerExpanded] = useControlledState(isMYPickerExpandedProp, isMYPickerDefaultExpanded ?? false, (value: boolean) => {
    onMYPickerExpandedChange?.(value)
  })

  const slots = useMemo(
    () => calendar({ size, color, isRange, isDisabled, isReadOnly, isYMPickerExpanded }),
    [size, color, isRange, isDisabled, isReadOnly, isYMPickerExpanded],
  )

  const styles = useMemo(() => {
    return {
      base: slots.base({ class: className ?? classNames?.base }),
      content: slots.content({ class: classNames?.content }),
      pickerWrapper: slots.pickerWrapper({ class: classNames?.pickerWrapper }),
      pickerContent: slots.pickerContent({ class: classNames?.pickerContent }),
      pickerIndicator: slots.pickerIndicator({ class: classNames?.pickerIndicator }),
      pickerMaskTop: slots.pickerMaskTop({ class: classNames?.pickerMaskTop }),
      pickerMaskBottom: slots.pickerMaskBottom({ class: classNames?.pickerMaskBottom }),
      pickerYears: slots.pickerYears({ class: classNames?.pickerYears }),
      pickerMonths: slots.pickerMonths({ class: classNames?.pickerMonths }),
      pickerYearItem: slots.pickerYearItem({ class: classNames?.pickerYearItem }),
      pickerMonthItem: slots.pickerMonthItem({ class: classNames?.pickerMonthItem }),
      monthContent: slots.monthContent({ class: classNames?.monthContent }),
      weekdays: slots.weekdays({ class: classNames?.weekdays }),
      weekday: slots.weekday({ class: classNames?.weekday }),
      months: slots.months({ class: classNames?.months }),
      monthHeader: slots.monthHeader({ class: classNames?.monthHeader }),
      weeks: slots.weeks({ class: classNames?.weeks }),
      days: slots.days({ class: classNames?.days }),
      iPrevAction: slots.iPrevAction({ class: classNames?.iPrevAction }),
      iNextAction: slots.iNextAction({ class: classNames?.iNextAction }),
    }
  }, [slots, className, classNames])

  const [activeMonthIndex, setActiveMonthIndex] = useState(0)
  const [targetMonthIndex, setTargetMonthIndex] = useState<number | null>(null)

  useEffect(() => {
    if (targetMonthIndex !== null && activeMonthIndex === targetMonthIndex) {
      setTargetMonthIndex(null)
    }
  }, [activeMonthIndex, targetMonthIndex])

  const months = useMemo(() => {
    const start = minValue as CalendarDate
    const end = maxValue as CalendarDate
    const ms: CalendarDate[] = []
    let current = start
    while (current.compare(end) <= 0) {
      ms.push(current)
      current = current.add({ months: 1 })
    }
    return ms
  }, [minValue, maxValue])

  const monthIndexMap = useMemo(() => {
    const map = new Map<number, number>()
    for (let i = 0; i < months.length; i++) {
      const d = months[i]
      map.set(d.year * 100 + d.month, i)
    }
    return map
  }, [months])

  return {
    domRef,
    slots,
    styles,
    size,
    locale,
    minValue,
    maxValue,
    weekdayStyle,
    firstDayOfWeek,
    classNames,
    isRange,
    isDisabled,
    isReadOnly,
    isYMPickerExpanded,
    setIsYMPickerExpanded,
    currentMonth: props.currentMonth,
    months,
    monthIndexMap,
    activeMonthIndex,
    setActiveMonthIndex,
    targetMonthIndex,
    setTargetMonthIndex,
  }
}

export type UseCalendarBaseReturn = ReturnType<typeof useCalendarBase>
