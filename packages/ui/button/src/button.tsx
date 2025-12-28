import type { TaroElement } from '@tarojs/runtime'
import type { UseButtonProps } from './use'
import { Spinner } from '@srcube-taro/spinner'
import { Button as NButton } from '@tarojs/components'
import { forwardRef } from 'react'
import { useButton } from './use'

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<TaroElement, ButtonProps>((props, ref) => {
  const {
    isLoading,
    startContent,
    endContent,
    spinner = <Spinner />,
    spinnerPlacement,
    children,
    getButtonProps,
  } = useButton({
    ...props,
    ref,
  })

  return (
    <NButton {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === 'start' && spinner}
      {children}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
    </NButton>
  )
})

Button.displayName = 'Srcube.Button'

export default Button
