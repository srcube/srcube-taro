import type { ModalProps, ModalRef } from '@srcube-taro/modal'
import type { DrawerSlots, DrawerVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps } from '@srcube-taro/utils-types'
import type { ReactNode } from 'react'
import { useOverlayTriggerState } from '@srcube-taro/hooks'
import { drawer } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { getCurrentPages } from '@tarojs/taro'
import { useCallback, useMemo } from 'react'

interface Props extends ModalProps {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef<DrawerRef>
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

export interface DrawerRef extends ModalRef {}

export type UseDrawerProps = MergeVariantProps<Props, DrawerVariantProps>

export function useDrawer(props: UseDrawerProps) {
  const {
    ref,
    isOpen: isOpenProp,
    defaultOpen,
    isDismissable = true,
    placement = 'bottom',
    title,
    children,
    className,
    classNames,
    onOpenChange,
    onClose,
    ...rest
  } = props

  const pages = getCurrentPages()

  const domRef = useDOMRef(ref)

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

  const hasCustomNavigation = useMemo(() => {
    const p = pages.length - 1

    return pages[p].config.navigationStyle === 'custom'
  }, [pages])

  const slots = useMemo(() => drawer({ isOpen, placement, hasCustomNavigation }), [isOpen, placement, hasCustomNavigation])

  const getModalProps = useCallback((): ModalProps => {
    return {
      ref: domRef,
      isOpen,
      defaultOpen,
      isDismissable,
      onOpenChange,
      onClose: close,
      classNames: {
        'root-portal': slots['root-portal']({ className: classNames?.['root-portal'] }),
        'backdrop': slots.backdrop({ className: classNames?.backdrop }),
        'content': slots.content({ className: [classNames?.content, className] }),
        'header': slots.header({ className: classNames?.header }),
        'body': slots.body({ className: classNames?.body }),
        'footer': slots.footer({ className: classNames?.footer }),
      },
      ...rest,
    }
  }, [domRef, isOpen, defaultOpen, isDismissable, onOpenChange, close, slots, classNames, className, rest])

  return {
    domRef,
    slots,
    classNames,
    title,
    placement,
    isOpen,
    isDismissable,
    children,
    open,
    close,
    getModalProps,
  }
}

export type UseDrawerReturn = ReturnType<typeof useDrawer>
