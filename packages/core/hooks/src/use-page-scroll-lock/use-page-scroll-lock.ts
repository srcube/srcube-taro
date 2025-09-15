import { useCallback, useEffect, useState } from 'react'

const ids = new Set<string>()
const subscribers = new Set<() => void>()

function subscribe(callback: () => void) {
  subscribers.add(callback)
  return () => {
    subscribers.delete(callback)
  }
}

function notify() {
  subscribers.forEach(callback => callback())
}

export function usePageScrollLock() {
  const [records, setRecords] = useState<Set<string>>(() => new Set(ids))

  useEffect(() => {
    const unsubscribe = subscribe(() => setRecords(new Set(ids)))
    return () => {
      unsubscribe()
    }
  }, [])

  const addModalRecord = useCallback((id: string) => {
    ids.add(id)
    notify()
  }, [])

  const delModalRecord = useCallback((id: string) => {
    ids.delete(id)
    notify()
  }, [])

  return {
    isLocked: records.size > 0,
    records,
    addModalRecord,
    delModalRecord,
  }
}
