import type { ItemProps } from '@react-types/shared'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode, RefObject } from 'react'
import { Item } from '@react-stately/collections'

interface Props<T extends object = {}> extends Omit<ItemProps<T> & NativeProps<ViewProps>, 'children' | 'title'> {
  /**
   * Tab title
   */
  title?: ReactNode
  /**
   * Tab children
   */
  children?: ReactNode
  /**
   * Whether the tab is disabled
   */
  isDisabled?: boolean
  /**
   * Ref to the tab element
   */
  tabRef?: RefObject<ViewProps>
}

export type TabBaseProps<T extends object = {}> = Props<T>

const TabBase = Item as <T extends object>(props: TabBaseProps<T>) => JSX.Element

export default TabBase
