/**
 * 👍🏻 Code reference from @react-stately/utils
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * A hook that manages both controlled and uncontrolled component states.
 *
 * @param value - The controlled value passed from parent
 * @param defaultValue - The default value to use if uncontrolled
 * @param onChange - Optional callback when value changes
 * @returns [currentValue, setValue] - Current value and setter function
 */
export function useControlledState<T, C = T>(value: Exclude<T, undefined>, defaultValue: Exclude<T, undefined> | undefined, onChange?: (v: C, ...args: any[]) => void): [T, (value: T | ((prev: T) => T), ...args: any[]) => void]
export function useControlledState<T, C = T>(value: Exclude<T, undefined> | undefined, defaultValue: Exclude<T, undefined>, onChange?: (v: C, ...args: any[]) => void): [T, (value: T | ((prev: T) => T), ...args: any[]) => void]
export function useControlledState<T, C = T>(value: T, defaultValue: T, onChange?: (v: C, ...args: any[]) => void) {
  const [stateValue, setStateValue] = useState(value || defaultValue)

  const isControlledRef = useRef(value !== undefined)
  const isControlled = value !== undefined
  const prevValueRef = useRef(value)

  useEffect(() => {
    const wasControlled = isControlledRef.current

    if (wasControlled !== isControlled && process.env.NODE_ENV !== 'production') {
      console.warn(`WARN: A component changed from ${wasControlled ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}.`)
    }

    isControlledRef.current = isControlled
  }, [isControlled])

  useLayoutEffect(() => {
    if (isControlled && !Object.is(prevValueRef.current, value)) {
      setStateValue(value)
      prevValueRef.current = value
    }
  }, [isControlled, value])

  const currentValue = isControlled ? value : stateValue

  const setValue = useCallback((newValue: T | ((prev: T) => T), ...args: any[]) => {
    if (typeof newValue === 'function') {
      const updaterFn = newValue as ((prev: T) => T)

      if (isControlled) {
        const nextValue = updaterFn(currentValue)

        if (onChange && !Object.is(currentValue, nextValue)) {
          onChange(nextValue as unknown as C, ...args)
        }
      }
      else {
        setStateValue((prev) => {
          const nextValue = updaterFn(prev)

          if (onChange && !Object.is(prev, nextValue)) {
            onChange(nextValue as unknown as C, ...args)
          }

          return nextValue
        })
      }
    }
    else {
      if (!isControlled) {
        setStateValue(newValue)
      }

      if (onChange && !Object.is(currentValue, newValue)) {
        onChange(newValue as unknown as C, ...args)
      }
    }
  }, [isControlled, currentValue, onChange])

  return [currentValue, setValue]
}
