import type { ButtonGroupVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { ButtonProps } from '../button'
import { buttonGroup } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import { useCallback, useMemo } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps['isDisabled']
}

export type PickButtonProps = Pick<ButtonProps, 'size' | 'color' | 'variant' | 'isDisabled' | 'isIcon' | 'isBlock' | 'isLoading'>

export type ContextType = PickButtonProps

export type OmittedVariantProps = Omit<NativeProps<ViewProps>, keyof ButtonGroupVariantProps>

export type UseButtonGroupProps = Props & OmittedVariantProps & ButtonGroupVariantProps & Partial<PickButtonProps>

export function useButtonGroup(props: UseButtonGroupProps) {
  const {
    ref,
    color = 'default',
    variant = 'solid',
    size = 'md',
    isLoading = false,
    isDisabled = false,
    isIcon = false,
    isBlock,
    className,
    children,
    ...rest
  } = props

  const Component = View

  const styles = useMemo(
    () => buttonGroup({
      isBlock,
      className,
    }),
    [className, isBlock],
  )

  const context = useMemo<ContextType>(() => ({
    size,
    color,
    variant,
    isDisabled,
    isIcon,
    isBlock,
    isLoading,
  }), [size, color, variant, isDisabled, isIcon, isBlock, isLoading])

  const getGroupProps = useCallback((): ViewProps => ({
    role: 'group',
    className: styles,
    ...rest,
  }), [styles, rest])

  return {
    Component,
    domRef: ref,
    context,
    children,
    getGroupProps,
  }
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>
