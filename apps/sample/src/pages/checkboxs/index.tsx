import type { CheckboxProps } from '@srcube-taro/ui'
import { Checkbox, CheckboxGroup } from '@srcube-taro/ui'
import { Checkbox as NCheckbox, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function Checkboxs() {
  const colors: Array<CheckboxProps['color']> = ['default', 'primary', 'success', 'warning', 'danger']
  const sizes: Array<CheckboxProps['size']> = ['xs', 'sm', 'md', 'lg']
  const radius: Array<CheckboxProps['radius']> = ['none', 'xs', 'sm', 'md', 'lg', 'full']

  const handleAuto = async (e) => {
    await new Promise((res) => {
      setTimeout(() => {
        console.log('E: ', e)
        res(true)
      }, 3000)
    })
  }

  return (
    <Page>
      <Section title="Colors" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Checkbox key={c} defaultSelected color={c}>{capitalize(c)}</Checkbox>)}
      </Section>
      <Section title="Sizes" contentClass="grid grid-cols-4 gap-2">
        {sizes.map(s => <Checkbox key={s} size={s}>{s?.toUpperCase()}</Checkbox>)}
      </Section>
      <Section title="Radius" contentClass="grid grid-cols-3 gap-2">
        {radius.map(r => <Checkbox key={r} radius={r}>{r?.toUpperCase()}</Checkbox>)}
      </Section>
      <Section title="Icon" contentClass="grid grid-cols-3 gap-2">
        <Checkbox
          defaultSelected
          icon={<View className="i-[ic--twotone-circle] w-inherit h-inherit" />}
        >
          Check
        </Checkbox>
        <Checkbox
          color="primary"
          defaultSelected
          icon={<View className="i-[ph--flying-saucer-fill] w-inherit h-inherit" />}
        >
          UFO
        </Checkbox>
        <Checkbox
          color="success"
          defaultSelected
          icon={<View className="i-[mingcute--grass-fill]" />}
        >
          Grass
        </Checkbox>
        <Checkbox
          color="warning"
          defaultSelected
          icon={<View className="i-[streamline--flower-solid]" />}
        >
          Flower
        </Checkbox>
        <Checkbox
          color="danger"
          defaultSelected
          icon={<View className="i-[mdi--heart] w-inherit h-inherit" />}
        >
          Heart
        </Checkbox>
      </Section>
      <Section title="Line Through" contentClass="">
        <Checkbox defaultSelected isLineThrough>Line through</Checkbox>
      </Section>
      <Section title="Read Only" contentClass="grid grid-cols-2 gap-2">
        <Checkbox isReadOnly>Read only</Checkbox>
        <Checkbox defaultSelected isReadOnly>Read only</Checkbox>
      </Section>
      <Section title="Indeterminate" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Checkbox key={c} isIndeterminate color={c}>{capitalize(c)}</Checkbox>)}
      </Section>
      <Section title="Disabled" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Checkbox key={c} defaultSelected isDisabled color={c}>{capitalize(c)}</Checkbox>)}
      </Section>
      <Section title="Loading" contentClass="grid grid-cols-3 gap-2">
        {colors.map(c => <Checkbox key={c} defaultSelected isLoading color={c}>{capitalize(c)}</Checkbox>)}
        <Checkbox color="primary" onTap={handleAuto}>Auto</Checkbox>
      </Section>
      <Section title="Checkbox Group" contentClass="flex flex-col gap-4">
        <CheckboxGroup defaultValue={['1', '2']} color="default">
          <Checkbox value="1">Vertical 1</Checkbox>
          <Checkbox value="2">Vertical 2</Checkbox>
          <Checkbox value="3">Vertical 3</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup defaultValue={['1', '2']} orientation="horizontal">
          <Checkbox value="1">Horizontal 1</Checkbox>
          <Checkbox value="2">Horizontal 2</Checkbox>
        </CheckboxGroup>
        <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">Group support checkboxs `color`, `size`, `radius`, `isDisabled` and `isReadOnly` properties.</View>
        </View>
      </Section>
      <Section title="Native">
        <NCheckbox
          value="1"
          onClick={(e) => { console.log('CLICK: ', e) }}
          onChange={(e) => { console.log('CHANGE: ', e) }}
        >Native Checkbox
        </NCheckbox>
      </Section>
    </Page>
  )
}
