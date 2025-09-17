import type { ContextType } from './use'
import { createContext } from '@srcube-taro/utils-react'

export const [RadioGroupProvider, useRadioGroupContext] = createContext<ContextType>({
  name: 'RadioGroupContext',
  strict: false,
})
