import type { DialogProps } from '@srcube-taro/dialog'
import type { DrawerProps } from '@srcube-taro/drawer'
import type { ModalProps } from '@srcube-taro/modal'
// import type { ToastProps } from '@srcube-taro/toast'
import type { ReactNode } from 'react'

export type ModalType = 'Modal' | 'Dialog' | 'Drawer' | 'Toast'

export type OpenModalProps<T = ModalProps, K extends keyof T = never> = Omit<T, 'isOpen' | 'defaultOpen' | 'children' | K> & { content: ReactNode }

export interface Api {
  openModal: (props: OpenModalProps) => { close: () => void }
  openDrawer: (props: OpenModalProps<DrawerProps>) => { close: () => void }
  openDialog: (props: OpenModalProps<DialogProps>) => { close: () => void }
  // toast: (props: OpenModalProps<ToastProps>) => { close: () => void }
}

let SRCUBE_UI_API: Api = null!

export function registerSrcubeUI(api: Api) {
  SRCUBE_UI_API = api as Api
}
export function unregisterSrcubeUI() {
  SRCUBE_UI_API = null!
}

export function openModal(props: OpenModalProps) {
  return SRCUBE_UI_API.openModal(props)
}
export function openDrawer(props: OpenModalProps<DrawerProps>) {
  return SRCUBE_UI_API.openDrawer(props)
}
export function openDialog(props: OpenModalProps<DialogProps>) {
  return SRCUBE_UI_API.openDialog(props)
}
// export function toast(props: OpenModalProps<ToastProps>) {
//   return SRCUBE_UI_API.toast(props)
// }
