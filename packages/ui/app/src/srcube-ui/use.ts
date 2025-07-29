import type { DialogProps } from '@srcube-taro/dialog'
import type { DrawerProps } from '@srcube-taro/drawer'
import type { ModalProps, ModalRef } from '@srcube-taro/modal'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { ViewProps } from '@tarojs/components'
import type { ModalType, OpenModalProps } from './registry'
import { useDOMRef } from '@srcube-taro/utils-react'
import { nanoid } from 'nanoid/non-secure'
import { useCallback, useEffect, useRef, useState } from 'react'
import { registerSrcubeUI, unregisterSrcubeUI } from './registry'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
}

export interface ModalItem {
  key: string
  type: ModalType
  ref: (ref: ModalRef) => void
  props: ModalProps | DialogProps | DrawerProps
}

export type Modals = Array<ModalItem>

export type UseSrcubeUIProps = Props &
  Omit<NativeProps<ViewProps>, ''>

export function useSrcubeUI(props: UseSrcubeUIProps) {
  const { ref, children, className, ..._rest } = props

  const domRef = useDOMRef(ref)

  const modalRefs = useRef<Map<string, ModalRef>>(new Map())

  const [modals, setModals] = useState<Modals>([])

  const open = useCallback((type: ModalType, props: OpenModalProps) => {
    const { content, ...modalRest } = props
    const key = nanoid(5)

    const remove = () => setModals(prev => prev.filter(modal => modal.key !== key))

    const close = () => {
      const modalRef = modalRefs.current.get(key)

      modalRef?.close()

      setTimeout(() => remove(), 1000)
    }

    setModals(prev => [
      ...prev,
      {
        key,
        type,
        ref: (ref: ModalRef) => modalRefs.current.set(key, ref),
        props: { ...modalRest, defaultOpen: true, children: content },
      },
    ])

    return {
      close,
    }
  }, [])

  const openModal = useCallback((props: OpenModalProps) => open('Modal', props), [open])
  const openDialog = useCallback((props: OpenModalProps<DialogProps>) => open('Dialog', props), [open])
  const openDrawer = useCallback((props: OpenModalProps<DrawerProps>) => open('Drawer', props), [open])

  useEffect(() => {
    registerSrcubeUI({
      openModal,
      openDialog,
      openDrawer,
    })

    return () => {
      unregisterSrcubeUI()
    }
  }, [openModal, openDialog, openDrawer])

  return {
    domRef,
    children,
    modalRefs,
    modals,
  }
}

export type UseProviderReturn = ReturnType<typeof useSrcubeUI>
