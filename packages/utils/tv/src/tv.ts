import type { ClassValue } from 'tailwind-variants'
import { ComplexMappingChars2String, ComplexMappingChars2StringEntries, escape } from '@weapp-core/escape'
import { extendTailwindMerge, getDefaultConfig } from 'tailwind-merge'
import { createTV } from 'tailwind-variants'

export { VariantProps } from 'tailwind-variants'

export { ComplexMappingChars2String, ComplexMappingChars2StringEntries }

// Generate a reverse mapping: escaped fragment => original character
const reverseMap = Object.fromEntries(
  ComplexMappingChars2StringEntries.map(([k, v]) => [v, k]),
)

export function unescape(inputs: ClassValue): ClassValue {
  if (typeof inputs === 'string') {
    let result = inputs
    // --- 1. Regex batch replacement ---
    // Sort keys by length descending to avoid partial replacement conflicts
    const sortedKeys = Object.keys(reverseMap).sort((a, b) => b.length - a.length)
    // Build a regex pattern to match all escaped fragments
    const pattern = new RegExp(sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\$&')).join('|'), 'g')
    result = result.replace(pattern, m => reverseMap[m])
    return result

    // --- 1. split/join replacement ---
    // const sortedKeys = Object.keys(reverseMap).sort((a, b) => b.length - a.length)
    // for (const esc of sortedKeys) {
    //   const orig = reverseMap[esc]
    //   result = result.split(esc).join(orig)
    // }
    // return result
  }

  if (Array.isArray(inputs)) {
    // Recursively process each item in the array
    return inputs.map(unescape)
  }

  if (inputs && typeof inputs === 'object') {
    // Only process plain objects, avoid arrays and special objects
    const res: Record<string, any> = {}
    for (const key of Object.keys(inputs)) {
      res[key] = unescape((inputs as Record<string, any>)[key])
    }
    return res as ClassValue
  }
  return inputs
}

export const twMerge = extendTailwindMerge<'pb-safe'>({
  ...getDefaultConfig(),
  extend: {
    classGroups: {
      pt: ['pt-safe', { 'pt-safe': [(value: string) => Number(value) > 0] }],
      pb: ['pb-safe', { 'pb-safe': [(value: string) => Number(value) > 0] }],
      animate: [{ animate: [() => true] }],
    },
  },
})

export const tv = createTV({
  twMergeFn: (inputs) => {
    // Unescape before merging, then escape again for output
    return escape(twMerge(unescape(inputs)), { map: ComplexMappingChars2String })
  },
})
