'use client'

import type { PropsWithChildren } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  )
}
