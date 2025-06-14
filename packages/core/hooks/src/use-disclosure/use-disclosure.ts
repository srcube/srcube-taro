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

import { useCallback, useId } from 'react'
import { useCallbackRef } from '../use-callback-ref'
// import {chain} from "@react-aria/utils";
import { useControlledState } from '../use-controlled-state'

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
  /** The id of the disclosure element */
  id?: string
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
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

  const reactId = useId()
  const id = idProp || reactId
  const isControlled = isOpenProp !== undefined

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    onClosePropCallbackRef?.()
  }, [isControlled, onClosePropCallbackRef, setIsOpen])

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    onOpenPropCallbackRef?.()
  }, [isControlled, onOpenPropCallbackRef, setIsOpen])

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    // getButtonProps: (props: any = {}) => ({
    //   ...props,
    //   'aria-expanded': isOpen,
    //   'aria-controls': id,
    //   'onClick': chain(props.onClick, onOpenChange),
    // }),
    getDisclosureProps: (props: any = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
