import type { ReactRef } from '@srcube-taro/utils-react'
import type { PropsWithoutChildren } from '@srcube-taro/utils-types'
import type { ITouchEvent, ScrollViewProps, ViewProps } from '@tarojs/components'
import type { UsePickerProps } from '../use'
import { selectPickerPanel } from '@srcube-taro/theme'
import { useControlledState } from '@srcube-taro/utils-react'
import { $ } from '@tarojs/extend'
import { nextTick } from '@tarojs/taro'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface SelectOption {
  label: string
  value: string
  raw?: Record<string, any>
  isDisabled?: boolean
}

export type SelectionMode = 'single' | 'multiple'

export interface UseSelectPickerProps extends Omit<UsePickerProps, 'children' | 'panelContent'> {
  ref?: ReactRef
  defaultValue?: string | string[]
  value?: string | string[]
  items: SelectOption[]
  selectionMode?: SelectionMode
  locale?: 'en' | 'zh-CN' | 'zh-TW'
  onChange?: (next: string | string[]) => void
  onConfirm?: (next: string[]) => void
}

const defaultI18n = {
  'en': { confirm: 'Confirm', cancel: 'Cancel' },
  'zh-CN': { confirm: '确定', cancel: '取消' },
  'zh-TW': { confirm: '確定', cancel: '取消' },
}

