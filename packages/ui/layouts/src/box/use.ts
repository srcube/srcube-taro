import type { BoxVariantsProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import { box } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import { useCallback, useMemo } from 'react'

interface Props {
  ref?: ReactRef
}

export type UseBoxProps = Props &
  Omit<NativeProps<ViewProps>, keyof BoxVariantsProps> &
  BoxVariantsProps

export function useBox(props: UseBoxProps) {
  const { ref, className, children, onTap, ...rest } = props

  const Component = View

  const styles = useMemo(
    () =>
      box({
        className,
      }),
    [className],
  )

  const getBoxProps = useCallback((): ViewProps => {
    return {
      ref,
      className: styles,
      onClick: onTap,
      ...rest,
    }
  }, [styles, ref, onTap, rest])

  return {
    Component,
    domRef: ref,
    children,
    getBoxProps,
  }
}

export type UseBoxReturn = ReturnType<typeof useBox>
