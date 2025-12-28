import type { OverlayTriggerProps } from '@react-stately/overlays'
import type { DrawerContent, DrawerContentProps, DrawerProps } from '@srcube-taro/drawer'
import type { FieldProps } from '@srcube-taro/form'
import type { PickerSlots } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { PropsWithoutChildren } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactElement } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { picker } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

interface Props extends Omit<FieldProps, 'children' | 'value'>, OverlayTriggerProps {
  ref?: ReactRef
  fieldRef?: ReactRef
  fieldContent?: React.ReactNode
  drawerContent?: ReactElement<DrawerContentProps, typeof DrawerContent>
  children?: React.ReactNode
  classNames?: SlotsToClasses<PickerSlots>
  fieldProps?: FieldProps
  drawerProps?: DrawerProps
}

export type UsePickerProps = Props

export function usePicker(props: UsePickerProps) {
  const {
    ref,
    fieldRef,
    fieldProps,
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange,
    isDisabled,
    isReadonly,
    fieldContent,
    children,
    drawerContent,
    controlProps,
    drawerProps,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const { isOpen, open, close } = useOverlayTriggerState({
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen)
      if (!isOpen) {
        drawerProps?.onClose?.()
      }
    },
  })

  const handleOpen = useCallback(() => {
    if (isDisabled || isReadonly)
      return
    open()
  }, [isDisabled, isReadonly, open])

  const handleClose = useCallback(() => {
    close()
  }, [close])

  const handleClear = useCallback(() => {
    if (isDisabled || isReadonly)
      return
    rest.onClear?.()
  }, [isDisabled, isReadonly, rest])

  const getFieldProps = useCallback((props?: PropsWithoutChildren<FieldProps>): PropsWithoutChildren<FieldProps> => {
    return {
      ...fieldProps,
      ...props,
      ...rest,
      onClear: handleClear,
    }
  }, [fieldProps, rest, handleClear])

  const getControlProps = useCallback((props?: ViewProps): ViewProps => {
    return {
      role: 'button',
      tabIndex: 0,
      onClick: handleOpen,
      ...(props || {}),
      ...(controlProps || {}),
    } as ViewProps
  }, [handleOpen, controlProps])

  const getDrawerProps = useCallback((): DrawerProps => {
    return {
      isOpen,
      placement: 'bottom',
      onClose: handleClose,
      title: rest.label,
      ...(drawerProps || {}),
    }
  }, [isOpen, handleClose, rest.label, drawerProps])

  return {
    domRef,
    fieldRef,
    isOpen,
    children,
    fieldContent,
    drawerContent,
    getFieldProps,
    getControlProps,
    getDrawerProps,
    handleClear,
  }
}

export type UsePickerReturn = ReturnType<typeof usePicker>
