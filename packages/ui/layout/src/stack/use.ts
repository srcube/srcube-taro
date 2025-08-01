import type { StackVariantsProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { BoxProps } from '../box'
import { stack } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<BoxProps> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
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
  const { ref, className, children, direction, spacing, align, justify, ...rest } = props

  const domRef = useDOMRef(ref)

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
      ref: domRef,
      className: styles,
      ...rest,
    }
  }, [domRef, styles, rest])

  return {
    domRef: ref,
    children,
    getStackProps,
  }
}
