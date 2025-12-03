import type { UseToastProps } from './use'
import { View } from '@tarojs/components'
import { useToast } from './use'

export interface ToastProps extends UseToastProps {
  id?: string
  onClose?: () => void
}

export function Toast(props: ToastProps) {
  const { styles, icon, title, content, endContent } = useToast(props)

  return (
    <View
      className={styles.wrapper}
    >
      <View className={styles.icon}>
        {icon || <View className={styles._icon} />}
      </View>

      {title && (
        <View className={styles.title}>
          {title}
        </View>
      )}

      {content && (
        <View className={styles.content}>
          {content}
        </View>
      )}

      {endContent && (
        <View className="ml-auto">
          {endContent}
        </View>
      )}
    </View>
  )
}

Toast.displayName = 'SrucbeUI.Toast'

export default Toast
