import type { DateValue } from '@internationalized/date'
import { endOfMonth, startOfMonth, startOfYear } from '@internationalized/date'

export function getYearRange(start?: DateValue | null, end?: DateValue | null) {
  const years: DateValue[] = []
  if (!start || !end)
    return years
  let current = startOfYear(start)
  while (current.compare(end) <= 0) {
    years.push(current)
    current = startOfYear(current.add({ years: 1 }))
  }
  return years
}

export function getMonthsInYear(year: DateValue, minValue?: DateValue | null, maxValue?: DateValue | null) {
  const baseDate = startOfYear(year)
  const allMonths = Array.from({ length: 12 }, (_, i) => baseDate.add({ months: i }))

  if (!minValue && !maxValue)
    return allMonths

  return allMonths.filter((month) => {
    if (minValue && endOfMonth(month).compare(minValue) < 0)
      return false

    if (maxValue && startOfMonth(month).compare(maxValue) > 0)
      return false

    return true
  })
}
