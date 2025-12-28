import type { StandardProps, ViewProps } from '@tarojs/components'
import type { Key, ReactElement, ReactNode } from 'react'

/**
 * Component base props definition
 *
 * @param T Native component props
 */
export type NativeProps<T extends StandardProps<any> = StandardProps<ViewProps>> = Omit<
  T,
'onClick' | 'onLongClick'
> & {
  onTap?: T['onClick']
  onLongTap?: T['onLongClick']
}

export interface CollectionProps<T> {
  /**
   * The items in the collection.
   */
  items?: T[]
  /**
   * The contents of the collection.
   */
  children?: ReactNode | ((item: T) => ReactElement)
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.
   */
  disabledKeys?: Iterable<Key>
}

/**
 * Combine the component props and variant props
 *
 * @param P Base props
 * @param V Variant props
 * @param E Exclude keys
 */
export type MergeVariantProps<P, V, E extends keyof V = never> = Omit<P, keyof V> & Omit<V, E>

/**
 * Omit the `children` prop from the component props
 *
 * @param T Component props
 */
export type PropsWithoutChildren<T> = Omit<T, 'children'>
