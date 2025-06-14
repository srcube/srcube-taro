import type { OverlayTriggerProps } from '@srcube-taro/hooks'
import type { ModalSlots, ModalVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import { useAnimatePresence, useOverlayTriggerState, usePageScrollLock } from '@srcube-taro/hooks'
import { modal } from '@srcube-taro/theme'
import { View } from '@tarojs/components'
import cn from 'classnames'
import { useCallback, useEffect, useId, useMemo } from 'react'

interface Props {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<TaroElement>
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
   *  Callback fired when the modal is closed.
   */
  onClose?: () => void
}

export type UseModalProps = Props & OverlayTriggerProps &
  Omit<NativeProps<ViewProps>, keyof ModalVariantProps> &
  ModalVariantProps

export function useModal(props: UseModalProps) {
  const {
    ref,
    isOpen,
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

  const Component = View

  const id = useId()
  const { isVisible } = useAnimatePresence({ isOpen })
  const { addModalRecord, delModalRecord } = usePageScrollLock()

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen)
      if (!isOpen) {
        onClose?.()
      }
    },
  })

  const slots = useMemo(() => modal({ isOpen: state.isOpen, backdrop }), [state.isOpen])

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

  useEffect(() => {
    if (state.isOpen) {
      addModalRecord(id)
      return () => {
        delModalRecord(id)
      }
    }
  }, [state.isOpen, id, addModalRecord, delModalRecord])

  const handleBackdropTap = useCallback(() => {
    if (!isDismissable)
      return
    state.close()
  }, [isDismissable, state])

  const getModalProps = useCallback((): ViewProps => {
    return {
      ...rest,
    }
  }, [rest])

  const getBackdropProps = useCallback((): ViewProps => {
    return {
      onTap: handleBackdropTap,
    }
  }, [handleBackdropTap])

  return {
    Component,
    domRef: ref,
    classNames,
    slots,
    styles,
    children,
    isOpen: state.isOpen,
    isVisible,
    onClose: state.close,
    getModalProps,
    getBackdropProps,
  }
}

export type UseModalReturn = ReturnType<typeof useModal>
