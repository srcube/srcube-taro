import type { ContextType } from './use'
import { createContext } from '@srcube-taro/utils-react'

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<ContextType>({
  name: 'CheckboxGroupContext',
  strict: false,
})
