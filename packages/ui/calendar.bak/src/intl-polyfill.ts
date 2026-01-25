// @ts-nocheck
if (typeof Intl === 'undefined') {
  // @ts-ignore
  global.Intl = {}
}

if (!Intl.DateTimeFormat) {
  class FallbackDateFormatter {
    constructor(private locale: string, private options?: Intl.DateTimeFormatOptions) {}

    format(date?: Date | number): string {
      if (!date) {
        date = new Date()
      } else if (typeof date === 'number') {
        date = new Date(date)
      }

      const { locale, options } = this
      const isZh = locale.startsWith('zh')
      const isTw = locale === 'zh-TW' || locale === 'zh-Hant'

      if (options?.weekday) {
        const day = date.getDay()
        if (isZh) {
          const weekdays = ['日', '一', '二', '三', '四', '五', '六']
          const prefix = options.weekday === 'narrow' ? '' : (isTw ? '週' : '周')
          return prefix + weekdays[day]
        }
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return options.weekday === 'narrow' ? weekdays[day][0] : weekdays[day].slice(0, 3)
      }

      if (options?.month) {
        const month = date.getMonth()
        if (isZh) {
          return `${month + 1}月`
        }
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return options.month === 'short' ? months[month].slice(0, 3) : months[month]
      }

      if (options?.year) {
        return `${date.getFullYear()}${isZh ? '年' : ''}`
      }

      // Default fallback: YYYY/MM/DD
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
    
    resolvedOptions() {
      return {
        locale: this.locale,
        ...this.options
      }
    }
  }

  // @ts-ignore
  Intl.DateTimeFormat = FallbackDateFormatter
}
