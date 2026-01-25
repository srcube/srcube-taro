import type { CSSProperties, ReactElement, Ref } from 'react'
import type { ListboxRef, UseListboxProps } from './use'
import { Box } from '@srcube-taro/box'
import { Scrollbox } from '@srcube-taro/scrollbox'
import { mergeStyle } from '@srcube-taro/utils-func'
import { forwardRef } from 'react'
import { ListboxItem } from './_listbox-item'
import { useListbox } from './use'

export interface ListboxProps<T> extends UseListboxProps<T> {}

const Listbox = forwardRef(<T extends object>(props: ListboxProps<T>, ref: Ref<ListboxRef>) => {
  const {
    domRef,
    t,
    slots,
    state,
    items,
    orientation,
    isHorizontal,
    virtualizer,
    virtualItems,
    hideEmptyContent,
    isSticky,
    isActiveSticky,
    measureItem,
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
          <Box {...getEmptyContentProps()}>
            <Box className={slots._iEmpty()} />
            <Box>{props.emptyContent ?? t.empty}</Box>
          </Box>
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

        const style: CSSProperties = {
          position: 'absolute',
          top: 0,
          left: 0,
          ...(isHorizontal ? { bottom: 0, transform: `translateX(${virtualItem.start}px)` } : { right: 0, transform: `translateY(${virtualItem.start}px)` }),
          ...(isActiveSticky(virtualItem.index) ? { position: 'sticky', transform: `unset` } : {}),
          ...(isSticky(virtualItem.index) ? { zIndex: 1 } : {}),
        }

        return (
          <ListboxItem
            key={item.key}
            id={getItemId(item.index)}
            item={item}
            ref={measureItem(item, virtualItem.index) ? virtualizer.measureElement : undefined}
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
}) as <T extends object = object>(props: ListboxProps<T> & { ref?: Ref<ListboxRef> }) => ReactElement

export default Listbox
