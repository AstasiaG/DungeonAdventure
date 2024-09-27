import React, { useContext } from 'react'
import * as classes from './DescriptionPanel.module.scss'
import { PlayerContext } from '@/context'

export const DescriptionPanel = () => {
  const { text} = useContext(PlayerContext)
  return (
    <div className={classes.panel}>
      <p >{ text }</p>
    </div>
  )
}
