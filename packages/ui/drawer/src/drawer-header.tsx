import type { ModalHeaderProps } from '@srcube-taro/modal'
import { ModalHeader } from '@srcube-taro/modal'
import { useDrawerContext } from './context'

export interface DrawerHeaderProps extends ModalHeaderProps {}

function DrawerHeader(props: DrawerHeaderProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDrawerContext()

  return (
    <ModalHeader className={slots.header({ class: className || classNames?.header })} {...rest}>
      {children}
    </ModalHeader>
  )
}

DrawerHeader.displayName = 'Srcube.DrawerHeader'

export default DrawerHeader
