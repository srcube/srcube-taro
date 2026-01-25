import type { ListboxRef } from '@srcube-taro/listbox'
import type { BaseEventOrig, ScrollViewProps } from '@tarojs/components'
import { Box } from '@srcube-taro/box'
import { Button } from '@srcube-taro/button'
import { useDisclosure } from '@srcube-taro/hooks'
import { Listbox, ListboxItem } from '@srcube-taro/listbox'
import { __DEV__ } from '@srcube-taro/utils-func'
import { createSelectorQuery } from '@tarojs/taro'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useCalendarContext } from '../context'
import { useDateFormatter } from '../hooks/use-date-formatter'
import { getMonthsInYear, getYearRange } from '../utils'

const SIZE_ITEM_HEIGHT = { xs: 28, sm: 32, md: 40, lg: 48 }

export interface CalendarYMPickerProps {}

function CalendarYMPicker(_: CalendarYMPickerProps) {
  const { state, slots, size, locale, classNames } = useCalendarContext()

  const { focusedDate } = state

  const ymDateFormatter = useDateFormatter(locale, {
    year: 'numeric',
    month: 'long',
    timeZone: state.timeZone,
  })
  const yearFormatter = useDateFormatter(locale, {
    year: 'numeric',
    timeZone: state.timeZone,
  })
  const monthFormatter = useDateFormatter(locale, {
    month: 'long',
    era: focusedDate.calendar.identifier === 'gregory' && focusedDate.era === 'BC' ? 'short' : void 0,
    calendar: focusedDate.calendar.identifier,
    timeZone: state.timeZone,
  })

  const itemHeight = SIZE_ITEM_HEIGHT[size]

  const ids = useMemo(() => {
    const idBase = `calendar-ym-picker-${Math.random().toString(36).slice(2, 10)}`
    return { indicator: `${idBase}-indicator`, years: `${idBase}-years`, months: `${idBase}-months` }
  }, [])

  const yearsboxRef = useRef<ListboxRef>(null!)
  const monthsboxRef = useRef<ListboxRef>(null!)
  const timerRef = useRef({ years: 0, months: 0 })

  const scrollTopRef = useRef({ years: 0, months: 0 })

  const [value, setValue] = useState(focusedDate)

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultOpen: false,
    onClose: () => state.setFocusedDate(value),
  })
  const [padding, setPadding] = useState({ years: 0, months: 0 })

  const isScrolling = useMemo(() => {
    if (!yearsboxRef.current || !monthsboxRef.current)
      return { years: false, months: false }
    return ({
      years: yearsboxRef.current.virtualizer.isScrolling,
      months: monthsboxRef.current.virtualizer.isScrolling,
    })
  }, [])

  const years = useMemo(() => {
    return getYearRange(state.minValue, state.maxValue).map((d, i) => ({
      index: i,
      label: yearFormatter.format(d.toDate(state.timeZone)),
      value: d.year,
      isSelected: !isScrolling.years && d.year === value.year,
    }))
  }, [value.year, state.minValue, state.maxValue, yearFormatter, state.timeZone, isScrolling.years])

  const months = useMemo(() => {
    return getMonthsInYear(value).map((d, i) => ({
      index: i,
      label: monthFormatter.format(d.toDate(state.timeZone)),
      value: d.month,
      isSelected: !isScrolling.months && d.month === value.month,
    }))
  }, [value, monthFormatter, state.timeZone, isScrolling.months])

  const handleTriggerTap = useCallback(() => {
    const open = !isOpen

    if (open) {
      setValue(focusedDate)
    }

    open ? onOpen() : onClose()
  }, [isOpen, setValue, focusedDate, onOpen, onClose])

  const scrollToIndex = useCallback((type: 'years' | 'months', index: number, options?: { behavior?: 'smooth' | 'auto' }) => {
    const listRef = type === 'years' ? yearsboxRef : monthsboxRef
    const virtualizer = listRef.current?.virtualizer
    if (!virtualizer)
      return

    const offset = virtualizer.getOffsetForIndex(index, 'center')
    const currentScroll = scrollTopRef.current[type]
    const targetOffset = typeof offset === 'number' ? offset : offset?.[0] ?? 0

    if (Math.abs(targetOffset - currentScroll) > 1)
      virtualizer.scrollToIndex(index, { align: 'center', behavior: options?.behavior ?? 'smooth' })
  }, [])

  const snap = useDebouncedCallback((type: 'years' | 'months') => {
    const currentTop = scrollTopRef.current[type]
    const list = type === 'years' ? years : months // 获取当前列表
    const len = list.length

    if (len === 0)
      return

    let idx = Math.round(currentTop / itemHeight)
    idx = Math.max(0, Math.min(idx, len - 1))

    scrollToIndex(type, idx)

    const targetItem = list[idx]
    if (!targetItem)
      return

    const targetValue = targetItem.value

    setValue((prev) => {
      if (type === 'years' && prev.year === targetValue)
        return prev
      if (type === 'months' && prev.month === targetValue)
        return prev

      const value = prev.set({ [type === 'years' ? 'year' : 'month']: targetValue })

      return value
    })
  }, 150)

  const doScroll = useCallback((type: 'years' | 'months', e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    const top = Number(e?.detail?.scrollTop ?? 0)
    scrollTopRef.current[type] = top

    snap(type)
  }, [snap])

  const handleYearsScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => doScroll('years', e), [doScroll])
  const handleMonthsScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => doScroll('months', e), [doScroll])

  const handleTap = useCallback((type: 'years' | 'months', item: typeof years[0] | typeof months[0]) => {
    const isSelected = type === 'years'
      ? item.value === value.year
      : item.value === value.month

    if (isSelected)
      return

    scrollToIndex(type, item.index)

    if (timerRef.current[type])
      clearTimeout(timerRef.current[type])

    timerRef.current[type] = setTimeout(() => {
      setValue((prev) => {
        if (type === 'years' && prev.year === item.value)
          return prev
        if (type === 'months' && prev.month === item.value)
          return prev
        return prev.set({ [type === 'years' ? 'year' : 'month']: item.value })
      })
    }, 300)
  }, [value, scrollToIndex])

  // Measure paddings
  useEffect(() => {
    try {
      const query = createSelectorQuery()

      query.select(`#${ids.years}`).boundingClientRect()
      query.select(`#${ids.months}`).boundingClientRect()
      query.exec(res => setPadding({
        years: Math.max(0, Math.floor((Number(res[0].height) - itemHeight) / 2)),
        months: Math.max(0, Math.floor((Number(res[1].height) - itemHeight) / 2)),
      }))
    }
    catch (error) {
      __DEV__ && console.error('[CalendarYMPicker] Measure padding failed:', error)
    }
  }, [ids, itemHeight, value.year, years, months, value.month, scrollToIndex])

  // Initialize scroll
  useLayoutEffect(() => {
    if (!isOpen) {
      setValue(focusedDate)
      return
    }

    const timer = setTimeout(() => {
      const yearIndex = years.findIndex(item => item.value === value.year)
      const monthIndex = months.findIndex(item => item.value === value.month)

      if (yearIndex >= 0)
        scrollToIndex('years', yearIndex, { behavior: 'auto' })
      if (monthIndex >= 0)
        scrollToIndex('months', monthIndex, { behavior: 'auto' })
    }, 50)

    return () => clearTimeout(timer)
  }, [isOpen, focusedDate, years, months, value, state, scrollToIndex])

  return (
    <>
      <Button
        color="default"
        variant="flat"
        radius="full"
        size={size}
        endContent={<Box className={slots._iChevronDown({ isYMPickerOpen: isOpen })} />}
        className={slots.pickerTrigger({ className: [classNames?.pickerTrigger] })}
        onTap={handleTriggerTap}
      >
        {ymDateFormatter.format(value.toDate(state.timeZone))}
      </Button>
      <Box
        className={slots.pickerPanel({ className: [classNames?.pickerPanel] })}
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none', transition: 'opacity 0.2s ease-in' }}
      >
        <Box id={ids.indicator} className={slots.pickerIndicator({ className: [classNames?.pickerIndicator] })} />
        <Box className={slots.pickerMaskTop({ className: [classNames?.pickerMaskTop] })} />
        <Box className={slots.pickerMaskBottom({ className: [classNames?.pickerMaskBottom] })} />
        {/* Years */}
        <Listbox
          ref={yearsboxRef}
          id={ids.years}
          items={years}
          estimateSize={itemHeight}
          onScroll={handleYearsScroll}
          virtualizerOptions={{
            paddingStart: padding.years,
            paddingEnd: padding.years,
          }}
          classNames={{ wrapper: slots.pickerYears({ className: [classNames?.pickerYears] }) }}
        >
          {item => (
            <ListboxItem
              key={item.value}
              textValue={item.label}
              onTap={() => handleTap('years', item)}
              className={slots.pickerYearItem({
                isYMPickerCurrentItem: item.isSelected,
                className: [classNames?.pickerYearItem],
              })}
              style={{ textAlign: 'center', lineHeight: `${itemHeight}px`, height: `${itemHeight}px` }}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
        {/* Months */}
        <Listbox
          ref={monthsboxRef}
          id={ids.months}
          items={months}
          estimateSize={itemHeight}
          onScroll={handleMonthsScroll}
          virtualizerOptions={{
            paddingStart: padding.months,
            paddingEnd: padding.months,
          }}
          classNames={{ wrapper: slots.pickerMonths({ className: [classNames?.pickerMonths] }) }}
        >
          {item => (
            <ListboxItem
              key={item.value}
              textValue={item.label}
              onTap={() => handleTap('months', item)}
              className={slots.pickerMonthItem({
                isYMPickerCurrentItem: item.isSelected,
                className: [classNames?.pickerMonthItem],
              })}
              style={{ textAlign: 'center', lineHeight: `${itemHeight}px`, height: `${itemHeight}px` }}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      </Box>
    </>
  )
}

CalendarYMPicker.displayName = 'Srcube.CalendarYMPicker'

export default CalendarYMPicker
