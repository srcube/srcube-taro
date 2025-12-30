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
  hideMasks?: boolean
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
    fastDeceleration = false,
    orientation = 'y',
    hideMasks = false,
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
  const masksRef = useRef(masks)

  const updateMasks = useCallback((next: typeof masks) => {
    const prev = masksRef.current
    const isChanged = (Object.keys(next) as Array<keyof typeof masks>).some(key => next[key] !== prev[key])

    if (isChanged) {
      masksRef.current = next
      console.log('updateMasks', next)
      setMasks(next)
    }
  }, [])

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

  const slots = useMemo(() => {
    return scrollbox({
      orientation,
      hideMasks: hideMasks === true,
      showMaskTop: masks.top,
      showMaskBottom: masks.bottom,
      showMaskLeft: masks.left,
      showMaskRight: masks.right,
    })
  }, [orientation, hideMasks, masks])

  const handleScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    const { scrollLeft, scrollTop, scrollHeight, scrollWidth } = e.detail
    const { width: cw, height: ch } = containerRef.current

    const THRESHOLD = 10
    const contentH = scrollHeight || contentRef.current.height
    const contentW = scrollWidth || contentRef.current.width

    const maxTop = Math.max(0, contentH - ch)
    const maxLeft = Math.max(0, contentW - cw)

    updateMasks({
      top: canScrollY && scrollTop > THRESHOLD,
      bottom: canScrollY && scrollTop < (maxTop - THRESHOLD),
      left: canScrollX && scrollLeft > THRESHOLD,
      right: canScrollX && scrollLeft < (maxLeft - THRESHOLD),
    })

    onScroll?.(e)
  }, [canScrollY, canScrollX, onScroll, updateMasks])

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
      fastDeceleration,
      className: slots.scrollview({ class: [classNames?.scrollview, className] }),
      onScroll: handleScroll,
      ...rest,
    }
  }, [ids.container, canScrollY, canScrollX, enhanced, enableFlex, fastDeceleration, showScrollbar, slots, classNames, className, handleScroll, rest])

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
