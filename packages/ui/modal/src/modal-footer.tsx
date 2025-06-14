import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useModalContext } from './context'

export interface ModalFooterProps extends Omit<NativeProps<ViewProps>, 'children'> {
  children: ReactNode
}

const ModalFooter: FC<ModalFooterProps> = (props) => {
  const { children, className, ...rest } = props

  const { slots, classNames } = useModalContext()

  return (
    <View
      className={slots.footer({ class: cn([classNames, className]) })}
      {...rest}
    >
      { children}
    </View>
  )
}

ModalFooter.displayName = 'Srcube.ModalFooter'

export default ModalFooter
