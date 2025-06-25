import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC } from 'react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useEffect } from 'react'
import { useModalContext } from './context'

export interface ModalBodyProps extends NativeProps<ViewProps> {}

const ModalBody: FC<ModalBodyProps> = (props) => {
  const { children, className, ...rest } = props

  const { slots, classNames, setBodyMounted } = useModalContext()

  useEffect(() => {
    setBodyMounted(true)

    return () => setBodyMounted(false)
  }, [setBodyMounted])

  return (
    <View
      className={slots.body({ class: cn([classNames, className]) })}
      {...rest}
    >
      {children}
    </View>
  )
}

ModalBody.displayName = 'Srcube.ModalBody'

export default ModalBody
