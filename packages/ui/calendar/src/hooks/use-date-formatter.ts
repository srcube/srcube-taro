import { DateFormatter } from '@internationalized/date'
import { useDeepMemo } from '@srcube-taro/hooks'
import { useMemo } from 'react'

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string
}

/**
 * Provides localized date formatting for the current locale. Automatically updates when the locale changes,
 * and handles caching of the date formatter for performance.
 * @param locale - [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale.
 * @param options - Formatting options.
 */
export function useDateFormatter(locale: string, options?: DateFormatterOptions): DateFormatter {
  // Reuse last options object if it is shallowly equal, which allows the useMemo result to also be reused.
  options = useDeepMemo(options ?? {}, isEqual)

  return useMemo(() => new DateFormatter(locale, options), [locale, options])
}



function isEqual(a: DateFormatterOptions, b: DateFormatterOptions) {
  if (a === b) {
    return true
  }

  const aKeys = Object.keys(a) as (keyof DateFormatterOptions)[]
  const bKeys = Object.keys(b) as (keyof DateFormatterOptions)[]
  if (aKeys.length !== bKeys.length) {
    return false
  }

  for (const key of aKeys) {
    if (b[key] !== a[key]) {
      return false
    }
  }

  return true
}
