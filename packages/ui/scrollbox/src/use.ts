import type { ScrollboxSlots, ScrollboxVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { BaseEventOrig, ScrollViewProps, ViewProps } from '@tarojs/components'
import { scrollbox } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { $ } from '@tarojs/extend'
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

type OmitNativeKeys = 'scrollY' | 'scrollX'

interface Props extends Omit<NativeProps<ScrollViewProps>, OmitNativeKeys> {
  ref?: ReactRef
  classNames?: SlotsToClasses<ScrollboxSlots>
  wrapperProps?: ViewProps
  contentProps?: ViewProps
}

export type UseScrollboxProps = MergeVariantProps<Props, ScrollboxVariantProps, 'showMaskTop' | 'showMaskBottom' | 'showMaskLeft' | 'showMaskRight'>

export function useScrollbox(props: UseScrollboxProps) {
  const {
    ref,
    children,
    className,
    classNames,
    enhanced = true,
    enableFlex = true,
    showScrollbar = false,
    orientation = 'y',
    hideMask,
    wrapperProps,
    contentProps,
    onScroll,
    id,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const canScrollY = orientation === 'y' || orientation === 'xy'
  const canScrollX = orientation === 'x' || orientation === 'xy'

  const [masks, setMasks] = useState({ top: false, bottom: false, left: false, right: false })

  const idRef = useRef(`scrollbox-${Math.random().toString(36).slice(2, 10)}`)
  const containerRef = useRef<{ width: number, height: number }>({ width: 0, height: 0 })
  const contentRef = useRef<{ width: number, height: number }>({ width: 0, height: 0 })

  const ids = useMemo(() => ({
    container: id ?? idRef.current,
    content: contentProps?.id ?? `${id ?? idRef.current}-content`,
  }), [id, contentProps?.id])

  useLayoutEffect(() => {
    (async () => {
      try {
        const el = $(`#${ids.container}`)
        if (!el)
          return
        const [w, h] = await Promise.all([el.width?.() || 0, el.height?.() || 0])
        containerRef.current = { width: Number(w || 0), height: Number(h || 0) }

        const content = $(`#${ids.content}`)
        const [cw, ch] = await Promise.all([content?.width?.() || 0, content?.height?.() || 0])
        contentRef.current = { width: Number(cw || 0), height: Number(ch || 0) }

        const threshold = 10
        const maxTop = Math.max(0, contentRef.current.height - containerRef.current.height)
        const maxLeft = Math.max(0, contentRef.current.width - containerRef.current.width)

        setMasks({
          top: false,
          bottom: canScrollY && maxTop > threshold,
          left: false,
          right: canScrollX && maxLeft > threshold,
        })
      }
      catch {}
    })()
  }, [canScrollY, canScrollX, ids.container, ids.content])

  const slots = useMemo(() => scrollbox({
    orientation,
    hideMask,
    showMaskTop: masks.top,
    showMaskBottom: masks.bottom,
    showMaskLeft: masks.left,
    showMaskRight: masks.right,
  }), [orientation, hideMask, masks])

  const handleScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    const left = e.detail?.scrollLeft ?? 0
    const top = e.detail?.scrollTop ?? 0
    const ch = containerRef.current.height
    const cw = containerRef.current.width

    const threshold = 10
    const maxTop = Math.max(0, contentRef.current.height - ch)
    const maxLeft = Math.max(0, contentRef.current.width - cw)

    setMasks({
      top: canScrollY && top > threshold,
      bottom: canScrollY && top < (maxTop - threshold),
      left: canScrollX && left > threshold,
      right: canScrollX && left < (maxLeft - threshold),
    })

    onScroll?.(e)
  }, [canScrollY, canScrollX, onScroll])

  const getWrapperProps = useCallback((): ViewProps => ({
    ...wrapperProps,
    className: slots.wrapper({ class: [classNames?.wrapper, wrapperProps?.className] }),
  }), [slots, classNames, wrapperProps])

  const getScrollViewProps = useCallback((): ScrollViewProps => {
    return {
      id: ids.container,
      ...(canScrollY ? { scrollY: true } : {}),
      ...(canScrollX ? { scrollX: true } : {}),
      enhanced,
      enableFlex,
      showScrollbar,
      className: slots.scrollview({ class: [classNames?.scrollview, className] }),
      onScroll: handleScroll,
      ...rest,
    }
  }, [ids.container, canScrollY, canScrollX, enhanced, enableFlex, showScrollbar, slots, classNames, className, handleScroll, rest])

  const getContentProps = useCallback((): ViewProps => ({
    ...contentProps,
    id: ids.content,
    className: slots.content({ class: [classNames?.content, contentProps?.className] }),
  }), [ids.content, slots, classNames, contentProps])

  return {
    domRef,
    slots,
    children,
    className,
    classNames,
    getWrapperProps,
    getScrollViewProps,
    getContentProps,
  }
}

export type UseScrollboxReturn = ReturnType<typeof useScrollbox>
