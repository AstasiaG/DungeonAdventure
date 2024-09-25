import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import * as classes from './LosePanel.module.scss'

interface LosePanelProps {
  floor: number
  setFloor: (floor: number) => void
  setIsLose: (val: boolean) => void
}

export const LosePanel:FC<LosePanelProps> = ({ floor, setFloor, setIsLose}) => {
  const router = useNavigate()
  return (
    <div className={classes.lose}>
      <h2>You're Dead!</h2>
      <p>Max floor: {floor}</p>
      <div className={classes.btnFrame}>
        <button className={classes.btn} onClick={() => {
          setFloor(1)
          setIsLose(false)
          router('/characters')
        }}>
          Repeat?
      </button>
      <button className={classes.btn} onClick={() => {
          setFloor(1)
          setIsLose(false)
          router('/')
        }}>
          Exit
        </button>
      </div>
    </div>
  )
}
