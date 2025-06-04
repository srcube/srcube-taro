import type { StackVariantsProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { BoxProps } from '../box'
import { stack } from '@srcube-taro/theme'
import { useCallback, useMemo } from 'react'
import { Box } from '../box'

interface Props {
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

export type UseStackProps = Props &
  Omit<BoxProps, keyof StackVariantsProps> &
  StackVariantsProps

export function useStack(props: UseStackProps) {
  const { ref, className, children, direction, spacing, align, justify, ...rest } = props

  const Component = Box

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
