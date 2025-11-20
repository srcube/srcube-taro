import type { SwitchProps } from '@srcube-taro/ui'
import { Switch } from '@srcube-taro/ui'
import { Switch as NSwitch, View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { Page } from '@/components/page'
import { Section } from '@/components/section'

function SunIcon({ className }: { className?: string }) {
  return <View className={`${className} text-yellow-500`}>☀️</View>
}

function MoonIcon({ className }: { className?: string }) {
  return <View className={`${className} text-blue-500`}>🌙</View>
}

function CheckIcon({ className }: { className?: string }) {
  return <View className={`${className} text-green-500`}>✓</View>
}

function XIcon({ className }: { className?: string }) {
  return <View className={`${className} text-red-500`}>✕</View>
}

export default function Switchs() {
  const colors: Array<SwitchProps['color']> = ['default', 'primary', 'secondary', 'success', 'warning', 'danger']
  const sizes: Array<SwitchProps['size']> = ['xs', 'sm', 'md', 'lg']
  const radius: Array<SwitchProps['radius']> = ['none', 'xs', 'sm', 'md', 'lg', 'full']

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
      <Section title="Colors" contentClass="grid grid-cols-2 gap-2">
        {colors.map(c => <Switch key={c} defaultSelected color={c}>{capitalize(c)}</Switch>)}
      </Section>
      <Section title="Sizes" contentClass="grid grid-cols-2 gap-2">
        {sizes.map(s => <Switch key={s} size={s}>{s?.toUpperCase()}</Switch>)}
      </Section>
      <Section title="Radius" contentClass="grid grid-cols-2 gap-2">
        {radius.map(r => <Switch key={r} radius={r}>{r?.toUpperCase()}</Switch>)}
      </Section>
      <Section title="Content" contentClass="grid grid-cols-2 gap-2">
        <Switch
          defaultSelected
          startContent={<View className="i-[ic--twotone-check] w-3 h-3" />}
          endContent={<View className="i-[ic--twotone-close] w-3 h-3" />}
        >
          Icons
        </Switch>
        <Switch
          color="success"
          defaultSelected
          startContent={<View className="i-[mingcute--sun-fill] w-3 h-3" />}
          endContent={<View className="i-[mingcute--moon-fill] w-3 h-3" />}
        >
          Theme
        </Switch>
        <Switch
          color="warning"
          defaultSelected
          startContent={<View className="i-[mdi--volume-high] w-3 h-3" />}
          endContent={<View className="i-[mdi--volume-off] w-3 h-3" />}
        >
          Sound
        </Switch>
      </Section>
      <Section title="Thumb Icon" contentClass="grid grid-cols-2 gap-2">
        <Switch
          defaultSelected
          color="primary"
          thumbIcon={({ isSelected }) => (isSelected ? <SunIcon /> : <MoonIcon />)}
        >
          Theme
        </Switch>
        <Switch
          color="success"
          thumbIcon={({ isSelected }) => (isSelected ? <CheckIcon /> : <XIcon />)}
        >
          Status
        </Switch>
      </Section>
      <Section title="Read Only" contentClass="grid grid-cols-2 gap-2">
        <Switch isReadOnly>Read only</Switch>
        <Switch defaultSelected isReadOnly>Read only</Switch>
      </Section>
      <Section title="Disabled" contentClass="grid grid-cols-2 gap-2">
        {colors.map(c => <Switch key={c} defaultSelected isDisabled color={c}>{capitalize(c)}</Switch>)}
      </Section>
      <Section title="Loading" contentClass="grid grid-cols-2 gap-2">
        {colors.map(c => <Switch key={c} defaultSelected isLoading color={c}>{capitalize(c)}</Switch>)}
        <Switch color="primary" onTap={handleAuto}>Auto</Switch>
      </Section>
      <Section title="Controlled" contentClass="flex flex-col gap-4">
        <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">Switch supports controlled state with `isSelected` and `onValueChange` properties.</View>
        </View>
      </Section>
      <Section title="Native">
        <NSwitch
          checked
          onClick={(e) => { console.log('CLICK: ', e) }}
          onChange={(e) => { console.log('CHANGE: ', e) }}
        >
          Native Switch
        </NSwitch>
      </Section>
    </Page>
  )
}
