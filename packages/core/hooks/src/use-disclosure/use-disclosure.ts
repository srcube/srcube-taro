/**
 * 👍🏻 Code reference from @hero-ui/use-disclosure
 *
 * A hook for managing the open/close state of a disclosure component.
 * This hook provides a set of utilities for handling disclosure states and callbacks.
 *
 * @example
 * ```tsx
 * const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
 *   defaultOpen: false,
 *   onOpen: () => console.log('opened'),
 *   onClose: () => console.log('closed')
 * });
 * ```
 */

// import {chain} from "@react-aria/utils";
import { useControlledState } from '@react-stately/utils'
import { useCallback } from 'react'
import { useCallbackRef } from '../use-callback-ref'

export interface UseDisclosureProps {
  /** Whether the disclosure is open (controlled mode) */
  isOpen?: boolean
  /** Whether the disclosure is open by default (uncontrolled mode) */
  defaultOpen?: boolean
  /** Callback fired when the disclosure closes */
  onClose?: () => void
  /** Callback fired when the disclosure opens */
  onOpen?: () => void
  /** Callback fired when the disclosure state changes */
  onChange?: (isOpen: boolean | undefined) => void
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    isOpen: isOpenProp,
    defaultOpen,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange = () => {},
  } = props

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp)
  const onClosePropCallbackRef = useCallbackRef(onCloseProp)

  const [isOpen, setIsOpen] = useControlledState(
    isOpenProp,
    defaultOpen || false,
    onChange,
  )

  const isControlled = isOpenProp !== undefined

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    onOpenPropCallbackRef?.()
  }, [isControlled, onOpenPropCallbackRef, setIsOpen])

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    onClosePropCallbackRef?.()
  }, [isControlled, onClosePropCallbackRef, setIsOpen])

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
