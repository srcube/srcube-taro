import type { FC, PropsWithChildren } from 'react'
import { Box } from '@srcube-taro/ui'
import cn from 'classnames'

export interface StateDemoProps {
  className?: string
}

const StateDemo: FC<PropsWithChildren<StateDemoProps>> = (props) => {
  const { children, className } = props

  return (
    <Box className={cn('flex items-center justify-center mb-4 p-2 rounded-lg border-4 border-gray-200 border-solid', className)}>
      {children}
    </Box>
  )
}

StateDemo.displayName = 'Sample.StateDemo'

export default StateDemo
