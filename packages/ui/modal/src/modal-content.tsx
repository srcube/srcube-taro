import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useModalContext } from './context'

export interface ModalContentProps extends NativeProps<ViewProps> {}

const ModalContent = forwardRef<TaroElement, ModalContentProps>((props, ref) => {
  const { className, children, ...rest } = props

  const { slots, classNames } = useModalContext()

  return (
    <View
      ref={ref}
      className={slots.content({ class: [classNames?.content, className] })}
      {...rest}
    >
      {children}
    </View>
  )
})

ModalContent.displayName = 'Srcube.ModalContent'

export default ModalContent
