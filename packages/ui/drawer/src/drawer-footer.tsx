import type { ModalFooterProps } from '@srcube-taro/modal'
import { ModalFooter } from '@srcube-taro/modal'
import { useDrawerContext } from './context'

export interface DrawerFooterProps extends ModalFooterProps {}

function DrawerFooter(props: DrawerFooterProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDrawerContext()

  return (
    <ModalFooter className={slots.footer({ class: className || classNames?.footer })} {...rest}>
      {children}
    </ModalFooter>
  )
}

DrawerFooter.displayName = 'Srcube.DrawerFooter'

export default DrawerFooter
