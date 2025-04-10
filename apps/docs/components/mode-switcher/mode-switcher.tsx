'use client'

import { useTheme } from 'next-themes'

function ModeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-md size-9 cursor-pointer"
      aria-label="Switch theme mode"
    >
      <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}

function Moon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M28.053 4.41c-5.47 1.427-9.507 6.4-9.507 12.317c0 7.03 5.698 12.728 12.727 12.728c5.916 0 10.89-4.038 12.316-9.508A20 20 0 0 1 44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4c1.389 0 2.744.141 4.053.41Z"
      >
      </path>
    </svg>
  )
}

function Sun({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}>
      <path
        fill="currentColor"
        d="M8 13a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1M8 3a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1m7 4a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2zM3 8a1 1 0 0 1-1 1H1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1m9.95 3.536l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414m-9.9-7.072l-.707-.707a.999.999 0 1 1 1.414-1.414l.707.707A.999.999 0 1 1 3.05 4.464m9.9 0a.999.999 0 1 1-1.414-1.414l.707-.707a.999.999 0 1 1 1.414 1.414zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414zM8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 6.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"
      >
      </path>
    </svg>
  )
}

ModeSwitcher.displayName = 'ModeSwitcher'

export default ModeSwitcher
