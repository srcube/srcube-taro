import type { ToggleStateOptions } from '@react-stately/toggle'
import type { CheckboxSlots, CheckboxVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { CheckboxProps, ITouchEvent, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { checkbox } from '@srcube-taro/theme'
import { __DEV__, warn, withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo, useState } from 'react'
import { useCheckboxGroupContext } from './checkbox-group/context'
import { useCheckboxItem } from './hooks/use-checkbox-item'

type OmitNativeKeys = 'value' | 'checked' | 'disabled' | 'onChange'

export interface Props extends NativeProps<Omit<CheckboxProps, OmitNativeKeys>>, ToggleStateOptions {
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
  isLoading?: boolean | 'auto'
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

export type UseCheckboxProps = MergeVariantProps<Props, CheckboxVariantProps>

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
    classNames,
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
    wrapper: slots.wrapper({ class: classNames?.wrapper }),
    checkbox: slots.checkbox({ class: classNames?.checkbox }),
    spinner: slots.spinner({ class: classNames?.spinner }),
    content: slots.content({ class: classNames?.content }),
    iconWrapper: slots.iconWrapper({ class: classNames?.iconWrapper }),
    iDefault: slots.iDefault(),
    iIndeterminate: slots.iIndeterminate(),
    nCheckbox: slots.nCheckbox(),
  }), [slots, classNames])

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

      toggle()
    }
    catch (error) {
      if (__DEV__) {
        warn(`Checkbox tap handler error: ${error}`, 'Checkbox')
      }
      if (isAutoLoading) {
        setAutoLoading(false)
      }
    }
  }, [isReadOnlyProp, isDisabledProp, isLoading, isAutoLoading, onTap, toggle])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.wrapper,
    onClick: handleWrapperTap,
  }), [styles, handleWrapperTap])

  const getIconProps = useCallback((): ViewProps => ({
    className: styles.iconWrapper,
  }), [styles])

  const getNCheckboxProps = useCallback((): CheckboxProps => ({
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
