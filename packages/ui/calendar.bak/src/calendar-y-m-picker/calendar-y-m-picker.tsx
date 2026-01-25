import type { ViewProps } from '@tarojs/components'
import { ScrollView, View } from '@tarojs/components'
import { useCallback } from 'react'
import { useCalendarYMPicker } from './use'

function CalendarYMPicker() {
  const {
    ids,
    indicatorOffsetsRef,
    itemHeight,
    yearsScrollTop,
    monthsScrollTop,
    currentMonth,
    years,
    months,
    slots,
    styles,
    classNames,
    getItemRef,
    onYearsScroll,
    onMonthsScroll,
    onPickerItemTap,
  } = useCalendarYMPicker()

  const EmptyItem = useCallback(({ type }: { type: 'years' | 'months' }) => {
    const h = indicatorOffsetsRef.current[type] || 0
    return <View style={{ height: `${h}px` }} />
  }, [indicatorOffsetsRef])

  const PickerItemWrapper = useCallback(({ children, type }: ViewProps & { type: 'years' | 'months' }) => {
    return (
      <>
        <EmptyItem type={type} />
        {children}
        <EmptyItem type={type} />
      </>
    )
  }, [EmptyItem])

  return (
    <View className={styles.pickerContent}>
      <View className={styles.pickerMaskTop} />
      <View className={styles.pickerIndicator} id={ids.indicator} />
      <ScrollView
        id={ids.years}
        scrollY
        scrollWithAnimation
        scrollTop={yearsScrollTop}
        onScroll={onYearsScroll}
        className={styles.pickerYears}
      >
        <PickerItemWrapper type="years">
          {itemHeight > 0
            ? years.map((year, i) => (
                <View
                  key={year.value}
                  ref={node => getItemRef('years', year.value, node)}
                  data-index={i}
                  onClick={e => onPickerItemTap('years', e)}
                  className={slots.pickerYearItem({ isYMPickerCurrentItem: year.value === currentMonth.year, class: classNames?.pickerYearItem })}
                >
                  {year.label}
                </View>
              ))
            : null}
        </PickerItemWrapper>
      </ScrollView>
      <ScrollView
        id={ids.months}
        scrollY
        scrollWithAnimation
        scrollTop={monthsScrollTop}
        onScroll={onMonthsScroll}
        className={styles.pickerMonths}
      >
        <PickerItemWrapper type="months">
          {itemHeight > 0
            ? months.map((month, i) => (
                <View
                  key={month.value}
                  ref={node => getItemRef('months', month.value, node)}
                  data-index={i}
                  onClick={e => onPickerItemTap('months', e)}
                  className={slots.pickerMonthItem({ isYMPickerCurrentItem: month.value === currentMonth.month, class: classNames?.pickerMonthItem })}
                >
                  {month.label}
                </View>
              ))
            : null}
        </PickerItemWrapper>
      </ScrollView>
      <View className={styles.pickerMaskBottom} />
    </View>
  )
}

CalendarYMPicker.displayName = 'Srcube.CalendarYMPicker'

export default CalendarYMPicker
