import { Button, Scrollbox } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import { useState } from 'react'
import { Page, Section } from '@/components'

const list = Array.from({ length: 60 }, (_, i) => i + 1)

export default function ScrollboxPage() {
  const [hideMask, setHideMask] = useState(false)

  return (
    <Page>
      <Section title="Vertical" contentClass="flex flex-col gap-2">
        <Scrollbox
          className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
          classNames={{ content: 'flex flex-col gap-2 p-2' }}
        >
          {list.map(i => (
            <View key={`v-${i}`} className="px-3 py-2 rounded-md bg-white">
              Item {i}
            </View>
          ))}
        </Scrollbox>
      </Section>

      <Section title="Horizontal" contentClass="flex flex-col gap-2">
        <Scrollbox
          orientation="x"
          className="relative w-full h-fit overflow-hidden rounded-lg bg-gray-100"
          classNames={{ content: 'flex flex-row gap-2 p-2' }}
        >
          {list.slice(0, 20).map(i => (
            <View key={`h-${i}`} className="flex-shrink-0 inline-flex items-center justify-center px-2 size-8 rounded-md bg-white">
              {i}
            </View>
          ))}
        </Scrollbox>
      </Section>

      <Section title="Vertical & Horizontal" contentClass="flex flex-col gap-2">
        <Scrollbox
          orientation="xy"
          hideMasks={hideMask}
          className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
          classNames={{ content: 'grid grid-cols-10 gap-2 p-2' }}
        >
          {list.map(i => (
            <View key={`xy-${i}`} className="flex items-center justify-center w-24 p-2 rounded-md bg-white">
              Item {i}
            </View>
          ))}
        </Scrollbox>
        <Button
          color={hideMask ? 'primary' : 'default'}
          onTap={() => setHideMask(v => !v)}
        >
          Hide Mask
        </Button>
      </Section>
    </Page>
  )
}
