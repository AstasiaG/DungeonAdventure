import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as classes from './LosePanel.module.scss'
import { PlayerContext } from '@/context'

interface LosePanelProps {
  floor: number
  setFloor: (floor: number) => void
  setIsLose: (val: boolean) => void
}

export const LosePanel: FC<LosePanelProps> = ({ floor, setFloor, setIsLose }) => {
  const { setPlayer, player} = useContext(PlayerContext)
  const router = useNavigate()
  return (
    <div className={classes.lose}>
      <h2>You're Dead!</h2>
      <p>Max floor: {floor}</p>
      <div className={classes.btnFrame}>
        <button className={classes.btn} onClick={() => {
          setFloor(1)
          setIsLose(false)
          setPlayer(JSON.parse(localStorage.getItem('player')))
          router('/game')
        }}>
          Repeat?
      </button>
      <button className={classes.btn} onClick={() => {
          setFloor(1)
          setIsLose(false)
          localStorage.clear()
          setPlayer(null)
          router('/')
        }}>
          Exit
        </button>
      </div>
    </div>
  )
}
