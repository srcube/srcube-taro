import type { ModalBodyProps } from '@srcube-taro/modal'
import { ModalBody } from '@srcube-taro/modal'

export interface DrawerBodyProps extends ModalBodyProps {}

const DrawerBody = ModalBody

DrawerBody.displayName = 'Srcube.DrawerBody'

export default DrawerBody
