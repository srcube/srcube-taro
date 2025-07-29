import type { TaroElement } from '@tarojs/runtime'
import type * as React from 'react'

export type ReactRef<T = TaroElement> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>
