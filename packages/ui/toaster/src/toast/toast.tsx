import type { UseToastProps } from './use'
import { View } from '@tarojs/components'
import { useToast } from './use'

export interface ToastProps extends UseToastProps {
  id?: string
  onClose?: () => void
}

export function Toast(props: ToastProps) {
  const { slots, icon, title, content } = useToast(props)

  return (
    <View
      className={slots.wrapper()}
    >
      <View className={slots.icon()}>
        {icon || <View className={slots._icon()} />}
      </View>

      {title && (
        <View className={slots.title()}>
          {title}
        </View>
      )}

      {content && (
        <View className={slots.content()}>
          {content}
        </View>
      )}
    </View>
  )
}

Toast.displayName = 'SrucbeUI.Toast'

export default Toast
