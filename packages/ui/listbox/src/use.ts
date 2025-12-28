import type { ListState } from '@react-stately/list'
import type { CollectionBase, MultipleSelection, Node } from '@react-types/shared'
import type { VirtualizerOptions } from '@srcube-taro/hooks'
import type { ScrollboxProps } from '@srcube-taro/scrollbox'
import type { ListboxSlots } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { BaseEventOrig, ScrollViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import type { CSSProperties, ReactNode } from 'react'
import { useListState } from '@react-stately/list'
import { useVirtualizer } from '@srcube-taro/hooks'
import { listbox } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo, useRef } from 'react'

type OmitNativeKeys = 'children'

function flattenCollection<T>(collection: Iterable<Node<T>>): Node<T>[] {
  const items: Node<T>[] = []
  for (const item of collection) {
    if (item.type === 'section') {
      items.push(item)
      if (item.childNodes) {
        items.push(...flattenCollection(item.childNodes))
      }
    }
    else {
      items.push(item)
    }
  }
  return items
}

interface Props<T> extends Omit<ScrollboxProps, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * The controlled state of the listbox.
   */
  state?: ListState<T>
  /**
   * The number of items to render above and below the visible area.
   * @default 5
   */
  overscan?: number
  /**
   *  Provides content to display when there are no items.
   * @default "No items."
   */
  emptyContent?: ReactNode
  /**
   * Whether to not display the empty content when there are no items.
   * @default false
   */
  hideEmptyContent?: boolean
  /**
   * Class names to apply to the listbox slots.
   */
  classNames?: SlotsToClasses<ListboxSlots> & ScrollboxProps['classNames']
  /**
   * Virtualizer options
   */
  virtualizerOptions?: Partial<VirtualizerOptions<any, any>> & { }
}

export type UseListboxProps<T> = Props<T> & CollectionBase<T> & MultipleSelection

export function useListbox<T extends object>(props: UseListboxProps<T>) {
  const {
    ref,
    state: stateProp,
    items: itemsProp, // We use state.collection mostly, but props.items might be passed
    orientation = 'y',
    overscan = 5,
    onScroll,
    emptyContent,
    hideEmptyContent = false,
    classNames,
    id: idProp,
    virtualizerOptions,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const innerState = useListState<T>(props)
  const state = stateProp ?? innerState

  // @ts-expect-error ignore process type check
  if (process.env.NODE_ENV === 'development' && orientation === 'xy' && virtualizerOptions?.horizontal === undefined) {
    console.warn('[Listbox] Virtualizer only supports single-axis scrolling. Defaulting to vertical. Pass "virtualizerOptions={{ horizontal: true }}" if you want horizontal virtualization.')
  }

  const isHorizontal = useMemo(
    () => orientation === 'x' || (orientation === 'xy' && !!virtualizerOptions?.horizontal),
    [orientation, virtualizerOptions?.horizontal],
  )

  const items = useMemo(() => flattenCollection(state.collection), [state.collection])

  const defaultEstimateSize = isHorizontal ? 100 : 50
  const estimateSize = virtualizerOptions?.estimateSize ?? (() => defaultEstimateSize)

  const slots = useMemo(() => listbox(), [])

  // We always run the hook
  const virtualizer = useVirtualizer<TaroElement, TaroElement>({
    count: items.length,
    estimateSize,
    getScrollElement: () => domRef.current,
    overscan,
    horizontal: isHorizontal,
    ...virtualizerOptions, // Pass options to virtualizer
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  const handleScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    virtualizer.handleScroll(e)
    onScroll?.(e)
  }, [virtualizer, onScroll])

  const idBaseRef = useRef(`srcube-${Math.random().toString(36).slice(2, 10)}`)

  const defaultId = useMemo(() => `${idBaseRef.current}-listbox`, [idBaseRef])
  const id = idProp || defaultId

  const getItemId = useCallback((index: number) => `${idBaseRef.current}-listbox-item-${index}`, [])

  const contentRect = useMemo(() => {
    const width = isHorizontal ? totalSize : orientation === 'xy' ? 'max-content' : '100%'
    const height = !isHorizontal ? totalSize : orientation === 'xy' ? 'max-content' : '100%'

    return { width, height }
  }, [isHorizontal, orientation, totalSize])

  const getContentProps = useCallback(() => {
    const style: CSSProperties = {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      ...contentRect,
    }
    return { style, className: slots.list({ class: [classNames?.content] }) }
  }, [isHorizontal, contentRect, slots, classNames])

  const getScrollboxProps = useCallback((): Partial<Omit<ScrollboxProps, OmitNativeKeys>> => ({
    id,
    orientation,
    onScroll: handleScroll,
    contentProps: getContentProps(),
    ...rest,
  }), [id, orientation, handleScroll, getContentProps, rest])

  const getEmptyContentProps = useCallback(() => ({
    className: slots.emptyContent({ class: [classNames?.emptyContent] }),
  }), [slots, classNames])

  return {
    domRef,
    idBaseRef,
    state,
    items,
    slots,
    orientation,
    isHorizontal,
    hideEmptyContent,
    virtualItems,
    virtualizer,
    getItemId,
    getScrollboxProps,
    getEmptyContentProps,
    getContentProps,
  }
}

export type UseListboxReturn<T extends object> = ReturnType<typeof useListbox<T>>
