import type { BoxProps } from '@srcube-taro/box'
import type { StackVariantsProps } from '@srcube-taro/theme'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import { stack } from '@srcube-taro/theme'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<BoxProps> {
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

export type UseStackProps = MergeVariantProps<Props, StackVariantsProps>

export function useStack(props: UseStackProps) {
  const { className, children, direction, spacing, align, justify, ...rest } = props

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

  const getStackProps = useCallback((): BoxProps => {
    return {
      className: styles,
      ...rest,
    }
  }, [styles, rest])

  return {
    children,
    getStackProps,
  }
}
