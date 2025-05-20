import type { StackVariantsProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import { stack } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import { useCallback, useMemo } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<ViewProps>
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * Spacing between items
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * Alignment of the items
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /**
   * Justify of the content
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

export type UseStackProps = Props &
  Omit<NativeProps<ViewProps>, keyof StackVariantsProps> &
  StackVariantsProps

export function useStack(props: UseStackProps) {
  const { ref, className, children, direction, spacing, align, justify, ...rest } = props

  const Component = View

  const styles = useMemo(
    () =>
      stack({
        direction,
        spacing,
        align,
        justify,
        className,
      }),
    [direction, spacing, align, justify, className],
  )

  const getStackProps = useCallback(() => {
    return {
      className: styles,
      ...rest,
    }
  }, [styles, rest])

  return {
    Component,
    domRef: ref,
    children,
    getStackProps,
  }
}
