import type { ToggleStateOptions } from '@srcube-taro/hooks'
import type { RadioSlots, RadioVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, RadioProps, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { radio } from '@srcube-taro/theme'
import { __DEV__, warn, withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo, useState } from 'react'
import { useRadioItem } from './hooks/use-radio-item'
import { useRadioGroupContext } from './radio-group/context'

type OmitNativeKeys = 'value' | 'checked' | 'disabled' | 'onChange'

export interface Props extends NativeProps<Omit<RadioProps, OmitNativeKeys>>, ToggleStateOptions {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Value of the radio
   */
  value?: string
  /**
   * Whether the radio is in loading state
   */
  isLoading?: boolean | 'auto'
  /**
   * Custom icon to display
   */
  icon?: ReactNode | ((props: Pick<Props, 'isLoading' | 'isDisabled' | 'className'>) => NonNullable<ReactNode>)
  /**
   * Class names to apply to the radio slots
   */
  classNames?: SlotsToClasses<RadioSlots>
  /**
   * React aria onChange event
   */
  onValueChange?: ToggleStateOptions['onChange']
  /**
   * Handler that is called when the radio is tapped
   */
  onTap?: (event: ITouchEvent) => void | Promise<void>
}

export type UseRadioProps = MergeVariantProps<Props, RadioVariantProps>

export function useRadio(props: UseRadioProps) {
  const groupCtx = useRadioGroupContext()

  const {
    ref,
    children,
    value = '',
    isSelected: isSelectedProp,
    defaultSelected: defaultSelectedProp,
    isDisabled: isDisabledProp,
    isReadOnly: isReadOnlyProp,
    isLoading: isLoadingProp = 'auto',
    color = groupCtx?.color || 'default',
    size = groupCtx?.size || 'md',
    icon,
    onTap,
    onChange: onChangeProp,
    onValueChange = groupCtx?.onValueChange,
    ...rest
  } = props

  if (groupCtx && __DEV__) {
    if (isSelectedProp) {
      warn(
        'The RadioGroup is being used, `isSelected` will be ignored. Use the `value` of the Radio.Group instead.',
        'Radio',
      )
    }
    if (defaultSelectedProp) {
      warn(
        'The RadioGroup is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Radio.Group instead.',
        'Radio',
      )
    }
  }

  const domRef = useDOMRef(ref)

  const isAutoLoading = isLoadingProp === 'auto'

  const [autoLoading, setAutoLoading] = useState(false)

  const isLoading = isAutoLoading ? autoLoading : Boolean(isLoadingProp)

  const hasIcon = Boolean(icon)

  const { isSelected, isDisabled, isReadOnly, onChange } = useRadioItem(props, groupCtx?.groupState)

  const slots = useMemo(
    () => radio({ isSelected, color, size, isDisabled, isLoading, isReadOnly, hasIcon }),
    [isSelected, color, size, isDisabled, isLoading, isReadOnly, hasIcon],
  )

  const styles = useMemo(() => ({
    wrapper: cn(slots.wrapper()),
    radio: cn(slots.radio()),
    spinner: cn(slots.spinner()),
    iconWrapper: cn(slots.iconWrapper()),
    iconDefault: cn(slots.iconDefault()),
    content: cn(slots.content()),
    nRadio: cn(slots.nRadio()),
  }), [slots])

  const handleWrapperTap = useCallback(async (e: ITouchEvent) => {
    if (isReadOnlyProp || isDisabledProp || isLoading) {
      e.preventDefault()
      return
    }

    try {
      if (onTap) {
        if (isAutoLoading)
          await withLoading(onTap, setAutoLoading, e)
        else onTap(e)
      }

      onChange?.(e)
    }
    catch (error) {
      if (__DEV__) {
        warn(`Radio tap handler error: ${error}`, 'Radio')
      }
      if (isAutoLoading) {
        setAutoLoading(false)
      }
    }
  }, [value, isReadOnlyProp, isDisabledProp, isLoading, isAutoLoading, onValueChange, onTap])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.wrapper,
    onClick: handleWrapperTap,
  }), [styles, handleWrapperTap])

  const getIconProps = useCallback((): ViewProps => ({
    className: styles.iconWrapper,
  }), [styles])

  const getNRadioProps = useCallback((): RadioProps => ({
    ...rest,
    value,
    checked: isSelected,
    disabled: isDisabledProp,
    className: styles.nRadio,
  }), [rest, value, isSelected, isDisabledProp, styles])

  return {
    domRef,
    children,
    styles,
    isSelected: isSelected || false,
    isDisabled: isDisabled || false,
    isLoading,
    color,
    size,
    icon,
    getWrapperProps,
    getIconProps,
    getNRadioProps,
  }
}

export type UseRadioReturn = ReturnType<typeof useRadio>
