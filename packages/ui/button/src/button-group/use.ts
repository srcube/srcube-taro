import type { ButtonGroupVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactElement } from 'react'
import type { ButtonProps } from '../button'
import { buttonGroup } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import { useCallback, useMemo } from 'react'

type OmitNativeKeys = ''

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps['isDisabled']
  /**
   * Button components as children
   * Only Button components are allowed
   */
  children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[]
}

export type PickButtonProps = Pick<ButtonProps, 'size' | 'radius' | 'color' | 'variant' | 'fullWidth' | 'isDisabled' | 'isIcon' | 'isLoading'>

export type ContextType = PickButtonProps

export type UseButtonGroupProps = MergeVariantProps<Props, ButtonGroupVariantProps> & Partial<PickButtonProps>

export function useButtonGroup(props: UseButtonGroupProps) {
  const {
    ref,
    color = 'default',
    variant = 'solid',
    size = 'md',
    radius = 'md',
    isLoading = false,
    isDisabled = false,
    isIcon = false,
    fullWidth,
    className,
    children,
    ...rest
  } = props

  const Component = View

  const styles = useMemo(
    () => buttonGroup({
      fullWidth,
      className,
    }),
    [className, fullWidth],
  )

  const context = useMemo<ContextType>(() => ({
    size,
    radius,
    color,
    variant,
    fullWidth,
    isDisabled,
    isIcon,
    isLoading,
  }), [size, radius, color, variant, fullWidth, isDisabled, isIcon, isLoading])

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
