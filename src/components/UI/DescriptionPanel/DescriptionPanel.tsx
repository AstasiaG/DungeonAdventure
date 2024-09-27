import React, { useContext } from 'react'
import * as classes from './DescriptionPanel.module.scss'
import { PlayerContext } from '@/context'
import { useLocation, useParams } from 'react-router-dom'

export const DescriptionPanel = () => {
  const { text } = useContext(PlayerContext)
  const location = useLocation()
  
  return (
    location.pathname !== '/' &&
      <div className={classes.panel}>
        <p >{ text }</p>
      </div >
  )
}
