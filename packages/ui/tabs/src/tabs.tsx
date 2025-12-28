import type { TaroElement } from '@tarojs/runtime'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import type { UseTabsProps } from './use'

import { Skeleton } from '@srcube-taro/ui'
import { ScrollView, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { Tab } from './_tab'
import { TabPanel } from './tab-panel'
import { useTabs } from './use'

export interface TabsProps<T extends object = object> extends UseTabsProps<T> {}

const Tabs = forwardRef(<T extends object>(
  props: TabsProps<T>,
  ref: ForwardedRef<TaroElement>,
) => {
  const {
    domRef,
    slots,
    styles,
    state,
    values,
    masks,
    isMeasured,
    classNames,
    getBaseProps,
    getScrollViewProps,
  } = useTabs<T>({
    ...props,
    ref,
  })

  const tabsItems = [...state.collection].map((item, i) => (
    <Skeleton
      key={item.key}
      isLoaded={isMeasured}
      radius="none"
      className={slots.skeleton({ class: classNames?.skeleton })}
      // To solve the scrollview horizontal offset issue
      style={{ position: 'relative', top: props.isVertical ? 0 : 10 }}
    >
      <Tab
        {...item.props}
        key={item.key}
        index={i}
        item={item}
        values={values}
        isMeasured={isMeasured}
      />
    </Skeleton>
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
}) as <T extends object = object>(props: TabsProps<T> & { ref?: Ref<TaroElement> }) => ReactElement

export default Tabs
