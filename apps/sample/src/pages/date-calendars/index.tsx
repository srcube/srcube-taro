import type { DateCalendarProps, DateValue } from '@srcube-taro/ui'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { Box, Button, DateCalendar, Drawer, DrawerContent, DrawerFooter } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useState } from 'react'
import { Page, Section } from '@/components'

const colors = ['default', 'primary', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const locales = ['en', 'zh-CN', 'zh-TW', 'ja-JP'] as const

export default function DateCalendars() {
  const [isSetsOpen, setIsSetsOpen] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState<DateValue | null>(null)
  const minValue = parseDate('2026-01-01')
  const maxValue = parseDate('2026-12-31')

  const [size, setSize] = useState<DateCalendarProps['size']>('md')
  const [color, setColor] = useState<DateCalendarProps['color']>('primary')
  const [locale, setLocale] = useState<DateCalendarProps['locale']>('en')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)
  const [limitRange, setLimitRange] = useState<boolean>(false)
  const [disableWeekend, setDisableWeekend] = useState<boolean>(false)

  // const handleDateChange = (value: DateValue | null) => {
  //   setSelectedValue(value)
  // }

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const commonProps = {
    size,
    color,
    locale,
    isDisabled,
    isReadOnly,
    minValue: limitRange ? minValue : undefined,
    maxValue: limitRange ? maxValue : undefined,
    isDateUnavailable: disableWeekend ? isDateUnavailable : undefined,
  } as const

  return (
    <Page>
      <Section title="Calendar" contentClass="space-y-4">
        <Box className="space-y-3">
          <DateCalendar
            {...commonProps}
            value={selectedValue}
            onChange={setSelectedValue}
          />
          {selectedValue && (
            <Box className="p-4 bg-gray-100 rounded-lg">
              <View className="text-sm text-gray-600">Selected Date: {selectedValue.toString()}</View>
            </Box>
          )}
        </Box>

        { limitRange && (
          <Box className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
            <Box className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
            <Box className="text-sm text-gray-800">Limited to the visible month: {minValue.toString()} - {maxValue.toString()}.</Box>
          </Box>
        )}
      </Section>

      <Box className="fixed bottom-0 inset-x-0 pb-safe-4 px-4 pt-4">
        <Button color="primary" isBlock className="mt-4" onTap={() => setIsSetsOpen(true)}>State Sets</Button>
      </Box>

      <Drawer isOpen={isSetsOpen} onClose={() => setIsSetsOpen(false)}>
        <DrawerContent>
          <Section title="Colors" className="p-0">
            <Box className="flex flex-wrap gap-2 items-center">
              {colors.map(c => (<Button key={c} color={c} size="sm" onTap={() => setColor(c)}>{capitalize(c)}</Button>))}
            </Box>
          </Section>
          <Section title="Sizes" className="p-0">
            <Box className="flex flex-wrap gap-2 items-center">
              {sizes.map(s => (<Button key={s} size={s} onTap={() => setSize(s)}>{s}</Button>))}
            </Box>
          </Section>
          <Section title="Locales" className="p-0">
            <Box className="flex flex-wrap gap-2 items-center">
              {locales.map(l => (<Button key={l} size="sm" onTap={() => setLocale(l)}>{l}</Button>))}
            </Box>
          </Section>
          <Section title="State" className="p-0">
            <Box className="flex flex-wrap gap-2 items-center">
              <Button
                size="sm"
                isBlock
                onTap={() => {
                  setIsDisabled(d => !d)
                  setIsReadOnly(false)
                }}
              >
                {`isDisabled: ${isDisabled ? 'On' : 'Off'}`}
              </Button>
              <Button
                size="sm"
                isBlock
                onTap={() => {
                  setIsReadOnly(r => !r)
                  setIsDisabled(false)
                }}
              >
                {`isReadOnly: ${isReadOnly ? 'On' : 'Off'}`}
              </Button>
              <Button size="sm" isBlock onTap={() => setLimitRange(v => !v)}>
                {`min/maxValue: ${minValue.toString()}-${maxValue.toString()} ${limitRange ? 'On' : 'Off'}`}
              </Button>
              <Button size="sm" isBlock onTap={() => setDisableWeekend(v => !v)}>
                {`isDateUnavailable: Disabled weekends ${disableWeekend ? 'On' : 'Off'}`}
              </Button>
            </Box>
          </Section>
          <DrawerFooter>
            <Button color="danger" variant="text" isBlock onTap={() => setIsSetsOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Page>
  )
}
