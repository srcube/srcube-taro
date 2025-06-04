import type { UseSpinnerProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSpinner } from './use'

export interface SpinnerProps extends UseSpinnerProps { }

const Spinner = forwardRef<any, SpinnerProps>((props, ref) => {
  const { Component, domRef, label, getSpinnerProps, styles } = useSpinner({ ...props, ref })

  return (
    <Component ref={domRef} className={styles.wrapper} {...getSpinnerProps()}>
      <View className={styles.icon} />
      {label && <View className={styles.label}>{label}</View>}
    </Component>
  )
})

Spinner.displayName = 'Srcube.Spinner'

export default Spinner
