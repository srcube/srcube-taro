import type { TaroElement } from '@tarojs/runtime'
import type { UseSpinnerProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSpinner } from './use'

export interface SpinnerProps extends UseSpinnerProps { }

const Spinner = forwardRef<TaroElement, SpinnerProps>((props, ref) => {
  const { label, getSpinnerProps, styles } = useSpinner({ ...props, ref })

  return (
    <View {...getSpinnerProps()}>
      <View className={styles.icon} />
      {label && <View className={styles.label}>{label}</View>}
    </View>
  )
})

Spinner.displayName = 'Srcube.Spinner'

export default Spinner
