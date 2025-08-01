import type { TaroElement } from '@tarojs/runtime'
import type { ModalItem, UseSrcubeUIProps } from './use'
import { Dialog } from '@srcube-taro/dialog'
import { Drawer } from '@srcube-taro/drawer'
import { Modal } from '@srcube-taro/modal'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSrcubeUI } from './use'

export interface SrcubeUIProps extends UseSrcubeUIProps {}

const SrcubeUI = forwardRef<TaroElement, SrcubeUIProps>((props, ref) => {
  const {
    children,
    modals,
    getWrapperProps,
  } = useSrcubeUI({
    ...props,
    ref,
  })

  const renderModal = (modal: ModalItem) => {
    const components = { Modal, Dialog, Drawer } as const

    const Component = components[modal.type]
    if (!Component)
      return null

    return (
      <Component key={modal.key} ref={modal.ref} {...modal.props} />
    )
  }

  return (
    <View {...getWrapperProps()}>
      {modals.map(renderModal)}
      {children}
    </View>
  )
})

SrcubeUI.displayName = 'Srcube.SrcubeUI'

export default SrcubeUI
