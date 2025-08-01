import type { TaroElement } from '@tarojs/runtime'
import type { UseStackProps } from './use'
import { forwardRef } from 'react'
import { Box } from '../box'
import { useStack } from './use'

export interface StackProps extends UseStackProps { }

const Stack = forwardRef<TaroElement, StackProps>((props: UseStackProps, ref) => {
  const { children, getStackProps } = useStack({ ...props, ref })

  return (
    <Box {...getStackProps()}>
      {children}
    </Box>
  )
})

Stack.displayName = 'Srcube.Stack'

export default Stack
