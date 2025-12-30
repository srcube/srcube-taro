import type { ListboxProps } from '@srcube-taro/ui'
import { faker } from '@faker-js/faker'
import { Button, ButtonGroup, Listbox, ListboxItem } from '@srcube-taro/ui'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { findIndex, groupBy } from 'lodash-es'
import { useCallback, useMemo, useState } from 'react'
import { useMutative } from 'use-mutative'
import { Page, Section } from '@/components'

export default function ListboxPage() {
  return (
    <Page>
      <EmptySample />
      <StaticDynamicSample />
      <StickySample />
      <OrientationSample />
      <VirtualizedOrientationSample />

      <Section title="Virtualization" contentClass="flex flex-col gap-2">
        <View className="flex gap-2 p-2 rounded-xl border-4 border-pirmary-500 bg-primary-50">
          <View className="flex-shrink-0 i-[mage--stars-c-fill] size-4 text-primary-500" />
          <View className="text-sm text-gray-800">
            Listbox is automatic virtualized and row height is dynamic measured.
            Virtualization use `@srcube-taro/hooks/use-virtualizer` implement by `@tanstack/virtual-core`.
          </View>
        </View>
      </Section>
    </Page>
  )
}

const virtualizerOptions = {
  paddingStart: 10,
  paddingEnd: 10,
  gap: 10,
}

/**
 * Empty sample
 */
function EmptySample() {
  // const [orientation, setOrientation] = useState<ScrollboxProps['orientation']>('y')

  const [props, setProps] = useMutative<{
    orientation: ListboxProps<any>['orientation']
    locale: ListboxProps<any>['locale']
  }>({
    orientation: 'y',
    locale: 'en',
  })

  const color = (key: keyof typeof props, value: string) => (props[key] === value ? 'primary' : 'default')

  const handleChangeProps = useCallback((key: keyof typeof props, value: any) => {
    setProps((draft) => {
      draft[key] = value
    })
  }, [setProps])

  return (
    <Section title="Empty Content" contentClass="flex flex-col gap-2">
      <Listbox
        items={[] as { key: number, value: number }[]}
        orientation={props.orientation}
        locale={props.locale}
        className="relative w-full h-28 overflow-hidden rounded-lg bg-gray-100"
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem key={item.key} className="flex items-center mx-2 px-3 py-2 h-fit rounded-md bg-white">
            Item {item.value}
          </ListboxItem>
        )}
      </Listbox>
      <ButtonGroup fullWidth size="sm">
        <Button color={color('orientation', 'x')} onTap={() => handleChangeProps('orientation', 'x')}>X</Button>
        <Button color={color('orientation', 'y')} onTap={() => handleChangeProps('orientation', 'y')}>Y</Button>
        <Button color={color('orientation', 'xy')} onTap={() => handleChangeProps('orientation', 'xy')}>XY</Button>
      </ButtonGroup>
      {/* langs */}
      <ButtonGroup fullWidth size="sm">
        <Button color={color('locale', 'en')} onTap={() => handleChangeProps('locale', 'en')}>EN</Button>
        <Button color={color('locale', 'zh-CN')} onTap={() => handleChangeProps('locale', 'zh-CN')}>中文</Button>
        <Button color={color('locale', 'zh-TW')} onTap={() => handleChangeProps('locale', 'zh-TW')}>中文（台湾）</Button>
      </ButtonGroup>
    </Section>
  )
}

/**
 * Static sample
 */
function StaticDynamicSample() {
  const thousand = useMemo(() => Array.from({ length: 1000 }, (_, i) => ({ key: i, value: i + 1 })), [])
  return (
    <Section title="Static & Dynamic" contentClass="flex flex-col gap-2">
      <Listbox
        className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
        virtualizerOptions={virtualizerOptions}
      >
        {thousand.map(item => (
          <ListboxItem
            key={item.key}
            className="flex items-center mx-2 px-3 py-2 h-fit rounded-md bg-white"
          >
            Item {item.value}
          </ListboxItem>
        ))}
      </Listbox>
      <Listbox
        items={thousand}
        className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem key={item.key} className="flex items-center mx-2 px-3 py-2 h-fit rounded-md bg-white">
            Item {item.value}
          </ListboxItem>
        )}
      </Listbox>
    </Section>
  )
}

