import type { ModalHeaderProps } from '@srcube-taro/modal'
import { ModalHeader } from '@srcube-taro/modal'

export interface DrawerHeaderProps extends ModalHeaderProps {}

const DrawerHeader = ModalHeader

DrawerHeader.displayName = 'Srcube.DrawerHeader'

export default DrawerHeader
