import type { TaroElement } from '@tarojs/runtime'
import type { ModalItem, UseSrcubeUIProps } from './use'
import { Dialog } from '@srcube-taro/dialog'
import { Drawer } from '@srcube-taro/drawer'
import { Modal } from '@srcube-taro/modal'
import { Toast } from '@srcube-taro/toaster'
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

  const renderToasts = () => {
    const toasts = modals.filter(modal => modal.type === 'Toast').slice(-3)

    if (toasts.length === 0)
      return null

    return (
      <View className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast, index) => (
          <Toast
            key={toast.key}
            ref={toast.ref}
            {...(toast.props as any)}
            sequence={-(index) as 0 | -1 | -2}
          />
        ))}
      </View>
    )
  }

  const nonToastModals = modals.filter(modal => modal.type !== 'Toast')

  return (
    <View {...getBaseProps()}>
      {nonToastModals.map(renderModal)}
      {renderToasts()}
      {children}
    </View>
  )
})

SrcubeUI.displayName = 'Srcube.SrcubeUI'

export default SrcubeUI
