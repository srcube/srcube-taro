import type { UseModalReturn } from './use'
import { createContext } from '@srcube-taro/utils-react'

interface ContextType extends UseModalReturn {}

export const [ModalProvider, useModalContext] = createContext<ContextType>({
  name: 'ModalContext',
  strict: false,
  errorMessage: 'useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Modal />`',
})
