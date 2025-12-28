import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { View } from '@tarojs/components'
import { forwardRef, useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalBodyProps extends NativeProps<ViewProps> {}

const ModalBody = forwardRef<TaroElement, ModalBodyProps>((props, ref) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setBodyMounted } = useModalContext()

  useEffect(() => {
    setBodyMounted(true)

    return () => {
      setBodyMounted(false)
    }
  }, [setBodyMounted])

  return (
    <View
      ref={ref}
      className={slots.body({ class: [classNames?.body, className] })}
      {...rest}
    >
      {children}
    </View>
  )
})

ModalBody.displayName = 'Srcube.ModalBody'

export default ModalBody
