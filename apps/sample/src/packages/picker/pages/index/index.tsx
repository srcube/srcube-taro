import { CalendarDate } from '@internationalized/date'
import { Box, Button, Picker, SelectPicker } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { useState } from 'react'
import { Page, Section } from '@/components'

export default function PickerPage() {
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [multiOpen, setMultiOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [spSingleOpen, setSpSingleOpen] = useState(false)
  const [spMultipleOpen, setSpMultipleOpen] = useState(false)

  const [selectorValue, setSelectorValue] = useState<number>(0)
  const [multiSelectorValue, setMultiSelectorValue] = useState<[number, number]>([0, 0])
  const [timeValue, setTimeValue] = useState<string>('12:00')
  const [dateValue, setDateValue] = useState<CalendarDate | undefined>(new CalendarDate(2025, 1, 1))

  const selectorRange = ['Apple', 'Banana', 'Cherry']
  const multiSelectorRange = [
    ['A', 'B', 'C'],
    ['1', '2', '3'],
  ]
  const spOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  const selectItems = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Avocado', value: 'avocado' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blackberry', value: 'blackberry' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Coconut', value: 'coconut' },
    { label: 'Cranberry', value: 'cranberry' },
    { label: 'Date', value: 'date' },
    { label: 'Dragonfruit', value: 'dragonfruit' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
    { label: 'Grapefruit', value: 'grapefruit' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Lemon', value: 'lemon' },
    { label: 'Lime', value: 'lime' },
    { label: 'Mango', value: 'mango' },
    { label: 'Melon', value: 'melon' },
    { label: 'Orange', value: 'orange' },
  ]

  return (
    <Page>
      <Section title="SelectPicker (Single)" contentClass="space-y-2">
        <SelectPicker
          label="Fruit"
          items={selectItems}
          drawerProps={{ className: 'h-[60vh]' }}
          // drawerProps={{ classNames: { content: 'h-[60vh]' } }}
          onChange={() => setSpSingleOpen(false)}
        />
      </Section>

      <Section title="SelectPicker (Multiple)" contentClass="space-y-2">
        <SelectPicker
          label="Fruits"
          selectionMode="multiple"
          isOpen={spMultipleOpen}
          onOpenChange={setSpMultipleOpen}
          items={spOptions}
          onConfirm={() => setSpMultipleOpen(false)}
        />
      </Section>

      {/* <Section title="MultiSelector" contentClass="space-y-2">
        <Picker
          label="Code"
          description="选择两个维度"
          isClearable
          onClear={() => setMultiSelectorValue([0, 0])}
          isOpen={multiOpen}
          onOpenChange={setMultiOpen}
          fieldContent={(
            <View className="p-3 rounded-xl bg-white">
              {multiSelectorRange[0][multiSelectorValue[0]]}-{multiSelectorRange[1][multiSelectorValue[1]]}
            </View>
          )}
        >
          <Box className="grid grid-cols-2 gap-4 p-3">
            <Box className="space-y-2">
              {multiSelectorRange[0].map((it, idx) => (
                <Button key={it} size="sm" onTap={() => setMultiSelectorValue([idx, multiSelectorValue[1]])}>{it}</Button>
              ))}
            </Box>
            <Box className="space-y-2">
              {multiSelectorRange[1].map((it, idx) => (
                <Button key={it} size="sm" onTap={() => setMultiSelectorValue([multiSelectorValue[0], idx])}>{it}</Button>
              ))}
            </Box>
            <Button fullWidth variant="text" onTap={() => setMultiOpen(false)}>关闭</Button>
          </Box>
        </Picker>
      </Section>

      <Section title="Time" contentClass="space-y-2">
        <Picker
          label="Time"
          isClearable
          onClear={() => setTimeValue('')}
          isOpen={timeOpen}
          onOpenChange={setTimeOpen}
          fieldContent={<View className="p-3 rounded-xl bg-white">{timeValue}</View>}
        >
          <Box className="grid grid-cols-4 gap-2 p-3">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map(t => (
              <Button
                key={t}
                size="sm"
                onTap={() => {
                  setTimeValue(t)
                  setTimeOpen(false)
                }}
              >{t}
              </Button>
            ))}
            <Button fullWidth variant="text" onTap={() => setTimeOpen(false)}>关闭</Button>
          </Box>
        </Picker>
      </Section>

      <Section title="Date" contentClass="space-y-2">
        <Picker
          label="Date"
          isClearable
          onClear={() => setDateValue(undefined)}
          isOpen={dateOpen}
          onOpenChange={setDateOpen}
          fieldContent={(
            <View className="p-3 rounded-xl bg-white">
              {dateValue ? `${dateValue.year}-${String(dateValue.month).padStart(2, '0')}-${String(dateValue.day).padStart(2, '0')}` : '请选择日期'}
            </View>
          )}
        >
          <View className="flex flex-col min-h-0">
            <DateCalendar
              value={dateValue}
              onChange={(v) => {
                setDateValue(v)
                setDateOpen(false)
              }}
            />
            <View className="flex-1" />
          </View>
          <Button fullWidth variant="text" onTap={() => setDateOpen(false)}>关闭</Button>
        </Picker>
      </Section> */}

      <Section title="Region" contentClass="space-y-2">
        <Box className="text-sm text-gray-600">本示例省略了区域数据，可根据业务传入完整省市区数组。</Box>
      </Section>
    </Page>
  )
}
