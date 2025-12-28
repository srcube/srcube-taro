import type { VariantProps } from '@srcube-taro/utils-tv'
import { tv } from '@srcube-taro/utils-tv'

export const picker = tv({
  slots: {
    base: '',
    // panelContent: 'h-fit',
    // panelBody: 'flex w-full h-fit max-h-full overflow-hidden',
    // panelFooter: '',
    // panelScrollview: 'flex-grow flex flex-col h-full max-h-full',
    panelItem: '',
  },
  variants: {
    isItemSelected: {
      true: {
        panelItem: 'bg-[#f0f0f0]',
      },
    },
  },
})

export type PickerVariantProps = VariantProps<typeof picker>
export type PickerSlots = keyof ReturnType<typeof picker>

export const selectPickerPanel = tv({
  slots: {
    content: 'relative flex-grow flex flex-col h-full max-h-full',
    scrollview: 'flex-grow flex flex-col h-full max-h-full',
    maskTop: 'pointer-events-none absolute left-0 top-0 z-10 w-full h-12 bg-gradient-to-b from-white to-transparent',
    maskBottom: 'pointer-events-none absolute left-0 bottom-0 z-10 w-full h-12 bg-gradient-to-t from-white to-transparent',
    item: 'px-4 py-2',
  },
  variants: {
    isItemSelected: {
      true: {
        item: 'bg-slate-100 font-medium',
      },
    },
  },
})

export type SelectPickerPanelVariantProps = VariantProps<typeof selectPickerPanel>
export type SelectPickerPanelSlots = keyof ReturnType<typeof selectPickerPanel>
