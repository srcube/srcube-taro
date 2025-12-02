import type { TaroElement } from '@tarojs/runtime'
import type { UseTabsProps } from './use'
import { mergeProps } from '@srcube-taro/utils-func'
import { ScrollView, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { Tab } from './tab'
import { TabPanel } from './tab-panel'
import { useTabs } from './use'

export interface TabsProps<T> extends UseTabsProps<T> {}

const Tabs = forwardRef(<T extends object = object>(props: TabsProps<T>, ref: React.Ref<TaroElement>) => {
  const {
    domRef,
    styles,
    state,
    values,
    masks,
    getBaseProps,
    getScrollViewProps,
  } = useTabs<T>({
    ...props,
    ref,
  })

  const tabsItems = [...state.collection].map((item, i) => (
    <Tab
      {...mergeProps(item.props, { style:
        // Fix the scrollview horizontal offset issue
        { position: 'relative', top: props.isVertical ? 0 : 10 } })
      }
      key={item.key}
      item={item}
      values={values}
      index={i}
    />
  ))

  const hasPanels = [...state.collection].some(p => !!p?.props?.children)

  return (
    <View
      ref={domRef}
      className={styles.base}
      {...getBaseProps()}
    >
      <View className={styles.tabsWrapper}>
        <View className={masks.start ? styles.maskStart : ''} />
        <ScrollView {...getScrollViewProps()}>
          {tabsItems}
        </ScrollView>
        <View className={masks.end ? styles.maskEnd : ''} />
      </View>
      {hasPanels && (
      //  Fix layout structure change effect take the scrollview scroll to start position error
        <View>
          {[...state.collection].map(p => (
            <TabPanel
              key={`panel-${p.key}`}
              tabKey={p.key}
              state={values.state}
              slots={values.slots}
              destroyInactiveTabPanel
            />
          ))}
        </View>
      )}
    </View>
  )
})

Tabs.displayName = 'Srcube.Tabs'

export default Tabs
