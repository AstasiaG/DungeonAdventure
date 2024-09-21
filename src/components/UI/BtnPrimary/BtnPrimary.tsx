import React, { FC, ReactNode } from 'react'
import * as classes from './BtnPrimary.module.scss'

interface BtnProps {
  children: ReactNode
}

export const BtnPrimary: FC<BtnProps> = ({ children, ...props }) => {
  return (
    <button className={ classes.btn } {...props}>
      { children }
    </button>
  )
}
