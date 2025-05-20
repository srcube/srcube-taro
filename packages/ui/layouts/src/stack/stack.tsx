import type { ViewProps } from '@tarojs/components'
import type { UseStackProps } from './use'
import { forwardRef } from 'react'
import { useStack } from './use'

export interface StackProps extends UseStackProps { }

const Stack = forwardRef<ViewProps, StackProps>((props: UseStackProps, ref) => {
  const { Component, domRef, children, getStackProps } = useStack({ ...props, ref })

  return (
    <Component ref={domRef} {...getStackProps()}>
      {children}
    </Component>
  )
})

Stack.displayName = 'Srcube.Stack'

export default Stack
