import type { ButtonVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, ButtonProps as NativeButtonProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { button, buttonHover } from '@srcube-taro/theme'
import { withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo, useState } from 'react'
import { useButtonGroupContext } from './button-group/context'

type OmitNativeKeys = 'type' | 'loading' | 'disabled' | 'size' | 'plain' | 'onTap'

interface Props extends Omit<NativeProps<NativeButtonProps>, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Content to render before the button text
   */
  startContent?: ReactNode
  /**
   * Content to render after the button text
   */
  endContent?: ReactNode
  /**
   * Spinner to render
   */
  spinner?: ReactNode
  /**
   * Placement of the spinner
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end'
  /**
   * Event handler for the button tap
   * @param e Touch event
   * @returns void | boolean | Promise<void | boolean>
   */
  onTap?: (e: ITouchEvent) => void | Promise<void>
}

export type UseButtonProps = MergeVariantProps<Props, ButtonVariantProps, 'isInGroup'>

export function useButton(props: UseButtonProps) {
  const groupCtx = useButtonGroupContext()

  const isInGroup = !!groupCtx

  const {
    ref,
    variant = groupCtx?.variant ?? 'solid',
    color = groupCtx?.color ?? 'default',
    size = groupCtx?.size ?? 'md',
    radius = groupCtx?.radius ?? 'md',
    fullWidth = groupCtx?.fullWidth,
    isDisabled = groupCtx?.isDisabled,
    isIcon = groupCtx?.isIcon,
    className,
    hoverClass,
    startContent,
    spinner,
    spinnerPlacement = 'start',
    endContent,
    children,
    onTap,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const isLoadingProps = rest?.isLoading || groupCtx?.isLoading || 'auto'

  const isAutoLoading = isLoadingProps === 'auto'

  const [autoLoading, setAutoLoading] = useState(false)

  const isLoading = isAutoLoading ? autoLoading : Boolean(isLoadingProps)

  const style = useMemo(
    () => {
      const variants = {
        variant,
        color,
        size,
        radius,
        fullWidth,
        isDisabled: isDisabled || isLoading,
        isLoading,
        isIcon,
        isInGroup,
      }
      return ({
        normal: button({ ...variants, className }),
        hover: buttonHover({ ...variants, className: hoverClass }),
      })
    },
    [variant, color, size, radius, fullWidth, isDisabled, isLoading, isIcon, isInGroup, className, hoverClass],
  )

  const placedContent = useMemo(
    () => (placement: 'start' | 'end') => {
      if (isLoading && spinner && spinnerPlacement === placement) {
        return spinner
      }

      return placement === 'start' ? startContent : endContent
    },
    [isLoading, spinner, startContent, endContent, spinnerPlacement],
  )

  const handleTap = useCallback(
    async (e: ITouchEvent) => {
      if (isDisabled || isLoading || !onTap) {
        e.preventDefault()

        return
      }

      try {
        if (isAutoLoading)
          await withLoading(onTap, setAutoLoading, e)
        else onTap(e)
      }
      catch (error) {
        console.error('Button tap handler error:', error)
      }
    },
    [isDisabled, isLoading, isAutoLoading, setAutoLoading, onTap],
  )

  const getButtonProps = useCallback((): NativeButtonProps => {
    return {
      ref: domRef,
      className: style.normal,
      hoverClass: style.hover,
      disabled: isDisabled || isLoading,
      onClick: handleTap,
      ...rest,
    }
  }, [domRef, style.normal, style.hover, isDisabled, isLoading, rest, handleTap])

  return {
    domRef,
    style,
    startContent: placedContent('start'),
    endContent: placedContent('end'),
    spinner,
    spinnerPlacement,
    children,
    isLoading,
    getButtonProps,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
