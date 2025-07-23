export const __DEV__ = process.env.NODE_ENV !== 'production'

export const __TEST__ = process.env.NODE_ENV === 'test'

export const isVoid0 = (v: unknown) => typeof v === 'undefined'

export const isString = (v: unknown) => typeof v === 'string'

export const isFunc = (v: unknown) => typeof v === 'function'
