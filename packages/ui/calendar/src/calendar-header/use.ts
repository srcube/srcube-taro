import { useCallback } from 'react'
import { useCalendarContext } from '../context'

export function useCalendarHeader() {
  const { state, slots, isRange } = useCalendarContext()

  const handlePrevTap = useCallback(() => {
    const date = state.focusedDate.add({ months: -1 })
    state.setFocusedDate(date)
  }, [state])

  const handleNextTap = useCallback(() => {
    const date = state.focusedDate.add({ months: 1 })
    state.setFocusedDate(date)
  }, [state])

  const getPrevProps = useCallback(() => ({
    className: slots.jumpTrigger(),
    onTap: handlePrevTap,
  }), [handlePrevTap, slots])

  const getNextProps = useCallback(() => ({
    className: slots.jumpTrigger(),
    onTap: handleNextTap,
  }), [handleNextTap, slots])

  return {
    slots,
    isRange,
    getPrevProps,
    getNextProps,
  }
}

export type UseCalendarHeaderReturn = ReturnType<typeof useCalendarHeader>
