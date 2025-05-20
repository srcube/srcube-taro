import type { ContextType } from './use'
import { createContext } from '@srcube-taro/utils-react'

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ContextType>({
  name: 'ButtonGroupContext',
  strict: false,
})
