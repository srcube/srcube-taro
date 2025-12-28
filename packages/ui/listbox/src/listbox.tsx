import type { TaroElement } from '@tarojs/runtime'
import type { CSSProperties, ReactElement, Ref } from 'react'
import type { UseListboxProps } from './use'
import { Scrollbox } from '@srcube-taro/scrollbox'
import { mergeStyle } from '@srcube-taro/utils-func'
import { View } from '@tarojs/components'
import { forwardRef } from 'react'
import { ListboxItem } from './_listbox-item'
import { useListbox } from './use'

export interface ListboxProps<T> extends UseListboxProps<T> {}

const Listbox = forwardRef(<T extends object>(props: ListboxProps<T>, ref: Ref<TaroElement>) => {
  const {
    domRef,
    state,
    items,
    orientation,
    isHorizontal,
    virtualizer,
    virtualItems,
    hideEmptyContent,
    getItemId,
    getScrollboxProps,
    getEmptyContentProps,
  } = useListbox<T>({
    ...props,
    ref,
  })

  // Render empty state
  if (state.collection.size === 0) {
    if (!hideEmptyContent) {
      return (
        <Scrollbox ref={domRef} {...getScrollboxProps()}>
          <View {...getEmptyContentProps()}>No items.</View>
        </Scrollbox>
      )
    }
    return null
  }

  return (
    <Scrollbox
      ref={domRef}
      {...getScrollboxProps()}
    >
      {/* Expand content to help mask measure */}
      {/* ! :::EXPAND CONTENT ITEM::: */}
      {orientation === 'xy' && items.length > 0 && <ListboxItem key={items[0].key} item={items[0]} {...items[0].props} style={{ opacity: 0, ...(isHorizontal ? { width: 'max-content' } : { height: 'max-content' }) }} />}
      {/* ! :::EXPAND CONTENT ITEM::: */}
      {virtualItems.map((virtualItem) => {
        if (!virtualItem)
          return null

        const item = items[virtualItem.index]
        if (!item)
          return null

        const style: CSSProperties = isHorizontal
          ? {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              // width: `${virtualItem.size}px`,
              transform: `translateX(${virtualItem.start}px)`,
            }
          : {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              // height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }

        return (
          <ListboxItem
            key={item.key}
            id={getItemId(item.index)}
            item={item}
            ref={virtualizer.measureElement}
            data-index={virtualItem.index}
            data-type={item.type}
            {...item.props}
            style={mergeStyle(style, item.props?.style)}
          >
            {item.rendered}
          </ListboxItem>
        )
      })}
    </Scrollbox>
  )
}) as <T extends object = object>(props: ListboxProps<T> & { ref?: Ref<TaroElement> }) => ReactElement

export default Listbox
