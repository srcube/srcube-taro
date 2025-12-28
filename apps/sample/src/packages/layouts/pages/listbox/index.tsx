import { faker } from '@faker-js/faker'
import { Button, Listbox, ListboxItem } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useState } from 'react'
import { Page, Section } from '@/components'

const virtualizerOptions = {
  paddingStart: 10,
  paddingEnd: 10,
  gap: 10,
}

export default function ListboxPage() {
  const thousand = Array.from({ length: 1000 }, (_, i) => ({ key: i, value: i + 1 }))
  const xyThousand = Array.from({ length: 500 }, (_, i) => ({ key: i, items: Array.from({ length: 10 }, (_, j) => ({ key: j, value: j })) }))

  const [isHorizontal, setIsHorizontal] = useState(false)
  const [hideMask, setHideMask] = useState(false)

  return (
    <Page>
      <Section title="Static" contentClass="flex flex-col gap-2">
        <Listbox
          className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
          virtualizerOptions={virtualizerOptions}
        >
          {thousand.map(item => (
            <ListboxItem
              key={item.key}
              className="flex items-center mx-2 px-3 py-2 h-fit rounded-md bg-white"
            >
              Item {item.value} {faker.lorem.sentence()}
            </ListboxItem>
          ))}
        </Listbox>
      </Section>

      <Section title="Dynamic" contentClass="flex flex-col gap-2">
        <Listbox
          items={thousand}
          className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
          virtualizerOptions={virtualizerOptions}
        >
          {item => (
            <ListboxItem key={item.key} className="flex items-center mx-2 px-3 py-2 h-12 rounded-md bg-white">
              Item {item.value}
            </ListboxItem>
          )}
        </Listbox>
      </Section>

      <Section title="Orientation">
        <Listbox
          items={thousand}
          orientation="x"
          className="relative w-full h-12 overflow-hidden rounded-lg bg-gray-100"
          virtualizerOptions={virtualizerOptions}
        >
          {item => (
            <ListboxItem key={item.key} className="inline-flex justify-center items-center my-2 px-3 py-2 rounded-md bg-white">
              Item {item.value}
            </ListboxItem>
          )}
        </Listbox>
      </Section>

      <Section title="Virtualization" contentClass="flex flex-col gap-2">
        <View className="flex gap-2 p-2 rounded-xl border-4 border-primary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">Listbox is automatic virtualized and row height is dynamic measured.</View>
        </View>
      </Section>

      <Section title="Virtualized Orientation" contentClass="flex flex-col gap-2">
        <Listbox
          key={isHorizontal ? 'horizontal' : 'vertical'}
          items={[...xyThousand]}
          orientation="xy"
          hideMask={hideMask}
          virtualizerOptions={{ ...virtualizerOptions, horizontal: isHorizontal }}
          className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
        >
          {row => (
            <ListboxItem
              key={row.key}
              className={cn('flex justify-center items-center gap-2', isHorizontal ? 'flex-col py-2 h-max' : 'flex-row px-2 w-max', `${isHorizontal}`)}
            >
              {row.items.map(item => (
                <View key={item.key} className="inline-flex justify-center items-center p-2 w-24 rounded-md bg-white">
                  {isHorizontal ? `R${item.key + 1}:C${row.key + 1}` : `R${row.key + 1}:C${item.key + 1}`}
                </View>
              ))}
            </ListboxItem>
          )}
        </Listbox>
        <Button color="default" fullWidth onTap={() => setIsHorizontal(!isHorizontal)}>
          To {isHorizontal ? 'vertical' : 'horizontal'} virtualized
        </Button>
        <Button
          color={hideMask ? 'primary' : 'default'}
          onTap={() => setHideMask(!hideMask)}
        >
          Hide Mask
        </Button>
      </Section>
    </Page>
  )
}
