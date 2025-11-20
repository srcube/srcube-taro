import { Box, Button, Textarea } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { useState } from 'react'
import { Page, Section } from '@/components'

const colors = ['default', 'primary', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export default function Textareas() {
  const [value, setValue] = useState<string | undefined>('Controlled value')

  return (
    <Page>
      <Section title="Basic" contentClass="space-y-2">
        {colors.map(color => (
          <Textarea key={color} defaultValue={capitalize(color)} color={color} autoHeight placeholder="Please input" />
        ))}
      </Section>
      <Section title="Sizes" contentClass="space-y-2">
        {sizes.map(size => (
          <Textarea key={size} defaultValue={capitalize(size)} size={size} autoHeight placeholder="Please input" />
        ))}
      </Section>
      <Section title="Disabled" contentClass="space-y-2">
        <Textarea defaultValue="Disabled" isDisabled placeholder="Please input" />
      </Section>
      <Section title="Controlled" contentClass="space-y-2">
        <Box className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">Textarea supports controlled state with `value` and `onValueChange`.</View>
        </Box>
        <Textarea value={value} onValueChange={setValue} placeholder="Please input" />
        <Button size="sm" isBlock className="mt-2" onTap={() => setValue('Updated value')}>Set Value</Button>
      </Section>
      <Section title="Slots" contentClass="space-y-2">
        <Textarea
          isClearable
          defaultValue="With start/end content and clear"
          placeholder="Please input"
        />
      </Section>
    </Page>
  )
}
