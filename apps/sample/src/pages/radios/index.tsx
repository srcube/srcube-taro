import type { RadioProps } from '@srcube-taro/ui'
import { Radio, RadioGroup } from '@srcube-taro/ui'
import { Radio as NRadio, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

export default function Radios() {
  const colors: Array<NonNullable<RadioProps['color']>> = ['default', 'primary', 'success', 'warning', 'danger']
  const sizes: Array<NonNullable<RadioProps['size']>> = ['xs', 'sm', 'md', 'lg']

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
        <RadioGroup defaultValue="default">
          {colors.map(c => <Radio key={c} value={c} color={c}>{capitalize(c)}</Radio>)}
        </RadioGroup>
      </Section>
      <Section title="Sizes" contentClass="grid grid-cols-4 gap-2">
        <RadioGroup defaultValue="xs">
          {sizes.map(s => <Radio key={s} value={s} size={s}>{s.toUpperCase()}</Radio>)}
        </RadioGroup>
      </Section>
      <Section title="Icon" contentClass="grid grid-cols-3 gap-2">
        <RadioGroup defaultValue="circle">
          <Radio
            value="circle"
            icon={<View className="i-[ic--twotone-circle] w-inherit h-inherit" />}
          >
            Circle
          </Radio>
          <Radio
            value="star"
            color="primary"
            icon={<View className="i-[ph--star-fill] w-inherit h-inherit" />}
          >
            Star
          </Radio>
          <Radio
            value="heart"
            color="success"
            icon={<View className="i-[mingcute--heart-fill] w-inherit h-inherit" />}
          >
            Heart
          </Radio>
          <Radio
            value="flower"
            color="warning"
            icon={<View className="i-[streamline--flower-solid] w-inherit h-inherit" />}
          >
            Flower
          </Radio>
          <Radio
            value="diamond"
            color="danger"
            icon={<View className="i-[mdi--diamond] w-inherit h-inherit" />}
          >
            Diamond
          </Radio>
        </RadioGroup>
      </Section>
      <Section title="Read Only" contentClass="grid grid-cols-2 gap-2">
        <RadioGroup>
          <Radio isReadOnly>Read only</Radio>
          <Radio defaultSelected isReadOnly>Read only</Radio>
        </RadioGroup>
      </Section>
      <Section title="Disabled" contentClass="grid grid-cols-3 gap-2">
        <RadioGroup>
          {colors.map(c => <Radio key={c} defaultSelected isDisabled color={c}>{capitalize(c)}</Radio>)}
        </RadioGroup>
      </Section>
      <Section title="Loading" contentClass="grid grid-cols-3 gap-2">
        <RadioGroup defaultValue="default">
          {colors.map(c => <Radio key={c} value={c} color={c} onTap={handleAuto}>{capitalize(c)}</Radio>)}
        </RadioGroup>
      </Section>
      <Section title="Radio Group" contentClass="flex flex-col gap-4">
        <RadioGroup defaultValue="1" color="default">
          <Radio value="1">Vertical 1</Radio>
          <Radio value="2" isDisabled>Vertical 2</Radio>
          <Radio value="3">Vertical 3</Radio>
        </RadioGroup>
        <RadioGroup defaultValue="1" orientation="horizontal">
          <Radio value="1">Horizontal 1</Radio>
          <Radio value="2">Horizontal 2</Radio>
        </RadioGroup>
      </Section>
      <Section title="Controlled" contentClass="flex flex-col gap-4">
        <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">Radio supports controlled state with `value` and `onValueChange` properties.</View>
        </View>
      </Section>
      <Section title="Native">
        <NRadio
          value="1"
          onClick={(e) => { console.log('CLICK: ', e) }}
          onChange={(e) => { console.log('CHANGE: ', e) }}
        >
          Native Radio
        </NRadio>
      </Section>
    </Page>
  )
}
