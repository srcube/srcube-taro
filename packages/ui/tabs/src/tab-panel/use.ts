import type { Node } from '@react-types/shared'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ValuesType } from '../use'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback } from 'react'

type OmitNativeKeys = ''

interface Props<T extends object = object> extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  /**
   * The tab panel ref
   */
  ref?: ReactRef
  /**
   * The tab key to render
   */
  tabKey: Node<T>['key']
  /**
   * The tab list state
   */
  state: ValuesType['state']
  /**
   * Component slots classes
   */
  slots: ValuesType['slots']
  /**
   * User custom classnames
   */
  classNames?: ValuesType['classNames']
  /**
   * Whether to destroy inactive tab panel
   */
  destroyInactiveTabPanel?: boolean
  /**
   * User custom classname
   */
  className?: string
}

export type UseTabPanelProps<T extends object = object> = Props<T>

export function useTabPanel<T extends object = object>(props: UseTabPanelProps<T>) {
  const { ref, tabKey, state, slots, classNames, destroyInactiveTabPanel, className, ...rest } = props

  const domRef = useDOMRef(ref)

  const isSelected = state.selectedKey === tabKey
  const content = state.collection.getItem(tabKey)!.props.children

  const getPanelProps = useCallback((): ViewProps => ({
    className: slots.panel({ class: [classNames?.panel, className] }),
    ...rest,
  }), [slots, classNames, className, rest])

  return {
    domRef,
    isSelected,
    content,
    getPanelProps,
  }
}

export type UseTabPanelReturn = ReturnType<typeof useTabPanel>
