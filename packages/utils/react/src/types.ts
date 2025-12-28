import type { TaroElement } from '@tarojs/runtime'

export type ReactRef<T = TaroElement> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>
