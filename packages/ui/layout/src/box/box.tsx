import type { TaroElement } from '@tarojs/runtime'
import type { UseBoxProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useBox } from './use'

export interface BoxProps extends UseBoxProps { }

const Box = forwardRef<TaroElement, BoxProps>((props: UseBoxProps, ref) => {
  const { children, getBoxProps } = useBox({ ...props, ref })

  return (
    <View {...getBoxProps()}>
      {children}
    </View>
  )
})

Box.displayName = 'Srcube.Box'

export default Box
