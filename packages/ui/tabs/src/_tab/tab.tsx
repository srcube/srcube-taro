import type { TaroElement } from '@tarojs/runtime'
import type { UseTabProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useTab } from './use'

export interface TabProps<T extends object = object> extends UseTabProps<T> {}

const Tab = forwardRef<TaroElement, TabProps>((props, ref) => {
  const {
    domRef,
    isSelected,
    getTabProps,
    getTabContentProps,
    getCursorProps,
  } = useTab({ ...props, ref })

  return (
    <View ref={domRef} {...getTabProps()}>
      {isSelected && <View {...getCursorProps()} />}
      <View {...getTabContentProps()}>{props.item.rendered}</View>
    </View>
  )
})

Tab.displayName = 'Srcube.Tab'

export default Tab
