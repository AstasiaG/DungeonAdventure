import React, { FC } from 'react'
import * as classes from './WinPanel.module.scss'

interface WinPanelProps {
  floor: number
  setFloor: (floor: number) => void
  setIsWin: (val: boolean) => void
}

export const WinPanel:FC<WinPanelProps> = ({floor, setFloor, setIsWin}) => {
  return (
    <>
      <h2>You're Win!</h2>
      <div className={classes.btnFrame}>
        <button className={classes.btn} onClick={() => {
          setFloor(floor + 1)
          setIsWin(false)
          localStorage.setItem("floor", JSON.stringify(floor))
        }}>
          Next room
        </button>
      </div>
    </>
  )
}
