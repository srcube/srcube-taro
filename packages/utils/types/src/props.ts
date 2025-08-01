import type { StandardProps } from '@tarojs/components'

/**
 * Component base props definition
 *
 * @param T Native component props
 */
export type NativeProps<T extends StandardProps = StandardProps> = Omit<
  T,
'onClick' | 'onLongClick'
> & {
  onTap?: T['onClick']
  onLongTap?: T['onLongClick']
}

/**
 * Combine the component props and variant props
 *
 * @param P Base props
 * @param V Variant props
 * @param E Exclude keys
 */
export type MergeVariantProps<P, V, E extends keyof V = never> = Omit<P, keyof V> & Omit<V, E>
