import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import { ModeSwitcher, ScrollReset } from '@/components'
import { Providers } from './providers'
import './globals.css'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export const metadata: Metadata = {
  title: 'SrcubeUI Taro',
  description: 'UI components for Taro.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = [
    { href: '/docs/guides/introduction', label: 'Docs' },
    { href: '/docs/components/button', label: 'Components' },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollReset />
        <Providers>
          <header className="fixed top-0 z-40 px-8 2xl:px-0 w-full backdrop-blur-lg border-b border-gray-500/20">
            <div className="container flex gap-4 mx-auto max-w-screen-2xl h-16 items-center">
              <div className="mr-4 flex">
                <Link href="/" className="flex items-center space-x-4">
                  <Logo className="shrink-0 size-8" />
                  <span className="text-lg text-nowrap font-light font-['PingFang_SC','mono']">SrcubeUI Taro</span>
                </Link>
              </div>
              <div className="flex-1" />
              <nav className="flex items-center space-x-6 text-sm font-medium">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-foreground/80"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mx-4 h-8 border-l opacity-20" />
              <Link
                href="https://github.com/srcube/srcube-taro"
                target="_blank"
                className="size-9 flex items-center justify-center cursor-pointer"
              >
                <GitHub className="size-6" />
              </Link>
              <ModeSwitcher />
            </div>
          </header>
          <main className="flex-1 flex flex-col mx-auto mt-16 px-8 2xl:px-0 max-w-screen-2xl w-full z-10 box-border">
            {children}
            <div className="fixed top-0 inset-x-0 h-6 z-0 bg-rainbow filter blur-[50px]" />
          </main>
        </Providers>
      </body>
    </html>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className={className}
    >
      <style type="text/css">
        {`
        .st0 { fill: none; stroke: #227CFF; stroke-width: 24; stroke-linecap: round; stroke-miterlimit: 10; }
        .st1 { fill: none; stroke-width: 18; stroke-linecap: round; stroke-miterlimit: 10; }
      `}
      </style>
      <path
        d="M46.9,115.5l192-110.8c10.6-6.2,23.7-6.2,34.3,0l192,110.8c10.6,6.2,17.1,17.5,17.1,29.7v221.7c0,12.2-6.5,23.5-17.1,29.7
      l-192,110.8c-10.6,6.2-23.7,6.2-34.3,0l-192-110.8c-10.6-6.2-17.1-17.5-17.1-29.7V145.2C29.8,132.9,36.4,121.6,46.9,115.5z
      M275.4,281.1l0,164.1c0,16,17.3,26,31.1,18l142-82.1c6.4-3.7,10.4-10.6,10.4-18l0.1-164c0-16-17.3-26-31.1-18l-142.1,82
      C279.3,266.8,275.4,273.6,275.4,281.1z"
        className="fill-black dark:fill-white"
      />
      <line className="st0" x1="307.7" y1="305.3" x2="430.1" y2="234.6" />
      <line
        className="st1 stroke-black dark:stroke-white"
        x1="307.7"
        y1="360.6"
        x2="391.7"
        y2="312"
      />
      <line
        className="st1 stroke-black dark:stroke-white"
        x1="307.7"
        y1="406.9"
        x2="391.7"
        y2="358.3"
      />
    </svg>
  )
}

function GitHub({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
      >
      </path>
    </svg>
  )
}
