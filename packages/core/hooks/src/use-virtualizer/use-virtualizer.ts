import type { VirtualizerOptions } from '@tanstack/virtual-core'
import type { BaseEventOrig, ScrollViewProps } from '@tarojs/components'
import { Virtualizer } from '@tanstack/virtual-core'
import { useLayoutEffect, useReducer, useState } from 'react'
import {
  indexFromElement,
  measureElement,
  observeElementOffset,
  observeElementRect,
  scrollToFn,
} from './taro-virtualizer'

export * from '@tanstack/virtual-core'

// We use 'any' for Virtualizer generics to bypass strict DOM Element constraints
// since TaroElement might not fully satisfy them in all environments.
// However, we preserve the generic types for external usage documentation.
export type TaroVirtualizer<TScrollElement, TItemElement> = Virtualizer<any, any> & {
  handleScroll: (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => void
  // Add a phantom field to use the generic types and suppress "unused type parameters" error
  _types?: [TScrollElement, TItemElement]
}

export function useVirtualizer<TScrollElement = any, TItemElement = any>(
  options: Partial<VirtualizerOptions<any, any>> & {
    getScrollElement: () => TScrollElement | null
    estimateSize: (index: number) => number
    count: number
  },
): TaroVirtualizer<TScrollElement, TItemElement> {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const resolvedOptions: any = {
    ...options,
    onChange: (instance: any, sync: boolean) => {
      if (sync) {
        forceUpdate()
      }
      else {
        forceUpdate()
      }
      options.onChange?.(instance, sync)
    },
  }

  const [instance] = useState(() => {
    const virtualizer = new Virtualizer<any, any>({
      ...resolvedOptions,
      observeElementRect,
      observeElementOffset,
      scrollToFn,
    })

    // Monkey-patch indexFromElement to support Taro's dataset
    virtualizer.indexFromElement = indexFromElement

    const originalMeasureElement = virtualizer.measureElement.bind(virtualizer)
    virtualizer.measureElement = (node: any) => {
      originalMeasureElement(node)
      if (node) {
        measureElement(node, virtualizer)
      }
    }

    return virtualizer
  })

  // Update options on re-renders
  instance.setOptions({
    ...resolvedOptions,
    observeElementRect,
    observeElementOffset,
    scrollToFn,
    indexFromElement,
  })

  // Attach handleScroll helper if not present
  if (!(instance as any).handleScroll) {
    (instance as any).handleScroll = (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
      const offset = instance.options.horizontal ? (e.detail?.scrollLeft ?? 0) : (e.detail?.scrollTop ?? 0)
      const cb = (instance as any)._taroMeasureOffset
      if (cb) {
        cb(offset, true)
      }
    }
  }

  // React 18 / StrictMode lifecycle handling
  // @tanstack/react-virtual uses useLayoutEffect for _didMount and _willUpdate
  useLayoutEffect(() => {
    return instance._didMount()
  }, [instance])

  useLayoutEffect(() => {
    return (instance as any)._willUpdate()
  })

  return instance as TaroVirtualizer<TScrollElement, TItemElement>
}
