import type { ViewProps } from '@tarojs/components'
import type { UseCheckboxGroupProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { CheckboxGroupProvider } from './context'
import { useCheckboxGroup } from './use'

export interface CheckboxGroupProps extends UseCheckboxGroupProps {}

const CheckboxGroup = forwardRef<ViewProps, CheckboxGroupProps>((props, ref) => {
  const { context, children, getGroupProps } = useCheckboxGroup(props)

  return (
    <CheckboxGroupProvider value={context}>
      <View ref={ref} {...getGroupProps()}>
        {children}
      </View>
    </CheckboxGroupProvider>
  )
})

CheckboxGroup.displayName = 'Srcube.CheckboxGroup'

export default CheckboxGroup
