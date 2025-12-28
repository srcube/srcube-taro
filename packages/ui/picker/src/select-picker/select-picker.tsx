import type { UseSelectPickerProps } from './use'
import { Button } from '@srcube-taro/button'
import { DrawerBody, DrawerContent, DrawerFooter } from '@srcube-taro/drawer'
import { ScrollView, View } from '@tarojs/components'
import { Picker } from '..'
import { useSelectPicker } from './use'

export interface SelectPickerProps extends UseSelectPickerProps {}

function SelectPicker(props: SelectPickerProps) {
  const {
    slots,
    items,
    draft,
    i18n,
    handleConfirm,
    getPickerProps,
    getScrollViewProps,
    getItemProps,
  } = useSelectPicker(props)

  const content = (
    <DrawerContent>
      <DrawerBody className={slots.content()}>
        <View className={slots.maskTop()} />
        <ScrollView {...getScrollViewProps()}>
          {/* <View style={{ height: `${paddingTop}px` }} /> */}
          {items.map(item => (
            <View key={item.value} {...getItemProps(item)}>
              {item.label}
            </View>
          ))}
          {/* <View style={{ height: `${paddingBottom}px` }} /> */}
        </ScrollView>
        <View className={slots.maskBottom()} />
      </DrawerBody>
      <DrawerFooter>
        <Button
          color="primary"
          variant="flat"
          fullWidth
          onTap={handleConfirm}
        >
          {i18n.confirm}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  )

  return (
    <Picker {...getPickerProps()} drawerContent={content} />
  )
}

SelectPicker.displayName = 'SelectPicker'

export default SelectPicker
