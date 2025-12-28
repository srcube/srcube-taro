import type { ToggleStateOptions } from '@react-stately/toggle'
import type { RadioSlots, RadioVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, RadioProps, ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { radio } from '@srcube-taro/theme'
import { __DEV__, warn, withLoading } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
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
  iconContent?: ReactNode | ((props: Pick<Props, 'isLoading' | 'isDisabled'>) => NonNullable<ReactNode>)
  /**
   * Class names to apply to the radio slots
   */
  classNames?: SlotsToClasses<Exclude<RadioSlots, 'nRadio' | 'iDefault'>>
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
    iconContent,
    className,
    classNames,
    onTap,
    onChange: onChangeProp,
    // onValueChange = groupCtx?.onValueChange,
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

  const { isSelected, isDisabled, isReadOnly, onChange } = useRadioItem(props, groupCtx?.groupState)

  const slots = useMemo(
    () => radio({ color, size, isSelected, isDisabled, isLoading, isReadOnly }),
    [color, size, isSelected, isDisabled, isLoading, isReadOnly],
  )

  const styles = useMemo(() => ({
    base: slots.base({ class: [classNames?.base, className] }),
    radio: slots.radio({ class: classNames?.radio }),
    spinner: slots.spinner({ class: classNames?.spinner }),
    content: slots.content({ class: classNames?.content }),
    iconWrapper: slots.iconWrapper({ class: classNames?.iconWrapper }),
    iDefault: slots.iDefault(),
    nRadio: slots.nRadio(),
  }), [slots, classNames, className])

  const handleBaseTap = useCallback(async (e: ITouchEvent) => {
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
  }, [isReadOnlyProp, isDisabledProp, isLoading, isAutoLoading, onTap, onChange])

  const getWrapperProps = useCallback((): ViewProps => ({
    className: styles.base,
    onClick: handleBaseTap,
  }), [styles, handleBaseTap])

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
    iconContent,
    getWrapperProps,
    getNRadioProps,
  }
}

export type UseRadioReturn = ReturnType<typeof useRadio>
