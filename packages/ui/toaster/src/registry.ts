import type { UseToastProps } from './toast/use'

export interface ToastItem extends UseToastProps {
  id: string
  timestamp: number
}

let toastRegistry: ToastItem[] = []
let toastListeners: Array<(toasts: ToastItem[]) => void> = []

function generateId(): string {
  return `SrcubeUI.Toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function addToast(toast: Omit<ToastItem, 'id' | 'timestamp'>): { id: string, close: () => void } {
  const id = generateId()
  const newToast: ToastItem = {
    ...toast,
    id,
    timestamp: Date.now(),
  }

  toastRegistry = [...toastRegistry, newToast]

  toastListeners.forEach(listener => listener(toastRegistry))

  const duration = toast.duration ?? 1500
  if (toast.autoDismiss !== false && duration > 0) {
    setTimeout(() => {
      closeToast(id)
    }, duration)
  }

  return {
    id,
    close: () => closeToast(id),
  }
}

export function closeToast(id: string): void {
  toastRegistry = toastRegistry.filter(toast => toast.id !== id)
  toastListeners.forEach(listener => listener(toastRegistry))
}

export function clearToasts(): void {
  toastRegistry = []
  toastListeners.forEach(listener => listener(toastRegistry))
}

export function getToasts(): ToastItem[] {
  return [...toastRegistry]
}

export function subscribeToasts(listener: (toasts: ToastItem[]) => void): () => void {
  toastListeners.push(listener)

  listener(toastRegistry)

  return () => {
    toastListeners = toastListeners.filter(l => l !== listener)
  }
}
