import type { ModalBodyProps } from '@srcube-taro/modal'
import { ModalBody } from '@srcube-taro/modal'
import { useDialogContext } from './context'

export interface DialogBodyProps extends ModalBodyProps {}

function DialogBody(props: DialogBodyProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDialogContext()

  return (
    <ModalBody className={slots.body({ class: className || classNames?.body })} {...rest}>
      {children}
    </ModalBody>
  )
}

DialogBody.displayName = 'Srcube.DialogBody'

export default DialogBody
