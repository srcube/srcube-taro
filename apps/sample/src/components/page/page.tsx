import type { FC, PropsWithChildren } from 'react'
import { Box } from '@srcube-taro/ui'
import { tv } from 'tailwind-variants'

export interface PageProps {
  className?: string
}

const page = tv({
  base: 'py-4 px-3 min-h-screen bg-slate-100',
})

const Page: FC<PropsWithChildren<PageProps>> = (props) => {
  const { children, className } = props

  return <Box className={page({ className })}>{children}</Box>
}

Page.displayName = 'Sample.Page'

export default Page
