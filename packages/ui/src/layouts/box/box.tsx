import { type ViewProps } from '@tarojs/components'
import { forwardRef } from 'react'
import { useBox, UseBoxProps } from './use'

export interface BoxProps extends UseBoxProps {}

const Box = forwardRef<ViewProps, BoxProps>((props: UseBoxProps, ref) => {
  const { Component, domRef, children, getBoxProps } = useBox(props)

  return (
    <Component ref={domRef} {...getBoxProps()}>
      {children}
    </Component>
  )
})

Box.displayName = 'Srcube.Box'

export default Box