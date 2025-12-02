import type { ToastSlots, ToastVariantProps } from '@srcube-taro/theme'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps } from '@srcube-taro/utils-types'
import type { ReactNode } from 'react'
import { toast } from '@srcube-taro/theme'
import { useMemo } from 'react'

export interface Props {
  /**
   * Whether the toast is open
   */
  // isOpen?: boolean
  /**
   *
   */
  // defaultOpen?: boolean
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
   * The end content to display in the toast
   */
  endContent?: ReactNode
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
    endContent,
    duration,
    autoDismiss = true,
  } = props

  const slots = useMemo(() => toast({
    color,
  }), [color])

  const styles = useMemo(() => ({
    wrapper: slots.base(),
    icon: slots.icon(),
    content: slots.content(),
    title: slots.title(),
    _icon: slots._icon(),
  }
  ), [slots])

  return {
    styles,
    title,
    content,
    icon,
    endContent,
    duration,
    autoDismiss,
  }
}

export type UseToastReturn = ReturnType<typeof useToast>
