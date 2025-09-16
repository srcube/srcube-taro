import type { TaroElement } from '@tarojs/runtime'
import type { UseSwitchProps } from './use'
import { Spinner } from '@srcube-taro/spinner'
import { isFunction } from '@srcube-taro/utils-func'
import { Switch as NSwitch, View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSwitch } from './use'

export interface SwitchProps extends UseSwitchProps {}

const Switch = forwardRef<TaroElement, SwitchProps>((props, ref) => {
  const {
    domRef,
    children,
    styles,
    isSelected,
    isLoading,
    startContent,
    endContent,
    thumbIcon,
    getWrapperProps,
    getTrackProps,
    getThumbProps,
    getNSwitchProps,
  } = useSwitch({
    ...props,
    ref,
  })

  const renderThumbIcon = () => {
    if (isLoading) {
      return <Spinner className={styles.spinner} />
    }
    if (thumbIcon) {
      if (isFunction(thumbIcon)) {
        return thumbIcon({ isSelected })
      }
      return thumbIcon
    }
    return null
  }

  return (
    <View
      ref={domRef}
      {...getWrapperProps()}
    >
      {startContent && (
        <View className={styles.startContent}>
          {startContent}
        </View>
      )}

      <View {...getTrackProps()}>
        {startContent && (
          <View className={styles.startContent}>
            {startContent}
          </View>
        )}

        <View {...getThumbProps()}>
          {renderThumbIcon()}
        </View>

        {endContent && (
          <View className={styles.endContent}>
            {endContent}
          </View>
        )}

        {/* Hidden native switch for accessibility */}
        <NSwitch {...getNSwitchProps()} />
      </View>

      {children && (
        <View className={styles.content}>
          {children}
        </View>
      )}
    </View>
  )
})

Switch.displayName = 'Srcube.Switch'

export default Switch
