import type { Node } from '@react-types/shared'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ValuesType } from '../use'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback } from 'react'

type OmitNativeKeys = ''

interface Props<T extends object = object> extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  ref?: ReactRef
  item: Node<T>
  values: ValuesType<T>
  index?: number
  className?: string
  isMeasuring?: boolean
}

export type UseTabProps<T extends object = object> = Props<T>

export function useTab<T extends object = object>(props: UseTabProps<T>) {
  const { ref, item, values, className, index, isMeasuring, onTap, ...rest } = props

  const domRef = useDOMRef(ref)
  const key = item.key

  const isSelected = values.state.selectedKey === key
  const isDisabledItem = values.state.disabledKeys?.has(key) ?? false
  const isDisabled = !!values.isDisabled || isDisabledItem

  const handleTap = useCallback(
    (e: any) => {
      if (isDisabled || isMeasuring)
        return
      values.state.setSelectedKey(key)
      onTap?.(e)
    },
    [isDisabled, isMeasuring, key, values.state, onTap],
  )

  const getTabProps = useCallback(() => ({
    'id': `${values.ids.item}-${key}`,
    'data-index': index,
    'className': values.slots.tab({ isSelected, isDisabled, class: [values.classNames?.tab, className] }),
    'onClick': handleTap,
    ...rest,
  }), [values.slots, values.classNames, key, className, isSelected, isDisabled, rest, values.ids, index, handleTap])

  const getTabContentProps = useCallback(() => ({
    className: values.slots.tabContent({ isSelected, class: values.classNames?.tabContent }),
  }), [values.slots, values.classNames, isSelected])

  const getCursorProps = useCallback(() => ({
    className: values.slots.cursor({ class: values.classNames?.cursor }),
  }), [values.slots, values.classNames])

  return {
    domRef,
    isSelected,
    getTabProps,
    getTabContentProps,
    getCursorProps,
  }
}

export type UseTabReturn = ReturnType<typeof useTab>
