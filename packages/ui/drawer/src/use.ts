import type { ModalProps } from '@srcube-taro/modal'
import type { DrawerSlots, DrawerVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-taro'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { useAnimatePresence, useOverlayTriggerState } from '@srcube-taro/hooks'
import { drawer } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import Taro from '@tarojs/taro'
import cn from 'classnames'
import { useCallback, useMemo } from 'react'

interface Props extends ModalProps {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * Drawer placement
   * @default right
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * Drawer title
   */
  title?: ReactNode
  /**
   * Classnames to apply to the drawer
   */
  classNames?: SlotsToClasses<Exclude<DrawerSlots, ''>>
}

export type UseDrawerProps = Props &
  Omit<NativeProps<ViewProps>, ''> &
  Omit<DrawerVariantProps, 'hasCustomNavigation'>

export function useDrawer(props: UseDrawerProps) {
  const {
    ref,
    isOpen,
    defaultOpen,
    isDismissable,
    placement = 'bottom',
    title,
    children,
    className,
    classNames,
    onOpenChange,
    onClose,
    ...rest
  } = props

  const pages = Taro.getCurrentPages()

  const domRef = useDOMRef(ref)

  const { isClosing } = useAnimatePresence({ isOpen })

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

  const hasCustomNavigation = useMemo(() => {
    const p = pages.length - 1

    return pages[p].config.navigationStyle === 'custom'
  }, [pages])

  const slots = useMemo(() => drawer({ isOpen, placement, hasCustomNavigation }), [isOpen, placement, hasCustomNavigation])

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

  const getModalProps = useCallback((): ModalProps => {
    return {
      ref: domRef,
      isOpen,
      defaultOpen,
      isDismissable,
      onOpenChange,
      onClose,
      // className: styles.wrapper,
      classNames: styles,
      ...rest,
    }
  }, [domRef, isOpen, defaultOpen, isDismissable, onOpenChange, onClose, styles, rest])

  return {
    domRef,
    slots,
    styles,
    title,
    isOpen: state.isOpen,
    isDismissable,
    children,
    onClose: state.close,
    getModalProps,
  }
}

export type UseDrawerReturn = ReturnType<typeof useDrawer>
