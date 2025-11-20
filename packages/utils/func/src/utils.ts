/**
 * Creates a debounced function that delays invoking `func` until after `waitMilliseconds` have elapsed
 * since the last time the debounced function was invoked. The debounced function has the
 * same `this` context and arguments as the original function.
 *
 * @param func - The function to debounce.
 * @param waitMilliseconds - The number of milliseconds to delay; defaults to 0.
 *
 * @returns A new debounced function.
 *
 * @typeParam F - The type of the function to debounce.
 *
 * @example
 * const save = debounce(() => console.log('Saved!'), 300);
 * save(); // Will log 'Saved!' after 300ms, subsequent calls within 300ms will reset the timer.
 */

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout = undefined
      func.apply(this, args)
    }

    if (timeout !== undefined) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, waitMilliseconds)
  }
}
