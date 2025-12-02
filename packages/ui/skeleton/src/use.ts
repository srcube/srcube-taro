import type { SkeletonSlots, SkeletonVariantProps } from '@srcube-taro/theme'
import type { ReactRef } from '@srcube-taro/utils-react'
import type { SlotsToClasses } from '@srcube-taro/utils-tv'
import type { MergeVariantProps, NativeProps } from '@srcube-taro/utils-types'
import type { ViewProps } from '@tarojs/components'
import type { ReactNode } from 'react'
import { skeleton } from '@srcube-taro/theme'
import { useDOMRef } from '@srcube-taro/utils-react'
import { useCallback, useMemo } from 'react'

type OmitNativeKeys = ''

interface Props extends Omit<NativeProps<ViewProps>, OmitNativeKeys> {
  ref?: ReactRef
  isLoaded?: boolean
  children?: ReactNode
  classNames?: SlotsToClasses<SkeletonSlots>
}

export type UseSkeletonProps = MergeVariantProps<Props, SkeletonVariantProps>

export function useSkeleton(props: UseSkeletonProps) {
  const { ref, isLoaded, rounded, className, classNames, children, ...rest } = props

  const domRef = useDOMRef(ref)

  const slots = useMemo(() => skeleton({ rounded, className }), [rounded, className])

  const styles = useMemo(() => ({
    base: slots.base({ class: [classNames?.base, className] }),
    content: slots.content({ class: classNames?.content }),
    placeholder: slots.placeholder({ class: classNames?.placeholder }),
  }), [slots, classNames, className])

  const getSkeletonProps = useCallback((): ViewProps => ({
    ref: domRef,
    className: styles.base,
    ...rest,
  }), [domRef, styles.base, rest])

  return {
    domRef,
    children,
    isLoaded,
    styles,
    getSkeletonProps,
  }
}

export type UseSkeletonReturn = ReturnType<typeof useSkeleton>
