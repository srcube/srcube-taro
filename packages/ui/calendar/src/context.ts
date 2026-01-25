import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import type { CalendarContextType } from './_calendar/use'
import { createContext } from '@srcube-taro/utils-react'

export const [CalendarProvider, useCalendarContext] = createContext<CalendarContextType<CalendarState | RangeCalendarState>>({
  name: 'CalendarContext',
  strict: false,
  errorMessage:
    'useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider',
})
