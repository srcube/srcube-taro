import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { FC, ReactNode } from 'react'
import { isFunction } from '@tarojs/shared'
import cn from 'classnames'
import { useModalContext } from './context'

export interface ModalContentProps extends Omit<NativeProps<ViewProps>, 'children'> {
  children: ReactNode | ((onClose: () => void) => ReactNode)
}

const ModalContent: FC<ModalContentProps> = (props) => {
  const { children, className, ...rest } = props

  const {
    Component,
    slots,
    classNames,
    onClose,
  } = useModalContext()

  return (
    <Component
      className={slots.content({ class: cn([classNames?.content, className]) })}
      {...rest}
    >
      {isFunction(children) ? children(onClose) : children}
    </Component>
  )
}

ModalContent.displayName = 'Srcube.ModalContent'

export default ModalContent
