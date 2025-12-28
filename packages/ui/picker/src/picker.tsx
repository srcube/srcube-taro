import type { TaroElement } from '@tarojs/runtime'
import type { UsePickerProps } from './use'
import { Drawer, DrawerContent } from '@srcube-taro/drawer'
import { Field } from '@srcube-taro/form'
import { View } from '@tarojs/components'
import { forwardRef, isValidElement } from 'react'
import { usePicker } from './use'

export interface PickerProps extends UsePickerProps {}

const Picker = forwardRef<TaroElement, PickerProps>((props, ref) => {
  const {
    domRef,
    fieldRef,
    fieldContent,
    drawerContent,
    getFieldProps,
    getControlProps,
    getDrawerProps,
    handleClear,
  } = usePicker({
    ...props,
    ref,
  })

  if (!isValidElement(drawerContent) || drawerContent.type !== DrawerContent) {
    throw new Error('Picker drawerContent must be a <DrawerContent /> element')
  }

  return (
    <>
      <Field ref={fieldRef} {...getFieldProps()} onClear={handleClear}>
        {({ id, inputClass }) => (
          <View id={id} ref={domRef} {...getControlProps({ className: inputClass })}>
            {fieldContent}
          </View>
        )}
      </Field>

      <Drawer {...getDrawerProps()}>
        {drawerContent}
      </Drawer>
    </>
  )
})

Picker.displayName = 'Srcube.Picker'

export default Picker
