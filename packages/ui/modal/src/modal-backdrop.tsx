import type { NativeProps } from '@srcube-taro/utils-types'
import type { ITouchEvent, ViewProps } from '@tarojs/components'
import type { ModalRef } from './use'
import { View } from '@tarojs/components'
import { forwardRef, useCallback } from 'react'
import { useModalContext } from './context'

export interface ModalBackdropProps extends NativeProps<ViewProps> {}

const ModalBackdrop = forwardRef<ModalRef, ModalBackdropProps>((props, ref) => {
  const { className, children, onTap, ...rest } = props

  const { slots, classNames, isDismissable, hasBackdrop, close } = useModalContext()

  const handleTap = useCallback((e: ITouchEvent) => {
    if (!isDismissable)
      return

    onTap?.(e)

    try {
      close()
    }
    catch (error) {
      // @ts-expect-error process env
      if (process.env.NODE_ENV === 'development') {
        console.error('[Modal] Backdrop tap failed:', error)
      }
    }
  }, [isDismissable, onTap, close])

  if (!hasBackdrop) {
    return null
  }

  return (
    <View
      ref={ref}
      className={slots.backdrop({ class: [classNames?.backdrop, className] })}
      onClick={handleTap}
      {...rest}
    >
      {children}
    </View>
  )
})

ModalBackdrop.displayName = 'Srcube.ModalBackdrop'

export default ModalBackdrop
