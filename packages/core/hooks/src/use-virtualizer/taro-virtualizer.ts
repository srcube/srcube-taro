import type { Virtualizer } from '@tanstack/virtual-core'
import type { TaroElement } from '@tarojs/runtime'
import { createSelectorQuery } from '@tarojs/taro'

/**
 * Measure the scroll element size (width/height) in Taro.
 */
export function observeElementRect(
  instance: Virtualizer<any, any>,
  cb: (rect: { width: number, height: number }) => void,
) {
  const element = instance.scrollElement as any
  if (!element)
    return

  const id = element.id || element.uid
  if (!id)
    return

  const measure = () => {
    const query = createSelectorQuery()
    query.select(`#${id}`).boundingClientRect((res) => {
      const rect = (Array.isArray(res) ? res[0] : res) as any
      if (rect) {
        cb({ width: rect.width, height: rect.height })
      }
    }).exec()
  }

  measure()

  // Optional: Poll for changes if needed, but usually one-off is enough for static containers
  // const interval = setInterval(measure, 1000)
  // return () => clearInterval(interval)
  return undefined
}

/**
 * Observe scroll offset. In Taro, this is driven by the onScroll event,
 * so we just register the callback to be called by handleScroll.
 */
export function observeElementOffset(
  instance: Virtualizer<any, any>,
  cb: (offset: number, isScrolling: boolean) => void,
) {
  (instance as any)._taroMeasureOffset = cb
  return undefined
}

/**
 * Scroll to a specific offset.
 */
export function scrollToFn(
  offset: number,
  { behavior }: { behavior: ScrollBehavior },
  instance: Virtualizer<any, any>,
) {
  const element = instance.scrollElement as any
  if (element && typeof element.scrollTo === 'function') {
    element.scrollTo({
      [instance.options.horizontal ? 'left' : 'top']: offset,
      behavior,
    })
  }
}

/**
 * Logic to measure a specific item element.
 * This should be called when the element is mounted (via ref).
 */
export function measureElement(element: TaroElement, instance: Virtualizer<any, any>) {
  // 2. Identify index
  const index = element.dataset.index as number

  if (index === undefined || Number.isNaN(index)) {
    console.warn('[TaroVirtualizer] Could not determine index for element:', element)
    return instance.options.estimateSize(0)
  }

  // 3. Measure with retry logic
  const id = element.id ?? element.props?.id
  const measure = (retries = 0) => {
    // Small delay to ensure render
    setTimeout(() => {
      const query = createSelectorQuery()
      const actualSelector = id ? `#${id}` : `[data-index="${index}"]`

      query.select(actualSelector).boundingClientRect((res) => {
        const rect = (Array.isArray(res) ? res[0] : res) as any
        const size = instance.options.horizontal ? rect?.width : rect?.height

        if (size && size > 0) {
          instance.resizeItem(index, size)
        }
        else if (retries < 5) {
          measure(retries + 1)
        }
      }).exec()
    }, 50 * (retries + 1))
  }

  measure()

  return instance.options.estimateSize(index)
}

/**
 * Get index from element.
 * Overrides default behavior to use dataset.index directly.
 */
export function indexFromElement(node: any) {
  const index = node.dataset?.index
  if (index !== undefined && index !== null) {
    return Number(index)
  }
  // Fallback or let it return -1 if not found, though virtual-core might expect a number.
  return -1
}
