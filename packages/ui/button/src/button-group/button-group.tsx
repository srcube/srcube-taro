import type { ViewProps } from '@tarojs/components'
import type { UseButtonGroupProps } from './use'
import { forwardRef } from 'react'
import { ButtonGroupProvider } from './context'
import { useButtonGroup } from './use'

export interface ButtonGroupProps extends UseButtonGroupProps { }

const ButtonGroup = forwardRef<ViewProps, ButtonGroupProps>((props, ref) => {
  const { Component, domRef, context, children, getGroupProps } = useButtonGroup({ ...props, ref })

  return (
    <ButtonGroupProvider value={context}>
      <Component ref={domRef} {...getGroupProps()}>
        {children}
      </Component>
    </ButtonGroupProvider>
  )
})

ButtonGroup.displayName = 'Srcube.ButtonGroup'

export default ButtonGroup
