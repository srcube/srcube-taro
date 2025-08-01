import type { BoxVariantsProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import { box } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<ViewProps> {
  ref?: ReactRef
}

export type UseBoxProps = MergeVariantProps<Props, BoxVariantsProps>

export function useBox(props: UseBoxProps) {
  const { ref, className, children, onTap, ...rest } = props

  const domRef = useDOMRef(ref)

  const styles = useMemo(
    () =>
      box({
        className,
      }),
    [className],
  )

  const getBoxProps = useCallback((): ViewProps => {
    return {
      ref: domRef,
      className: styles,
      onClick: onTap,
      ...rest,
    }
  }, [domRef, styles, onTap, rest])

  return {
    domRef,
    children,
    getBoxProps,
  }
}

export type UseBoxReturn = ReturnType<typeof useBox>
