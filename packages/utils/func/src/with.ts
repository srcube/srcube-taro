import { isFunc } from './assert'

export async function withLoading(fn: ((...args: any[]) => any) | undefined, setLoading: (v: boolean) => void, ...args: any) {
  if (!fn)
    return
  const ret = fn(...args)
  if (ret && isFunc(ret.then)) {
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
