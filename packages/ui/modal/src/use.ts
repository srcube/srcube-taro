import type { OverlayTriggerProps } from '@react-stately/overlays'
import type { ModalSlots, ModalVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import type { ReactElement } from 'react'
import type { ModalBackdropProps } from './modal-backdrop'
import type { ModalContentProps } from './modal-content'
import { mergeProps } from '@react-aria/utils'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { useAnimatePresence, usePageScrollLock } from '@srcube-taro/hooks'
import { modal } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useEffect, useId, useImperativeHandle, useMemo, useState } from 'react'

type OmitNativeKeys = ''

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys>, OverlayTriggerProps {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<ModalRef>
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

export interface ModalRef {
  el: TaroElement | null
  isOpen: boolean
  open: () => void
  close: () => void
}

export type UseModalProps = Omit<Props, keyof ModalVariantProps> &
  ModalVariantProps

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

  const styles = useMemo(
    () => ({
      wrapper: slots.wrapper({ class: cn([classNames?.wrapper, className]) }),
      backdrop: slots.backdrop({ class: classNames?.backdrop }),
      content: slots.content({ class: classNames?.content }),
      header: slots.header({ class: classNames?.header }),
      body: slots.body({ class: classNames?.body }),
      footer: slots.footer({ class: classNames?.footer }),
    }),
    [slots, className, classNames],
  )

  useImperativeHandle(ref, () => ({
    el: domRef.current,
    isOpen,
    open,
    close,
  }))

  useEffect(() => {
    if (isOpen) {
      addModalRecord(id)
    }

    return () => {
      delModalRecord(id)
    }
  }, [isOpen, id, addModalRecord, delModalRecord])

  const onBackdropTap = useCallback(() => {
    if (!isDismissable)
      return

    try {
      close()
    }
    catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Modal] Backdrop tap failed:', error)
      }
    }
  }, [isDismissable, close])

  const getRootPortalProps = useCallback((): ViewProps => {
    return {
      ...rest,
      ref: domRef,
    }
  }, [domRef, rest])

  const getBackdropProps = useCallback((props?: ViewProps): ViewProps => {
    return mergeProps(props, {
      onTap: onBackdropTap,
    })
  }, [onBackdropTap])

  return {
    domRef,
    classNames,
    slots,
    styles,
    children,
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
    getBackdropProps,
  }
}

export type UseModalReturn = ReturnType<typeof useModal>
