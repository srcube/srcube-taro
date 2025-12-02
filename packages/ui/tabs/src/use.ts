import type { TabListState, TabListStateOptions } from '@react-stately/tabs'
import type { CollectionChildren } from '@react-types/shared'
import type { TabsReturnType, TabsSlots, TabsVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { CollectionProps, MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { BaseEventOrig, ITouchEvent, ScrollViewProps, ViewProps } from '@tarojs/components'
import type { TaroElement } from '@tarojs/runtime'
import type { RefObject } from 'react'
import { useTabListState } from '@react-stately/tabs'
import { tabs } from '@srcube-taro/theme'
import { warn } from '@srcube-taro/utils-func'
import { useDOMRef } from '@srcube-taro/utils-react'
import { mapPropsVariants } from '@srcube-taro/utils-tv'
import { $ } from '@tarojs/extend'
import { nextTick } from '@tarojs/taro'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type OmitNativeKeys = 'children'

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  /**
   * Ref to the DOM element
   */
  ref?: ReactRef
  /**
   * The selected key (controlled).
   */
  selectedKey?: string | number
  /**
   * The default selected key (uncontrolled).
   */
  defaultSelectedKey?: string | number
  /**
   * Whether the tabs are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Class names to apply to the slots.
   */
  classNames?: SlotsToClasses<TabsSlots>
  /**
   * Handler that is called when the selection changes.
   */
  onSelectionChange?: (key: string | number) => void
}

export interface ValuesType<T = object> {
  state: TabListState<T>
  slots: TabsReturnType
  listRef?: RefObject<TaroElement>
  classNames?: SlotsToClasses<TabsSlots>
  isDisabled?: boolean
  ids: { container: string, item: string }
  itemOffsets: Map<string | number, { left: number, top: number, width: number, height: number }>
}

type Placement = 'top' | 'bottom' | 'start' | 'end'

export type UseTabsProps<T> = MergeVariantProps<Props, TabsVariantProps> & Omit<TabListStateOptions<T>, ''> & CollectionProps<T>

export function useTabs<T extends object>(originalProps: UseTabsProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys)

  const {
    ref,
    children,
    className,
    classNames,
    defaultSelectedKey,
    selectedKey: propSelectedKey,
    onSelectionChange,
    ...rest
  } = props

  const domRef = useDOMRef(ref)

  const idBaseRef = useRef(`tabs-${Math.random().toString(36).slice(2, 10)}`)
  const ids = useMemo(() => ({ container: `${idBaseRef.current}-container`, item: `${idBaseRef.current}-item` }), [])

  const isVertical = !!originalProps?.isVertical
  const rawSize = originalProps?.size ?? 'md'
  const rawPlacement = originalProps?.placement ?? (isVertical ? 'start' : 'top')

  const placement: Placement = (() => {
    if (!isVertical) {
      if (['start', 'end'].includes(rawPlacement)) {
        warn('isVertical=false cannot use placement="start"/"end". Using "top" by default.', 'Tabs')
        return 'top'
      }
      return rawPlacement === 'bottom' ? 'bottom' : 'top'
    }

    if (['top', 'bottom'].includes(rawPlacement)) {
      warn('isVertical=true cannot use placement="top"/"bottom". Using "start" by default.', 'Tabs')
      return 'start'
    }
    return rawPlacement === 'end' ? 'end' : 'start'
  })()

  const [masks, setMasks] = useState<{ start: boolean, end: boolean }>({ start: false, end: false })

  const state = useTabListState<T>({
    children: children as CollectionChildren<T>,
    ...props,
  })

  const slots = useMemo(() => tabs({ ...variantProps, placement }), [variantProps, placement])

  const styles = useMemo(() => ({
    base: slots.base({ class: [classNames?.base, className] }),
    tabsWrapper: slots.tabsWrapper({ class: classNames?.tabsWrapper }),
    maskStart: slots.maskStart({ class: classNames?.maskStart }),
    maskEnd: slots.maskEnd({ class: classNames?.maskEnd }),
    tabs: slots.tabs({ class: classNames?.tabs }),
    panel: slots.panel({ class: classNames?.panel }),
  }), [slots, classNames, className])

  const [isMeasuring, setIsMeasuring] = useState(true)
  const [scrollPos, setScrollPos] = useState<{ left?: number, top?: number }>({})

  const tapSideRef = useRef<'start' | 'end' | 'top' | 'bottom' | null>(null)

  const containerRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const itemOffsetsRef = useRef<Map<string | number, { left: number, top: number, width: number, height: number }>>(new Map())
  const scrollRef = useRef({ left: 0, top: 0, maxLeft: 0, maxTop: 0 })
  const targetScrollRef = useRef({ left: 0, top: 0 })

  const values = useMemo<ValuesType<T>>(() => (
    {
      state,
      slots,
      listRef: domRef,
      classNames,
      isDisabled: originalProps.isDisabled,
      ids,
      itemOffsets: itemOffsetsRef.current,
    }), [state, slots, domRef, classNames, originalProps.isDisabled, ids])

  // Calculate container width/height and items offsets
  useLayoutEffect(() => {
    setIsMeasuring(true);

    (async () => {
      try {
        const container = $(`#${values.ids.container}`)
        if (!container)
          return

        const [cw, ch, coff] = await Promise.all([
          container.width?.() || 0,
          container.height?.() || 0,
          container.offset?.() || {},
        ])
        containerRef.current = {
          width: Number(cw || 0),
          height: Number(ch || 0),
          left: Number(coff?.left || 0),
          top: Number(coff?.top || 0),
        }

        let [totalW, totalH] = [0, 0]

        for (const node of state.collection) {
          const key = node.key as any
          const el = $(`#${values.ids.item}-${key}`)

          if (!el)
            continue

          const [w, h, ioff] = await Promise.all([
            el.width?.() || 0,
            el.height?.() || 0,
            el.offset?.() || {},
          ])

          const offset = {
            width: Number(w),
            height: Number(h),
            left: Math.max(0, Number(ioff?.left || 0) - containerRef.current.left),
            top: Math.max(0, Number(ioff?.top || 0) - containerRef.current.top),
          }

          itemOffsetsRef.current.set(key, offset)

          totalW += offset.width
          totalH += offset.height
        }

        scrollRef.current.maxLeft = Math.max(0, totalW - containerRef.current.width)
        scrollRef.current.maxTop = Math.max(0, totalH - containerRef.current.height)
        setIsMeasuring(false)
      }
      catch {}
    })()
  }, [state.collection, values.ids])

  const getBaseProps = useCallback((): ViewProps => ({
    className: slots.base({ class: [classNames?.base, className] }),
    ...rest,
  }), [slots, classNames, className, rest])

  const handleScrollViewClick = useCallback((e: ITouchEvent) => {
    const x = e.detail?.x ?? 0
    const y = e.detail?.y ?? 0
    const xRel = Math.max(0, x - containerRef.current.left)
    const yRel = Math.max(0, y - containerRef.current.top)

    tapSideRef.current = !isVertical
      ? (xRel < containerRef.current.width / 2 ? 'start' : 'end')
      : (yRel < containerRef.current.height / 2 ? 'top' : 'bottom')
  }, [isVertical])

  const handleScroll = useCallback((e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    const left = e.detail?.scrollLeft ?? 0
    const top = e.detail?.scrollTop ?? 0

    scrollRef.current = { ...scrollRef.current, left, top }

    setMasks(!isVertical
      ? { start: left > 10, end: left < scrollRef.current.maxLeft - 10 }
      : { start: top > 10, end: top < scrollRef.current.maxTop - 10 },
    )
  }, [isVertical])

  const getScrollViewProps = useCallback((): ScrollViewProps => {
    return {
      id: ids.container,
      scrollX: !isVertical,
      scrollY: isVertical,
      enableFlex: true,
      scrollWithAnimation: true,
      enhanced: true,
      showScrollbar: false,
      scrollLeft: scrollPos.left,
      scrollTop: scrollPos.top,
      className: styles.tabs,
      onClick: handleScrollViewClick,
      onScroll: handleScroll,
    }
  }, [ids, isVertical, scrollPos, styles.tabs, handleScrollViewClick, handleScroll])

  // Because scroll end event not support in miniprogram webview
  const applyScroll = useCallback((axis: 'left' | 'top', target: number) => {
    const current = axis === 'left' ? scrollPos.left : scrollPos.top
    if (current === target) {
      setScrollPos(prev => ({ ...prev, [axis]: undefined }))

      nextTick(() => {
        setScrollPos(prev => ({ ...prev, [axis]: target }))
      })
    }
    else {
      setScrollPos(prev => ({ ...prev, [axis]: target }))
    }
  }, [scrollPos.left, scrollPos.top])

  // Auto scroll when selected item is out of view
  useLayoutEffect(() => {
    const EXTRA = !isVertical
      ? ({ xs: 40, sm: 45, md: 50, lg: 55 } as Record<string, number>)[rawSize]
      : ({ xs: 10, sm: 15, md: 20, lg: 25 } as Record<string, number>)[rawSize]
    const key = state.selectedKey

    if (!key)
      return

    const getOffsetInfo = () => {
      let [prefix, size] = [0, 0]

      for (const node of state.collection) {
        const k = node.key
        const offset = itemOffsetsRef.current.get(k)
        const s = !isVertical ? offset?.width || 0 : offset?.height || 0
        if (k === key) {
          size = s
          break
        }
        prefix += s
      }

      return { prefix, size, start: prefix, end: prefix + size }
    }

    const { size, start: itemStart, end: itemEnd } = getOffsetInfo()

    if (size === 0)
      return

    // Visible area
    const containerSize = !isVertical ? containerRef.current.width : containerRef.current.height
    const currentScrollPos = !isVertical ? scrollRef.current.left : scrollRef.current.top
    const visibleStart = currentScrollPos
    const visibleEnd = currentScrollPos + containerSize

    // Is tab in visible area or not near left or right, do not scroll
    const nearLeft = (itemStart - visibleStart) <= EXTRA
    const nearRight = (visibleEnd - itemEnd) <= EXTRA
    if (itemStart >= visibleStart && itemEnd <= visibleEnd && !nearLeft && !nearRight)
      return

    // Calculate target scroll position
    const baseTarget = Math.max(0, itemEnd - containerSize)
    const maxScroll = !isVertical ? scrollRef.current.maxLeft : scrollRef.current.maxTop
    const candidateMax = Math.min(maxScroll, baseTarget + EXTRA)
    const candidateMin = Math.max(0, itemStart - EXTRA)

    if (!isVertical) {
      if (tapSideRef.current === 'end') {
        const target = candidateMax
        targetScrollRef.current.left = target
        applyScroll('left', target)
      }
      else if (tapSideRef.current === 'start') {
        const target = candidateMin
        targetScrollRef.current.left = target
        applyScroll('left', target)
      }
    }
    else {
      if (tapSideRef.current === 'bottom') {
        const target = candidateMax
        targetScrollRef.current.top = target
        applyScroll('top', target)
      }
      else if (tapSideRef.current === 'top') {
        const target = candidateMin
        targetScrollRef.current.top = target
        applyScroll('top', target)
      }
    }
  }, [state.selectedKey, state.collection, rawSize, isVertical])

  return {
    domRef,
    children,
    state,
    values,
    slots,
    styles,
    masks,
    isMeasuring,
    getBaseProps,
    getScrollViewProps,
  }
}

export type UseTabsReturn = ReturnType<typeof useTabs>
