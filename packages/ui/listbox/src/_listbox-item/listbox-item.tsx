import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'

export interface ListboxItemProps<T> extends NativeProps<ViewProps> {
  item: T
  children?: React.ReactNode
}

/**
 * ! INTERNAL COMPONENT
 */
export const ListboxItem = forwardRef<TaroElement, ListboxItemProps<any>>((props, ref) => {
  const { className, children, item, ...rest } = props

  return (
    <View ref={ref} className={className} {...rest}>
      {children}
    </View>
  )
})

ListboxItem.displayName = 'Srcube.ListboxItem'
