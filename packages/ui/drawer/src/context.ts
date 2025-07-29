import type { UseDrawerReturn } from './use'
import { createContext } from '@srcube-taro/utils-react'

interface ContextType extends UseDrawerReturn {}

export const [DrawerProvider, useDrawerContext] = createContext<ContextType>({
  name: 'DrawerContext',
  strict: false,
  errorMessage: 'useDrawerContext: `context` is undefined. Seems you forgot to wrap all drawer components within `<Drawer />`',
})
