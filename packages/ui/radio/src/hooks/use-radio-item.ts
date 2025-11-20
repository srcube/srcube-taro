import type { RadioGroupState } from '@react-stately/radio'
import type { ITouchEvent } from '@tarojs/components'
import type { RadioProps } from '../radio'

export interface RadioItemResult {
  isSelected?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  onChange?: (e: any) => void
}

// eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix
export function useRadioItem(props: RadioProps, groupState: RadioGroupState): RadioItemResult {
  const value = props.value ?? ''

  const isSelected = groupState?.selectedValue === value

  const isDisabled = props?.isDisabled ?? groupState?.isDisabled

  const isReadOnly = props?.isReadOnly ?? groupState?.isReadOnly

  const onChange = (e: ITouchEvent) => {
    e.stopPropagation()

    groupState.setSelectedValue(value)
  }

  return {
    isSelected,
    isDisabled,
    isReadOnly,
    onChange,
  }
}
