import { isFunction } from './assert'

export async function withLoading(fn: ((...args: any[]) => (void | boolean) | Promise<void | boolean>) | undefined, setLoading: (v: boolean) => void, ...args: any) {
  if (!fn)
    return
  const ret = fn(...args)
  if (ret && isFunction((ret as Promise<void | boolean>).then)) {
    setLoading(true)
    try {
      await ret
    }
    finally {
      setLoading(false)
    }
  }
  else {
    return ret
  }
}