export function useSelectPicker(props: UseSelectPickerProps) {
  const {
    ref,
    fieldRef,
    items,
    selectionMode = 'single',
    value,
    defaultValue,
    locale = 'en',
    color,
    classNames,
    drawerProps,
    onChange,
    onConfirm,
    ...rest
  } = props

  const slots = useMemo(() => selectPickerPanel(), [])

  const isMultiple = selectionMode === 'multiple'

  const controlledValue = value != null ? (Array.isArray(value) ? value : [value]) : undefined
  const defaultArray = defaultValue != null ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []

  const [selected, setSelected] = useControlledState<string[], string | string[]>(
    controlledValue,
    defaultArray,
    (next) => {
      const normalized = Array.isArray(next) ? next : [next]
      onChange?.(isMultiple ? normalized : normalized[0])
    },
  )

  const [draft, setDraft] = useState<string[]>(() => selected)

  useEffect(() => {
    requestAnimationFrame(() => setDraft(selected))
  }, [selected])

  const labels = useMemo(() => {
    const map = new Map(items.map(o => [o.value, o.label]))
    return selected.map(v => map.get(v) || v)
  }, [items, selected])

  const displayText = useMemo(() => {
    if (!labels.length)
      return ''
    return isMultiple ? labels.join(', ') : labels[0]
  }, [labels, isMultiple])

  const i18n = defaultI18n[locale] || defaultI18n.en

  const idBaseRef = useRef(`sp-${Math.random().toString(36).slice(2, 9)}`)
  const ids = useMemo(() => ({ list: `${idBaseRef.current}-list` }), [])

  const containerRef = useRef({ height: 0 })
  const itemSizeRef = useRef({ height: 0 })
  const scrollRef = useRef({ top: 0, maxTop: 0 })
  const tapSideRef = useRef<'top' | 'bottom' | null>(null)
  const [scrollTop, setScrollTop] = useState<number | undefined>(void 0)
  const didInitRef = useRef(false)

  const applyScroll = useCallback((target: number) => {
    setScrollTop((prev) => {
      const current = prev ?? 0
      if (current === target) {
        const max = scrollRef.current.maxTop
        const temp = target > 0 ? Math.max(0, Math.min(max, target - 1)) : Math.min(max, target + 1)
        nextTick(() => {
          setScrollTop(target)
        })
        return temp
      }
      return target
    })
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const listEl = $(`#${ids.list}`)
        const [ch] = await Promise.all([listEl?.height?.() || 0])
        containerRef.current.height = Number(ch || 0)
        const col: any = listEl?.children?.()
        const firstItem = col ? (typeof col.get === 'function' ? col.get(0) : col[0]) : void 0
        const ih = typeof firstItem?.height === 'function' ? await firstItem.height() : 0
        itemSizeRef.current.height = Number(ih || 0) || itemSizeRef.current.height || 40
        const total = (items?.length || 0) * (itemSizeRef.current.height || 40)
        const maxTop = Math.max(0, total - containerRef.current.height)
        scrollRef.current.maxTop = maxTop
      }
      catch {}
    })()
  }, [ids, items])

  useEffect(() => {
    if (didInitRef.current)
      return
    if (!isMultiple) {
      const v = selected[0]
      if (!v)
        return
      const idx = items.findIndex(i => i.value === v)
      if (idx >= 0) {
        const h = itemSizeRef.current.height || 40
        const snappedTop = Math.max(0, idx * h)
        applyScroll(snappedTop)
        didInitRef.current = true
      }
    }
  }, [isMultiple, selected, items, applyScroll])

  const handleScrollViewClick = useCallback(async (e: ITouchEvent) => {
    const y = e.detail?.y ?? 0
    const listEl = $(`#${ids.list}`)
    const coff = await awaitOffset(listEl)
    const yRel = Math.max(0, y - (coff?.top || 0))
    tapSideRef.current = yRel < containerRef.current.height / 2 ? 'top' : 'bottom'
  }, [ids])

  const handleScroll = useCallback<NonNullable<ScrollViewProps['onScroll']>>((e) => {
    const top = e?.detail?.scrollTop ?? 0
    scrollRef.current.top = top
  }, [])

  const getScrollViewProps = useCallback((): ScrollViewProps => {
    return {
      id: ids.list,
      scrollY: true,
      enableFlex: true,
      enablePassive: true,
      scrollTop,
      className: (slots as any).scrollview({ class: classNames?.scrollview }),
      onScroll: handleScroll,
      onClick: handleScrollViewClick as any,
    }
  }, [ids, scrollTop, slots, classNames, handleScroll, handleScrollViewClick])

  const ensureItemVisible = useCallback((index: number) => {
    const h = itemSizeRef.current.height || 40
    const containerSize = containerRef.current.height || 0
    const itemStart = Math.max(0, index * h)
    const itemEnd = itemStart + h
    const currentScrollPos = scrollRef.current.top
    const visibleStart = currentScrollPos
    const visibleEnd = currentScrollPos + containerSize
    const EXTRA = 20
    const nearTop = (itemStart - visibleStart) <= EXTRA
    const nearBottom = (visibleEnd - itemEnd) <= EXTRA
    if (itemStart >= visibleStart && itemEnd <= visibleEnd && !nearTop && !nearBottom)
      return
    const baseTarget = Math.max(0, itemEnd - containerSize)
    const maxScroll = scrollRef.current.maxTop
    const candidateMax = Math.min(maxScroll, baseTarget + EXTRA)
    const candidateMin = Math.max(0, itemStart - EXTRA)
    if (tapSideRef.current === 'bottom')
      applyScroll(candidateMax)
    else if (tapSideRef.current === 'top')
      applyScroll(candidateMin)
  }, [applyScroll])

  const handleItemTap = useCallback((v: string) => {
    if (isMultiple) {
      setDraft((prev) => {
        const next = prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
        const idx = items.findIndex(i => i.value === v)
        if (idx >= 0)
          ensureItemVisible(idx)
        return next
      })
    }
    else {
      setDraft([v])
      const idx = items.findIndex(i => i.value === v)
      if (idx >= 0)
        ensureItemVisible(idx)
    }
  }, [isMultiple, items, ensureItemVisible])

  const handleConfirm = useCallback(() => {
    setSelected(draft)
    if (isMultiple) {
      onConfirm?.(draft)
    }
  }, [draft, isMultiple, setSelected, onConfirm])

  const getPickerProps = useCallback((): PropsWithoutChildren<UsePickerProps> => {
    return {
      ref: fieldRef,
      fieldContent: displayText,
      drawerProps,
      ...rest,
    } as any
  }, [fieldRef, displayText, rest, drawerProps])

  const getItemProps = useCallback((item: SelectOption): ViewProps => ({
    'onTap': item.isDisabled ? void 0 : (_e: any) => handleItemTap(item.value),
    'className': slots.item({ isItemSelected: draft.includes(item.value), class: classNames?.item }),
    'aria-selected': draft.includes(item.value) ? 'true' : void 0,
    'aria-disabled': item.isDisabled ? 'true' : void 0,
  }), [handleItemTap, slots, classNames, draft])

  function awaitOffset(el: any): Promise<{ top?: number } | undefined> {
    return new Promise((resolve) => {
      try {
        if (typeof el?.offset === 'function') {
          el.offset().then((v: any) => resolve(v)).catch(() => resolve(void 0))
        }
        else {
          resolve(void 0)
        }
      }
      catch { resolve(void 0) }
    })
  }

  return {
    slots,
    color,
    classNames,
    isMultiple,
    items,
    selected,
    draft,
    displayText,
    i18n,
    handleItemTap,
    handleConfirm,
    getPickerProps,
    ids,
    getScrollViewProps,
    scrollTop,
    getItemProps,
  }
}

export type UseSelectPickerReturn = ReturnType<typeof useSelectPicker>
