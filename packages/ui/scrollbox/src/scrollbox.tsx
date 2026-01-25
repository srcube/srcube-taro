import type { TaroElement } from '@tarojs/runtime'
import type { UseScrollboxProps } from './use'
import { ScrollView, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useScrollbox } from './use'

export interface ScrollboxProps extends UseScrollboxProps {}

const Scrollbox = forwardRef<TaroElement, ScrollboxProps>((props: ScrollboxProps, ref: React.Ref<TaroElement>) => {
  const {
    domRef,
    slots,
    children,
    classNames,
    getWrapperProps,
    getScrollViewProps,
    getContentProps,
  } = useScrollbox({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      <View className={slots.maskTop({ class: [classNames?.maskTop] })} />
      <View className={slots.maskBottom({ class: [classNames?.maskBottom] })} />
      <View className={slots.maskLeft({ class: [classNames?.maskLeft] })} />
      <View className={slots.maskRight({ class: [classNames?.maskRight] })} />
      <ScrollView ref={domRef} {...getScrollViewProps()}>
        <View {...getContentProps()}>
          {children}
        </View>
      </ScrollView>
    </View>
  )
})

Scrollbox.displayName = 'Srcube.Scrollbox'

export default Scrollbox
