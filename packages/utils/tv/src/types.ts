import type { ClassValue } from '@srcube-taro/utils-tv'

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: ClassValue
}
