import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

export const box = tv({
  base: '',
})

export type BoxVariantsProps = VariantProps<typeof box>
