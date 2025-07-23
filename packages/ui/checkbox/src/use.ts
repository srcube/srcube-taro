import type { ToggleStateOptions } from '@react-stately/toggle'
import type { CheckboxSlots, CheckboxVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ITouchEvent, CheckboxProps as NCheckboxProps, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { checkbox } from '@srcube-taro/theme'
import { __DEV__, warn, withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useMemo, useState } from 'react'
import { useCheckboxGroupContext } from './checkbox-group/context'
import { useCheckboxItem } from './hooks/use-checkbox-item'

type NativePropsOmitKeys = 'value' | 'checked' | 'disabled' | 'onChange'

export interface Props extends NativeProps<Omit<NCheckboxProps, NativePropsOmitKeys>>, ToggleStateOptions {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Value of the checkbox
   */
  value?: string
  /**
   * Whether the checkbox is indeterminate (partially checked)
   */
  isIndeterminate?: boolean
  /**
   * Whether the checkbox is in loading state
   */
  isLoading?: boolean
  /**
   * The icon to be displayed when the checkbox is checked/loading/indeterminate.
   */
  icon?: ReactNode | ((props: Pick<Props, 'isIndeterminate' | 'isLoading' | 'isDisabled' | 'className'>) => NonNullable<ReactNode>)
  /**
   * Class names to apply to the input
   */
  classNames?: SlotsToClasses<Exclude<CheckboxSlots, 'nCheckbox' | 'iconDefault' | 'iconIndeterminate'>>
  /**
   * React aria onChange event
   */
  onValueChange?: ToggleStateOptions['onChange']
}

export type UseCheckboxProps = Omit<Props, keyof CheckboxVariantProps> & CheckboxVariantProps

/**
 * Checkbox logic hook
 */
export function useCheckbox(props: UseCheckboxProps) {
  const groupCtx = useCheckboxGroupContext()

  const {
    ref,
    children,
    value = '',
    isSelected: isSelectedProp,
    defaultSelected: defaultSelectedProp,
    isDisabled: isDisabledProp,
    isReadOnly: isReadOnlyProp,
    isIndeterminate: isIndeterminateProp,
    isLineThrough = groupCtx?.isLineThrough,
    color = groupCtx?.color,
    size = groupCtx?.size,
    radius = groupCtx?.radius ?? size,
    icon,
    onTap,
    onChange,
    onValueChange,
    ...rest
  } = props

  if (groupCtx && __DEV__) {
    if (isSelectedProp) {
      warn(
        'The CheckboxGroup is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.',
        'Checkbox',
      )
    }
    if (defaultSelectedProp) {
      warn(
        'The CheckboxGroup is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.',
        'Checkbox',
      )
    }
  }

  const domRef = useDOMRef(ref)

  const isLoadingProps = rest?.isLoading || 'auto'

  const isAutoLoading = isLoadingProps === 'auto'

  const [autoLoading, setAutoLoading] = useState(false)

  const isLoading = isAutoLoading ? autoLoading : Boolean(isLoadingProps)

  const { isSelected, isDisabled, isReadOnly, isIndeterminate, toggle } = useCheckboxItem(props, groupCtx?.groupState)

  const slots = useMemo(
    () => checkbox({ isSelected, color, size, radius, isIndeterminate, isDisabled, isLoading, isReadOnly, isLineThrough }),
    [isSelected, color, size, radius, isIndeterminate, isDisabled, isLoading, isReadOnly, isLineThrough],
  )

  const styles = useMemo(() => ({
    wrapper: cn(slots.wrapper()),
    checkbox: cn(slots.checkbox()),
    spinner: cn(slots.spinner()),
    iconWrapper: cn(slots.iconWrapper()),
    iconDefault: cn(slots.iconDefault()),
    iconIndeterminate: cn(slots.iconIndeterminate()),
    content: cn(slots.content()),
    nCheckbox: cn(slots.nCheckbox()),
  }), [slots])

  const handleWrapperTap = useCallback(async (e: ITouchEvent) => {
    if (isReadOnlyProp || isDisabledProp || isLoading) {
      e.preventDefault()

      return
    }

    if (onTap) {
      if (isAutoLoading)
        await withLoading(onTap, setAutoLoading, e)
      else onTap(e)
    }

    toggle()
  }, [isReadOnlyProp, isDisabledProp, isLoading, isAutoLoading, onTap, toggle])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.wrapper,
    onClick: handleWrapperTap,
  }), [styles, handleWrapperTap])

  const getIconProps = useCallback((): ViewProps => ({
    className: styles.iconWrapper,
  }), [styles])

  const getNCheckboxProps = useCallback((): NCheckboxProps => ({
    ...rest,
    value,
    checked: isSelected,
    disabled: isDisabledProp,
    className: styles.nCheckbox,
  }), [rest, value, isSelected, isDisabledProp, styles])

  return {
    domRef,
    children,
    styles,
    isSelected,
    isDisabled,
    isIndeterminate,
    isLoading,
    color,
    size,
    icon,
    getWrapperProps,
    getIconProps,
    getNCheckboxProps,
  }
}
