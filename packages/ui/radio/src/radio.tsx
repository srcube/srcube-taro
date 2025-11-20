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
    iconContent,
    isLoading,
    isDisabled,
    isSelected,
    getWrapperProps,
    getNRadioProps,
  } = useRadio({
    ...props,
    ref,
  })

  const renderIconContent = () => {
    if (isLoading) {
      return <Spinner className={styles.spinner} />
    }

    if (!isSelected)
      return

    if (!iconContent) {
      return <View className={styles.iDefault} />
    }

    if (isFunction(iconContent)) {
      return iconContent({
        isLoading,
        isDisabled,
      })
    }

    return iconContent
  }

  return (
    <View {...getWrapperProps()}>
      <NRadio ref={domRef} {...getNRadioProps()} />
      <View className={styles.radio}>
        <View className={styles.iconWrapper}>
          {renderIconContent()}
        </View>
      </View>
      {children && <View className={styles.content}>{children}</View>}
    </View>
  )
})

Radio.displayName = 'Srcube.Radio'

export default Radio
