import type { ToggleStateOptions } from '@srcube-taro/hooks'
import type { SwitchSlots, SwitchVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, SwitchProps, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { useToggleState } from '@srcube-taro/hooks'
import { toggle } from '@srcube-taro/theme'
import { __DEV__, warn, withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo, useState } from 'react'

type OmitNativeKeys = 'checked' | 'disabled' | 'onChange'

export interface Props extends NativeProps<Omit<SwitchProps, OmitNativeKeys>>, ToggleStateOptions {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Value of the switch
   */
  value?: string
  /**
   * Whether the switch is in loading state
   */
  isLoading?: boolean | 'auto'
  /**
   * Custom icon to display in the thumb
   */
  thumbIcon?: ReactNode | ((props: { isSelected: boolean }) => ReactNode)
  /**
   * Content to display at the start of the switch
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the switch
   */
  endContent?: ReactNode
  /**
   * Class names to apply to the switch slots
   */
  classNames?: SlotsToClasses<SwitchSlots>
  /**
   * React aria onChange event
   */
  onValueChange?: ToggleStateOptions['onChange']
  /**
   * Handler that is called when the switch is tapped
   */
  onTap?: (event: ITouchEvent) => void | Promise<void>
}

export type UseSwitchProps = MergeVariantProps<Props, SwitchVariantProps>

export function useSwitch(props: UseSwitchProps) {
  const {
    ref,
    children,
    value,
    isLoading: isLoadingProp = 'auto',
    isDisabled,
    startContent,
    endContent,
    thumbIcon,
    classNames,
    className,
    onValueChange,
    onTap,
    ...otherProps
  } = props

  const domRef = useDOMRef(ref)

  const isAutoLoading = isLoadingProp === 'auto'

  const [autoLoading, setAutoLoading] = useState(false)

  const isLoading = isAutoLoading ? autoLoading : Boolean(isLoadingProp)

  const state = useToggleState({
    isSelected: props.isSelected,
    defaultSelected: props.defaultSelected,
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
    onChange: onValueChange,
  })

  const slots = useMemo(
    () =>
      toggle({
        ...otherProps,
        isSelected: state.isSelected,
        isDisabled,
        isLoading,
      }),
    [otherProps, state, isDisabled, isLoading],
  )

  const styles = useMemo(
    () => ({
      wrapper: cn(slots.wrapper({ class: classNames?.wrapper }), className),
      track: cn(slots.track({ class: classNames?.track })),
      thumb: cn(slots.thumb({ class: classNames?.thumb })),
      spinner: cn(slots.spinner({ class: classNames?.spinner })),
      startContent: cn(slots.startContent({ class: classNames?.startContent })),
      endContent: cn(slots.endContent({ class: classNames?.endContent })),
      content: cn(slots.content({ class: classNames?.content })),
      nSwitch: cn(slots.nSwitch()),
    }),
    [slots, classNames, className],
  )

  const handleWrapperTap = useCallback(async (e: ITouchEvent) => {
    if (props.isDisabled || props.isReadOnly || isLoading) {
      e.preventDefault()
      return
    }

    try {
      if (onTap) {
        if (isAutoLoading)
          await withLoading(onTap, setAutoLoading, e)
        else onTap(e)
      }

      state.toggle()
    }
    catch (error) {
      if (__DEV__) {
        warn(`Switch tap handler error: ${error}`, 'Switch')
      }
      if (isAutoLoading) {
        setAutoLoading(false)
      }
    }
  }, [props.isDisabled, props.isReadOnly, isLoading, isAutoLoading, onTap, state])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.wrapper,
    onClick: handleWrapperTap,
  }), [styles.wrapper, handleWrapperTap])

  const getTrackProps = useCallback(
    () => ({
      className: styles.track,
    }),
    [styles.track],
  )

  const getThumbProps = useCallback(
    () => ({
      className: styles.thumb,
    }),
    [styles.thumb],
  )

  const getNSwitchProps = useCallback(
    () => ({
      checked: state.isSelected,
      disabled: props.isDisabled,
      value,
      className: styles.nSwitch,
    }),
    [state.isSelected, props.isDisabled, value, styles.nSwitch],
  )

  return {
    Component: 'View' as const,
    domRef,
    children,
    styles,
    isSelected: state.isSelected,
    isLoading,
    startContent,
    endContent,
    thumbIcon,
    getWrapperProps,
    getTrackProps,
    getThumbProps,
    getNSwitchProps,
  }
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>
