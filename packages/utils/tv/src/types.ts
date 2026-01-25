import type { ClassValue } from '@srcube-taro/utils-tv'

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: ClassValue
}

/**
 * Exclude the private slots from the slots list
 *
 * @param T Slots list
 */
export type ExcludePrivateSlotKeys<T extends string> = T extends `_${string}` ? never : T
