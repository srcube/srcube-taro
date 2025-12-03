import type { UseToasterReturn } from './use'
import { createContext } from '@srcube-taro/utils-react'

interface ContextType extends UseToasterReturn {}

export const [ToastProvider, useToastContext] = createContext<ContextType>({
  name: 'ToastContext',
  strict: false,
  errorMessage: 'useToastContext: `context` is undefined. Seems you forgot to wrap all toast components within `<Toast />`',
})
