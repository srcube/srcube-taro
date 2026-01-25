import { getRenderer } from '@tarojs/taro'

export const __DEV__ = process.env.NODE_ENV !== 'production'

export const __TEST__ = process.env.NODE_ENV === 'test'

export const isSkyline = getRenderer() === 'skyline'

/**
 * Checks if a value is undefined
 * @param value The value to check
 * @returns true if the value is undefined
 */
export function isVoid0(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

/**
 * Checks if a value is not null or undefined
 * @param value The value to check
 * @returns true if the value is not null or undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null
}

/**
 * Checks if a value is an array
 * @param value The value to check
 * @returns true if the value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * Checks if a value is a string
 * @param value The value to check
 * @returns true if the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Checks if a value is a number (and not NaN)
 * @param value The value to check
 * @returns true if the value is a valid number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Checks if a value is a boolean
 * @param value The value to check
 * @returns true if the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Checks if a value is an object (and not null)
 * @param value The value to check
 * @returns true if the value is an object
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}

/**
 * Checks if a value is a function
 * @param value The value to check
 * @returns true if the value is a function
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * Checks if an object has a specified property
 * @param obj The object to check
 * @param prop The property name to check for
 * @returns true if the object has the specified property
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  prop: K,
): obj is T & Record<K, unknown> {
  return prop in obj
}

/**
 * Checks if an array is not empty
 * @param array The array to check
 * @returns true if the array is not empty
 */
export function isNonEmptyArray<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

/**
 * Checks if a string is not empty
 * @param str The string to check
 * @returns true if the string is not empty
 */
export function isNonEmptyString(str: string): str is string {
  return str.length > 0
}

/**
 * Checks if a number is within a specified range (inclusive)
 * @param num The number to check
 * @param min The minimum value of the range
 * @param max The maximum value of the range
 * @returns true if the number is within the range
 */
export function isNumberInRange(
  num: number,
  min: number,
  max: number,
): boolean {
  return num >= min && num <= max
}

/**
 * Checks if a value is a Date instance
 * @param value The value to check
 * @returns true if the value is a Date instance
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * Checks if a value is a regular expression
 * @param value The value to check
 * @returns true if the value is a regular expression
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}
