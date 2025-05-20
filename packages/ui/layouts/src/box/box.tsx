import type { ViewProps } from '@tarojs/components'
import type { UseBoxProps } from './use'
import { forwardRef } from 'react'
import { useBox } from './use'

export interface BoxProps extends UseBoxProps { }

const Box = forwardRef<ViewProps, BoxProps>((props: UseBoxProps, ref) => {
  const { Component, domRef, children, getBoxProps } = useBox({ ...props, ref })

  return (
    <Component {...getBoxProps()} ref={domRef}>
      {children}
    </Component>
  )
})

Box.displayName = 'Srcube.Box'

export default Box
