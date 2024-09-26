import React, { FC, ReactNode } from 'react'
import * as classes from './Btn.module.scss'

interface BtnProps {
  children: ReactNode
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const Btn: FC<BtnProps> = ({ children, ...props }) => {
  return (
    <button className={ classes.btn } {...props}>
      { children }
    </button>
  )
}
