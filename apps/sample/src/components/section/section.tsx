import type { FC, PropsWithChildren } from 'react'
import { Box } from '@srcube-taro/ui'
import cn from 'classnames'

export interface SectionProps {
  title: string
  className?: string
  contentClass?: string
}

const Section: FC<PropsWithChildren<SectionProps>> = (props) => {
  const { title, children, className, contentClass } = props

  return (
    <Box className={cn('flex flex-col gap-2 mb-4 p-3 rounded-lg bg-white', className)}>
      <Box className="flex items-center text-xs font-bold">{title}</Box>
      <Box className={cn(contentClass)}>{children}</Box>
    </Box>
  )
}

Section.displayName = 'Sample.Section'

export default Section
