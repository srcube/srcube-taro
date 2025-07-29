import type { ModalBodyProps } from '@srcube-taro/modal'
import { ModalBody } from '@srcube-taro/modal'
import { useDrawerContext } from './context'

export interface DrawerBodyProps extends ModalBodyProps {}

function DrawerBody(props: DrawerBodyProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDrawerContext()

  return (
    <ModalBody className={slots.body({ class: className || classNames?.body })} {...rest}>
      {children}
    </ModalBody>
  )
}

DrawerBody.displayName = 'Srcube.DrawerBody'

export default DrawerBody
