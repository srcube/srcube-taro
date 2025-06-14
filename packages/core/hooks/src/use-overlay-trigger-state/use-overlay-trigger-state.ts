/**
 * 👍🏻 Code reference from @react-stately/overlys
 */

import { useCallback } from 'react'
import { useControlledState } from '../use-controlled-state'

export interface OverlayTriggerProps {
  /**
   * Whether the overlay is open by default (controlled).
   */
  isOpen?: boolean
  /**
   * Whether the overlay is open by default (uncontrolled).
   */
  defaultOpen?: boolean
  /**
   * Handler that is called when the overlay's open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void
}

export interface OverlayTriggerState {
  /**
   * Whether the overlay is currently open.
   */
  readonly isOpen: boolean
  /**
   *  Sets whether the overlay is open.
   */
  setOpen: (isOpen: boolean) => void
  /**
   *  Opens the overlay.
   */
  open: () => void
  /**
   *  Closes the overlay.
   */
  close: () => void
  /**
   *  Toggles the overlay's visibility.
   */
  toggle: () => void
}

/**
 * Manages state for an overlay trigger.
 * Tracks whether the overlay is open, and provides methods to toggle this state.
 */
export function useOverlayTriggerState(props: OverlayTriggerProps): OverlayTriggerState {
  const [isOpen, setOpen] = useControlledState(props.isOpen, props.defaultOpen || false, props.onOpenChange)

  const open = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const close = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const toggle = useCallback(() => {
    setOpen(!isOpen)
  }, [setOpen, isOpen])

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  }
}