/**
 * Sticky sample
 */
function StickySample() {
  const virtualizerOptions = {
    paddingEnd: 50,
    gap: 10,
  }

  const names = Array.from({ length: 200 }, () => faker.person.firstName())

  const groupedNames = useMemo(() => groupBy(
    Array.from({ length: 200 })
      .map(() => names[Math.floor(Math.random() * names.length)])
      .sort(),
    name => name[0],
  ), [names])
  const groups = useMemo(() => Object.keys(groupedNames), [groupedNames])
  const rows = useMemo(() => groups.reduce<Array<string>>(
    (acc, k) => [...acc, k, ...groupedNames[k]],
    [],
  ), [groups, groupedNames])

  const stickyIndexes = useMemo(
    () => groups.map(gn => findIndex(rows, n => n === gn)),
    [groups, rows],
  )

  const isSticky = useCallback((index: number) => stickyIndexes.includes(index), [stickyIndexes])

  const items = useMemo(() => rows.map((row, index) => ({
    key: index,
    value: row,
  })), [rows])

  return (
    <Section title="Sticky" contentClass="flex flex-col gap-2">
      <Listbox
        items={items}
        className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
        stickyIndices={stickyIndexes}
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem
            key={item.key}
            className={cn(
              'flex items-center px-3 py-2 h-fit',
              isSticky(Number(item.key)) ? 'bg-white font-bold border-b border-gray-200' : 'mx-2 rounded-md bg-white',
            )}
          >
            {item.value}
          </ListboxItem>
        )}
      </Listbox>
      <Listbox
        items={items}
        orientation="x"
        className="relative w-full h-12 overflow-hidden rounded-lg bg-gray-100"
        stickyIndices={stickyIndexes}
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem
            key={item.key}
            className={cn(
              'flex items-center px-3 py-2 w-fit',
              isSticky(Number(item.key)) ? 'bg-white font-bold border-b border-gray-200' : 'my-2 rounded-md bg-white',
            )}
          >
            {item.value}
          </ListboxItem>
        )}
      </Listbox>
    </Section>
  )
}

function OrientationSample() {
  const thousand = useMemo(() => Array.from({ length: 1000 }, (_, i) => ({ key: i, value: i + 1 })), [])
  return (
    <Section title="Orientation" contentClass="flex flex-col gap-2">
      <Listbox
        items={thousand}
        orientation="y"
        className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem key={item.key} className="inline-flex justify-center items-center mx-2 px-3 py-2 rounded-md bg-white">
            Y Item {item.value}
          </ListboxItem>
        )}
      </Listbox>
      <Listbox
        items={thousand}
        orientation="x"
        className="relative w-full h-12 overflow-hidden rounded-lg bg-gray-100"
        virtualizerOptions={virtualizerOptions}
      >
        {item => (
          <ListboxItem key={item.key} className="inline-flex justify-center items-center my-2 px-3 py-2 rounded-md bg-white">
            X Item {item.value}
          </ListboxItem>
        )}
      </Listbox>
    </Section>
  )
}

function VirtualizedOrientationSample() {
  const xyThousand = useMemo(() => Array.from({ length: 500 }, (_, i) => ({ key: i, items: Array.from({ length: 10 }, (_, j) => ({ key: j, value: j })) })), [])

  const [isHorizontal, setIsHorizontal] = useState(false)
  const [hideMasks, setHideMasks] = useState(false)

  return (
    <Section title="Virtualized Orientation" contentClass="flex flex-col gap-2">
      <Listbox
        key={isHorizontal ? 'horizontal' : 'vertical'}
        items={[...xyThousand]}
        orientation="xy"
        hideMasks={hideMasks}
        virtualizerOptions={{ ...virtualizerOptions, horizontal: isHorizontal }}
        className="relative w-full h-40 overflow-hidden rounded-lg bg-gray-100"
      >
        {row => (
          <ListboxItem
            key={row.key}
            className={cn('flex justify中心 items-center gap-2', isHorizontal ? 'flex-col py-2 h-max' : 'flex-row px-2 w-max', `${isHorizontal}`)}
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
        color={hideMasks ? 'primary' : 'default'}
        onTap={() => setHideMasks(!hideMasks)}
      >
        Hide Mask
      </Button>
    </Section>
  )
}
