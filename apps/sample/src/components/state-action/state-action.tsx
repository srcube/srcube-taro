import type { FC, PropsWithChildren } from 'react'
import { Box } from '@srcube-taro/ui'
import cn from 'classnames'

export interface StateActionProps {
  title: string
  className?: string
  contentClass?: string
}

const StateAction: FC<PropsWithChildren<StateActionProps>> = (props) => {
  const { title, children, className, contentClass } = props

  return (
    <Box className={cn('flex flex-col gap-2 mb-3', className)}>
      <Box className="flex items-center justify-center text-xs font-bold">{title}</Box>
      <Box className={cn(contentClass)}>{children}</Box>
    </Box>
  )
}

StateAction.displayName = 'Sample.StateAction'

export default StateAction
