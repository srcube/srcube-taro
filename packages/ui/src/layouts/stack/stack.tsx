import { type ViewProps } from '@tarojs/components'
import { forwardRef } from 'react'
import { useStack, UseStackProps } from './use'

export interface StackProps extends UseStackProps {}

const Stack = forwardRef<ViewProps, StackProps>((props: UseStackProps, ref) => {
  const { Component, domRef, children, getStackProps } = useStack(props)

  return (
    <Component ref={domRef} {...getStackProps()}>
      {children}
    </Component>
  )
})

Stack.displayName = 'Srcube.Stack'

export default Stack
