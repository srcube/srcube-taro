import type { TaroElement } from '@tarojs/runtime'
import type { UseCheckboxProps } from './use'
import { Spinner } from '@srcube-taro/spinner'
import { isFunc } from '@srcube-taro/utils-func'
import { Checkbox as NCheckbox, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useCheckbox } from './use'

export interface CheckboxProps extends UseCheckboxProps {}

const Checkbox = forwardRef<TaroElement, CheckboxProps>((props, ref) => {
  const {
    domRef,
    styles,
    children,
    icon,
    isLoading,
    isDisabled,
    isIndeterminate,
    getWrapperProps,
    getNCheckboxProps,
  } = useCheckbox({
    ...props,
    ref,
  })

  const renderIcon = () => {
    if (isFunc(icon)) {
      return icon({
        isIndeterminate,
        isLoading,
        isDisabled,
        className: styles.iconWrapper,
      })
    }
    if (isLoading) {
      return <Spinner className={styles.spinner} />
    }
    if (isIndeterminate) {
      return (
        <View className={styles.iconWrapper}>
          <View className={styles.iconIndeterminate} />
        </View>
      )
    }
    return (
      <View className={styles.iconWrapper}>
        {icon || <View className={styles.iconDefault} />}
      </View>
    )
  }

  return (
    <View {...getWrapperProps()}>
      <NCheckbox ref={domRef} {...getNCheckboxProps()} />
      <View className={styles.checkbox}>{renderIcon()}</View>
      <View className={styles.content}>{children}</View>
    </View>
  )
})

Checkbox.displayName = 'Srcube.Checkbox'

export default Checkbox
