import type { ModalRef } from '@srcube-taro/modal'
import type { ToasterVariantProps } from '@srcube-taro/theme'
import type { MergeVariantProps } from '@srcube-taro/utils-types'
import type { ToastItem } from './registry'
import { toaster } from '@srcube-taro/theme'
import { useEffect, useMemo, useState } from 'react'
import { subscribeToasts } from './registry'

interface Props {
}

export interface ToastRef extends ModalRef {}

// type OmitVariantKey = 'iSuccess' | 'iInfo' | 'iWarning' | 'iDanger'

export type UseToasterProps = MergeVariantProps<Props, ToasterVariantProps>

export function useToaster(_props: UseToasterProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    // Force update when currentToasts changes
    const unsubscribe = subscribeToasts((currentToasts) => {
      setToasts([...currentToasts])
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const slots = useMemo(() => toaster({
    // color,
    // hasIcon: icon !== undefined,
    // hasEndContent: endContent !== undefined,
  }), [])

  const styles = useMemo(() => ({
    wrapper: slots.base(),
  }), [slots])

  return {
    styles,
    toasts,
  }
}

export type UseToasterReturn = ReturnType<typeof useToaster>
