import type { ToastSlots, ToastVariantProps } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps } from '@srcube-taro/utils-types'
import type { ReactNode } from 'react'
import { toast } from '@srcube-taro/theme'
import { useMemo } from 'react'

export interface Props {
  /**
   * The title of the toast
   */
  title?: string
  /**
   * The content of the toast
   */
  content?: ReactNode
  /**
   * The color of the toast
   */
  color?: ToastVariantProps['color']
  /**
   * The icon to display in the toast
   */
  icon?: ReactNode
  /**
   * The duration of the toast in milliseconds
   * @default 1500
   */
  duration?: number
  /**
   * Whether to auto dismiss the toast
   * @default true
   */
  autoDismiss?: boolean
  /**
   * The class names to apply to the toast slots
   */
  classNames?: SlotsToClasses<Exclude<ToastSlots, '_icon'>>
}

export type UseToastProps = MergeVariantProps<Props, ToastVariantProps>

export function useToast(props: UseToastProps) {
  const {
    title,
    content,
    color,
    icon,
    duration,
    autoDismiss = true,
  } = props

  const slots = useMemo(() => toast({
    color,
  }), [color])

  return {
    slots,
    title,
    content,
    icon,
    duration,
    autoDismiss,
  }
}

export type UseToastReturn = ReturnType<typeof useToast>
