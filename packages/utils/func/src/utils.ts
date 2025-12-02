import type { CSSProperties } from 'react'

/**
 * Creates a debounced function that delays invoking `func` until after `waitMilliseconds` have elapsed
 * since the last time the debounced function was invoked. The debounced function has the
 * same `this` context and arguments as the original function.
 *
 * @param func - The function to debounce.
 * @param waitMilliseconds - The number of milliseconds to delay; defaults to 0.
 *
 * @returns A new debounced function.
 *
 * @typeParam F - The type of the function to debounce.
 *
 * @example
 * const save = debounce(() => console.log('Saved!'), 300);
 * save(); // Will log 'Saved!' after 300ms, subsequent calls within 300ms will reset the timer.
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout = undefined
      func.apply(this, args)
    }

    if (timeout !== undefined) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, waitMilliseconds)
  }
}

/**
 * Calls all functions in the order they were chained with the same arguments.
 *
 * @param callbacks - The functions to chain.
 * @returns A new function that invokes all functions in the order they were chained with the same arguments.
 */
export function chain(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args)
      }
    }
  }
}

/**
 * Style input type supporting objects, strings and nested arrays.
 */
export type StyleInput = CSSProperties | string | null | undefined | Array<CSSProperties | string | null | undefined>

/**
 * Merges multiple styles into a single style.
 * - Accepts style objects, style strings, or arrays of both
 * - If only strings are provided, returns a semicolon-joined string
 * - If objects are provided, returns a merged CSSProperties object
 * - Falsy values are ignored
 */
export function mergeStyle(...styles: StyleInput[]): CSSProperties | string | undefined {
  const objs: CSSProperties[] = []
  const strs: string[] = []

  for (const s of styles) {
    const list = Array.isArray(s) ? s : [s]
    for (const v of list) {
      if (!v)
        continue
      if (typeof v === 'string')
        strs.push(v)
      else objs.push(v as CSSProperties)
    }
  }

  if (strs.length > 0 && objs.length === 0)
    return strs.join(';')
  if (!objs.length)
    return undefined
  return Object.assign({}, ...objs)
}

/**
 * ClassName input type supporting strings and arrays of strings.
 */
export type ClassNameInput = string | null | undefined | Array<string | null | undefined>

/**
 * Merges multiple className inputs into a single space-joined string.
 * - Accepts strings or arrays of strings
 * - Falsy values are ignored
 */
export function mergeClassName(...classNames: ClassNameInput[]): string | undefined {
  const list: string[] = []
  for (const c of classNames) {
    const arr = Array.isArray(c) ? c : [c]
    for (const s of arr) {
      if (s)
        list.push(String(s))
    }
  }
  return list.length ? list.join(' ') : undefined
}

/**
 * Event handler type used by mergeProps.
 */
export type EventHandler = (...args: any[]) => void

/**
 * Deep-ish props merge tailored for React DOM-like props.
 * - `style` keys are merged via `mergeStyle`
 * - `className`/`class` are merged via `mergeClassName`
 * - Event handlers (`onXxx`) are chained via `chain` in declaration order
 * - Other keys are shallowly overridden by the last occurrence
 */
export function mergeProps<T extends Record<string, any>>(...propsList: Partial<T>[]): T {
  const result: Record<string, any> = {}
  const events: Record<string, EventHandler[]> = {}
  const styles: StyleInput[] = []
  const classNames: ClassNameInput[] = []

  for (const props of propsList) {
    if (!props)
      continue
    for (const key of Object.keys(props)) {
      const val: any = (props as any)[key]
      if (key === 'style') {
        styles.push(val)
        continue
      }
      if (key === 'className' || key === 'class') {
        classNames.push(val)
        continue
      }
      if (/^on[A-Z]/.test(key) && typeof val === 'function') {
        if (!events[key])
          events[key] = []
        events[key].push(val as EventHandler)
        continue
      }
      result[key] = val
    }
  }

  if (styles.length)
    result.style = mergeStyle(...styles)
  const mergedClass = mergeClassName(...classNames)
  if (mergedClass)
    result.className = mergedClass

  for (const k of Object.keys(events)) {
    result[k] = chain(...events[k])
  }

  return result as T
}
