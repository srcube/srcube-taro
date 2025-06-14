import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useModalContext } from './context'

export interface ModalHeaderProps extends Omit<NativeProps<ViewProps>, 'children'> {
  children: ReactNode
}

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { children, className, ...rest } = props

  const { slots, classNames } = useModalContext()

  return (
    <View
      className={slots.header({ class: cn([classNames, className]) })}
      {...rest}
    >
      {children}
    </View>
  )
}

ModalHeader.displayName = 'Srcube.ModalContent'

export default ModalHeader
