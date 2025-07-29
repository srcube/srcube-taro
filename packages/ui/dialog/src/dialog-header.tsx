import type { ModalHeaderProps } from '@srcube-taro/modal'
import { ModalHeader } from '@srcube-taro/modal'
import { useDialogContext } from './context'

export interface DialogHeaderProps extends ModalHeaderProps {}

function DialogHeader(props: DialogHeaderProps) {
  const { className, children, ...rest } = props

  const { slots, classNames } = useDialogContext()

  return (
    <ModalHeader className={slots.header({ class: className || classNames?.header })} {...rest}>
      {children}
    </ModalHeader>
  )
}

DialogHeader.displayName = 'Srcube.DialogHeader'

export default DialogHeader
