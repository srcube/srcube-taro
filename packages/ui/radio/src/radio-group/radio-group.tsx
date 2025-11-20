import type { TaroElement } from '@tarojs/runtime'
import type { UseRadioGroupProps } from './use'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { RadioGroupProvider } from './context'
import { useRadioGroup } from './use'

export interface RadioGroupProps extends UseRadioGroupProps {}

const RadioGroup = forwardRef<TaroElement, RadioGroupProps>((props, ref) => {
  const { context, children, getGroupProps } = useRadioGroup({ ...props, ref })

  return (
    <RadioGroupProvider value={context}>
      <View {...getGroupProps()}>
        {children}
      </View>
    </RadioGroupProvider>
  )
})

RadioGroup.displayName = 'Srcube.RadioGroup'

export default RadioGroup
