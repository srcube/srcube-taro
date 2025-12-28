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

export type TabProps<T extends object = {}> = Props<T>

const Tab = Item as <T extends object>(props: TabProps<T>) => JSX.Element

export default Tab
