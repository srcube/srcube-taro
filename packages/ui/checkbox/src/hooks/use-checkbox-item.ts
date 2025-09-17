import type { CheckboxGroupState } from '@srcube-taro/hooks'
import type { CheckboxProps } from '../checkbox'
import { useToggleState } from '@srcube-taro/hooks'

export interface CheckboxItemResult {
  isSelected?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isIndeterminate: boolean | undefined
  toggle: () => void
}

export function useCheckboxItem(props: CheckboxProps, groupState?: CheckboxGroupState): CheckboxItemResult {
  const isInGroup = !!groupState

  const value = props.value ?? ''

  const defaultSelected = isInGroup
    ? groupState.isSelected(value)
    : props.defaultSelected

  const isSelected = isInGroup
    ? groupState.isSelected(value)
    : props?.isSelected

  const isDisabled = isInGroup
    ? props?.isDisabled ?? groupState.isDisabled
    : props?.isDisabled

  const isReadOnly = isInGroup
    ? props?.isReadOnly ?? groupState.isReadOnly
    : props?.isReadOnly

  const onChange = isInGroup
    ? (isSelected: boolean) => {
        if (isSelected)
          groupState.addValue(value)
        else groupState.removeValue(value)
      }
    : props.onChange

  const toggleState = useToggleState({
    defaultSelected,
    isSelected,
    isDisabled,
    isReadOnly,
    onChange,
  })

  return {
    isSelected: toggleState.isSelected,
    isDisabled,
    isReadOnly,
    isIndeterminate: props.isIndeterminate,
    toggle: toggleState.toggle,
  }
}
