import type { OverlayTriggerProps } from '@react-stately/overlays'
import type { ModalSlots, ModalVariantProps } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import type { ReactElement, Ref } from 'react'
import type { ModalBackdropProps } from './modal-backdrop'
import type { ModalContentProps } from './modal-content'
import { useAnimatePresence, useOverlayTriggerState, usePageScrollLock } from '@srcube-taro/hooks'
import { modal } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useEffect, useId, useImperativeHandle, useMemo, useState } from 'react'

type OmitNativeKeys = ''

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys | 'ref'>, OverlayTriggerProps {
  /**
   * Ref to the DOM element
   */
  ref?: Ref<ModalRef>
  /**
   * The children of the modal.
   */
  children?: ReactElement<ModalContentProps | ModalBackdropProps> | (ReactElement<ModalContentProps | ModalBackdropProps>)[]
  /**
   * Whether the modal can be closed by clicking on the backdrop.
   * @default true
   */
  isDismissable?: boolean
  /**
   * Whether to show the backdrop.
   * @default true
   */
  hasBackdrop?: boolean
  /**
   * Classnames to apply to the modal
   */
  classNames?: SlotsToClasses<Exclude<ModalSlots, ''>>
  /**
   * Callback fired when the modal is closed.
   */
  onClose?: () => Promise<void> | void
}

export type ModalRef = TaroElement & {
  isOpen: boolean
  open: () => void
  close: () => void
}

export type UseModalProps = MergeVariantProps<Props, ModalVariantProps>

export function useModal(props: UseModalProps) {
  const {
    ref,
    isOpen: isOpenProp,
    defaultOpen,
    isDismissable = true,
    hasBackdrop = true,
    backdrop,
    children,
    className,
    classNames,
    onOpenChange,
    onClose,
    ...rest
  } = props

  const domRef = useDOMRef()

  const id = useId()

  const [headerMounted, setHeaderMounted] = useState(false)
  const [bodyMounted, setBodyMounted] = useState(false)
  const [footerMounted, setFooterMounted] = useState(false)

  const { addModalRecord, delModalRecord } = usePageScrollLock()

  const { isOpen, open, close } = useOverlayTriggerState({
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen)
      if (!isOpen) {
        onClose?.()
      }
    },
  })

  const { isVisible } = useAnimatePresence({ isOpen })

  const slots = useMemo(() => modal({ isOpen, backdrop }), [isOpen, backdrop])

  useImperativeHandle(ref, () => {
    return Object.assign(domRef.current || {}, {
      isOpen,
      open,
      close,
    }) as unknown as ModalRef
  })

  useEffect(() => {
    if (isOpen) {
      addModalRecord(id)
    }

    return () => {
      delModalRecord(id)
    }
  }, [isOpen, id, addModalRecord, delModalRecord])

  const getRootPortalProps = useCallback((): ViewProps => {
    return {
      ref: domRef,
      className: slots.rootPortal({ class: [classNames?.rootPortal, className] }),
      ...rest,
    }
  }, [domRef, rest, slots, className, classNames])

  return {
    domRef,
    classNames,
    slots,
    children,
    isDismissable,
    headerMounted,
    setHeaderMounted,
    bodyMounted,
    setBodyMounted,
    footerMounted,
    setFooterMounted,
    isOpen,
    isVisible,
    hasBackdrop,
    open,
    close,
    getRootPortalProps,
  }
}

export type UseModalReturn = ReturnType<typeof useModal>
