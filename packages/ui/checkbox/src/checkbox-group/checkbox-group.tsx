import type { TaroElement } from '@tarojs/runtime'
import type { UseCheckboxGroupProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { CheckboxGroupProvider } from './context'
import { useCheckboxGroup } from './use'

export interface CheckboxGroupProps extends UseCheckboxGroupProps {}

const CheckboxGroup = forwardRef<TaroElement, CheckboxGroupProps>((props, ref) => {
  const { context, children, getGroupProps } = useCheckboxGroup({ ...props, ref })

  return (
    <CheckboxGroupProvider value={context}>
      <View {...getGroupProps()}>
        {children}
      </View>
    </CheckboxGroupProvider>
  )
})

CheckboxGroup.displayName = 'Srcube.CheckboxGroup'

export default CheckboxGroup
