// export const isAsyncFunc = (v: (...args: any[]) => any) => v.constructor.name === 'AsyncFunction'

export const isUndefined = (v: unknown) => typeof v === 'undefined'

export const isString = (v: unknown) => typeof v === 'string'

export const isFunc = (v: unknown) => typeof v === 'function'
