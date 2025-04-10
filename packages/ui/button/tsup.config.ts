import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  format: ['esm', 'cjs'],
  dts: true,
})
