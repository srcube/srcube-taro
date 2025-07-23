import type { CheckboxGroupState } from '@react-stately/checkbox'
import type { CheckboxProps } from '../checkbox'
import { useToggleState } from '@react-stately/toggle'

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

  const isSelected = defaultSelected

  const isDisabled = isInGroup
    ? groupState.isDisabled
    : props.isDisabled

  const isReadOnly = isInGroup
    ? groupState.isReadOnly
    : props.isReadOnly

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
