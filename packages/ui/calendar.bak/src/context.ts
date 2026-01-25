import type { CalendarDate } from '@internationalized/date'
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { CalendarReturnType, CalendarSlots } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { CalendarBaseProps, UseCalendarBaseProps } from './calendar-base'
import { createContext } from '@srcube-taro/utils-react'

export type CalendarContextType<T extends CalendarState | RangeCalendarState> = {
  state: T
  firstDayOfWeek: CalendarBaseProps['firstDayOfWeek']
  slots: CalendarReturnType
  styles: Partial<Record<CalendarSlots, string>>
  isYMPickerExpanded: boolean
  classNames?: SlotsToClasses<CalendarSlots>
  setIsYMPickerExpanded: (isExpanded: boolean) => void
  months: CalendarDate[]
  monthIndexMap: Map<number, number>
  activeMonthIndex: number
  setActiveMonthIndex: (index: number) => void
  targetMonthIndex: number | null
  setTargetMonthIndex: (index: number | null) => void
} & Required<Pick<UseCalendarBaseProps, 'locale' | 'size' | 'weekdayStyle' | 'isRange'>>

export const [CalendarProvider, useCalendarContext] = createContext<CalendarContextType<CalendarState | RangeCalendarState>>({
  name: 'CalendarContext',
  strict: false,
  errorMessage:
    'useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider',
})
