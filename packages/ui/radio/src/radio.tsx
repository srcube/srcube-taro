import type { TaroElement } from '@tarojs/runtime'
import type { UseRadioProps } from './use'
import { Spinner } from '@srcube-taro/spinner'
import { isFunction } from '@srcube-taro/utils-func'
import { Radio as NRadio, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useRadio } from './use'

export interface RadioProps extends UseRadioProps {}

const Radio = forwardRef<TaroElement, RadioProps>((props, ref) => {
  const {
    domRef,
    styles,
    children,
    icon,
    isLoading,
    isDisabled,
    getWrapperProps,
    getIconProps,
    getNRadioProps,
  } = useRadio({
    ...props,
    ref,
  })

  const renderIcon = () => {
    if (isFunction(icon)) {
      return icon({
        isLoading,
        isDisabled,
        className: styles.iconWrapper,
      })
    }
    if (isLoading) {
      return <Spinner className={styles.spinner} />
    }
    return (
      <View {...getIconProps()}>
        {icon || <View className={styles.iconDefault} />}
      </View>
    )
  }

  return (
    <View {...getWrapperProps()}>
      <NRadio ref={domRef} {...getNRadioProps()} />
      <View className={styles.radio}>{renderIcon()}</View>
      {children && <View className={styles.content}>{children}</View>}
    </View>
  )
})

Radio.displayName = 'Srcube.Radio'

export default Radio
