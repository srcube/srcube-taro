'use client'

import type { AlertProps } from '@heroui/react'
import { Alert } from '@heroui/react'

interface BlockquoteProps extends Omit<AlertProps, 'hideIcon' | 'className'> {
}

function Blockquote({ children, ...props }: BlockquoteProps) {
  const { color, ...rest } = props

  return <Alert color={color} hideIcon className="not-prose" {...rest}>{children}</Alert>
}

export default Blockquote
