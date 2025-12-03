import type { TaroElement } from '@tarojs/runtime'
import type { ModalItem, UseSrcubeUIProps } from './use'
import { Dialog } from '@srcube-taro/dialog'
import { Drawer } from '@srcube-taro/drawer'
import { Modal } from '@srcube-taro/modal'
import { Toast, Toaster } from '@srcube-taro/toaster'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { useSrcubeUI } from './use'

export interface SrcubeUIProps extends UseSrcubeUIProps {}

const SrcubeUI = forwardRef<TaroElement, SrcubeUIProps>((props, ref) => {
  const {
    children,
    modals,
    getBaseProps,
  } = useSrcubeUI({
    ...props,
    ref,
  })

  const renderModal = (modal: ModalItem) => {
    const components = { Modal, Dialog, Drawer } as const

    const Component = components[modal.type as keyof typeof components]
    if (!Component)
      return null

    // TypeScript limitation: union types in props spreading requires any
    return (
      <Component
        key={modal.key}
        ref={modal.ref}
        {...(modal.props as any)}
      />
    )
  }

  const nonToastModals = modals.filter(modal => modal.type !== 'Toast')

  return (
    <View {...getBaseProps()}>
      <Toaster />
      {nonToastModals.map(renderModal)}
      {children}
    </View>
  )
})

SrcubeUI.displayName = 'Srcube.SrcubeUI'

export default SrcubeUI
