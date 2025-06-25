import type { ModalHeaderProps } from '@srcube-taro/modal'
import { ModalHeader } from '@srcube-taro/modal'

export interface DialogHeaderProps extends ModalHeaderProps {}

const DialogHeader = ModalHeader

DialogHeader.displayName = 'Srcube.DialogHeader'

export default DialogHeader
