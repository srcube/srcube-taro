import type { OverlayTriggerProps } from '@srcube-taro/hooks'
import type { ModalSlots, ModalVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { useAnimatePresence, useOverlayTriggerState, usePageScrollLock } from '@srcube-taro/hooks'
import { modal } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import cn from 'classnames'
import { useCallback, useEffect, useId, useImperativeHandle, useMemo, useState } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<ModalRef>
  /**
   * Whether the modal can be closed by clicking on the backdrop.
   * @default true
   */
  isDismissable?: boolean
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
  el: TaroElement
  open: () => void
  close: () => void
}

export type UseModalProps = Props &
  OverlayTriggerProps &
  Omit<NativeProps<ViewProps>, keyof ModalVariantProps> &
  ModalVariantProps

export function useModal(props: UseModalProps) {
  const {
    ref,
    isOpen: isOpenProp,
    defaultOpen,
    isDismissable = true,
    backdrop,
    children,
    className,
    classNames,
    onOpenChange,
    onClose,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

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
    modalEl: domRef.current,
    open,
    close,
  }))

  useEffect(() => {
    if (isOpen) {
      addModalRecord(id)
      return () => {
        delModalRecord(id)
      }
    }
  }, [isOpen, id, addModalRecord, delModalRecord])

  const handleBackdropTap = useCallback(() => {
    if (!isDismissable)
      return
    close()
  }, [isDismissable, close])

  const getModalProps = useCallback((): ViewProps => {
    return {
      ref: domRef,
      ...rest,
    }
  }, [domRef, rest])

  const getBackdropProps = useCallback((): ViewProps => {
    return {
      onTap: handleBackdropTap,
    }
  }, [handleBackdropTap])

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
    open,
    close,
    getModalProps,
    getBackdropProps,
  }
}

export type UseModalReturn = ReturnType<typeof useModal>
