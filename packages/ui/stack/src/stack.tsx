import type { TaroElement } from '@tarojs/runtime'
import type { UseStackProps } from './use'
import { Box } from '@srcube-taro/box'
import { forwardRef } from 'react'
import { useStack } from './use'

export interface StackProps extends UseStackProps { }

const Stack = forwardRef<TaroElement, StackProps>((props: UseStackProps, ref) => {
  const { children, getStackProps } = useStack({ ...props, ref })

  return (
    <Box ref={ref} {...getStackProps()}>
      {children}
    </Box>
  )
})

Stack.displayName = 'Srcube.Stack'

export default Stack
