import type { ModalFooterProps } from '@srcube-taro/modal'
import { ModalFooter } from '@srcube-taro/modal'
import { useDialogContext } from './context'

export interface DialogFooterProps extends ModalFooterProps {}

function DialogFooter(props: DialogFooterProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDialogContext()

  return (
    <ModalFooter
      className={slots.footer({ className: [classNames?.footer, className] })}
      {...rest}
    >
      {children}
    </ModalFooter>
  )
}

DialogFooter.displayName = 'Srcube.DialogFooter'

export default DialogFooter
