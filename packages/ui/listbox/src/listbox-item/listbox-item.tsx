import type { ItemProps } from '@react-types/shared'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { Item } from '@react-stately/collections'

interface Props<T extends object = {}> extends Omit<ItemProps<T> & NativeProps<ViewProps>, 'children' | 'title'> {
  /**
   * The content of the component.
   */
  children?: ReactNode
  /**
   * The title of the component.
   */
  title?: ReactNode
  /**
   * Whether the item is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the item is read only.
   * @default false
   */
  isReadOnly?: boolean
}

export type ListboxItemProps<T extends object = {}> = Props<T>

// Define a wrapper to intercept getCollectionNode
function SrcubeListboxItem(_props: ListboxItemProps<any>) {
  return <></>
}

// Attach the getCollectionNode static method
SrcubeListboxItem.getCollectionNode = function* (props: any, context: any) {
  // Suppress "textValue" warning for Taro environment where type-to-select is not primary
  const newContext = { ...context, suppressTextValueWarning: true }

  // Delegate to the original Item implementation
  // We cast to any because getCollectionNode is hidden from the public type definition
  yield* (Item as any).getCollectionNode(props, newContext)
}

const ListboxItem = SrcubeListboxItem as <T extends object>(props: ListboxItemProps<T>) => JSX.Element

export default ListboxItem
