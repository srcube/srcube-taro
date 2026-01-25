import type { BoxVariantsProps } from '@srcube-taro/theme'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import { box } from '@srcube-taro/theme'
import { useCallback, useMemo } from 'react'

interface Props extends NativeProps<ViewProps> {
}

export type UseBoxProps = MergeVariantProps<Props, BoxVariantsProps>

export function useBox(props: UseBoxProps) {
  const { className, children, onTap, ...rest } = props

  const styles = useMemo(
    () =>
      box({
        className,
      }),
    [className],
  )

  const getBoxProps = useCallback((): ViewProps => {
    return {
      className: styles,
      onClick: onTap,
      ...rest,
    }
  }, [styles, onTap, rest])

  return {
    children,
    getBoxProps,
  }
}

export type UseBoxReturn = ReturnType<typeof useBox>
