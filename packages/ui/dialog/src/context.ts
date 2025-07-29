import type { UseDialogReturn } from './use'
import { createContext } from '@srcube-taro/utils-react'

interface ContextType extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<ContextType>({
  name: 'DialogContext',
  strict: false,
  errorMessage: 'useDialogContext: `context` is undefined. Seems you forgot to wrap all dialog components within `<Dialog />`',
})
