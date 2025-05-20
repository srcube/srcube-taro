import type { StandardProps } from '@tarojs/components'

export type NativeProps<T extends StandardProps = StandardProps> = Omit<
  T,
'onClick' | 'onLongClick'
> & {
  onTap?: T['onClick']
  onLongTap?: T['onLongClick']
}
