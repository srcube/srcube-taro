import type * as React from 'react'

export type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>
