import { IMonster } from '@/types/types'
import React, { FC, useEffect, useRef } from 'react'
import * as classes from './MonsterPanel.module.scss'

interface MonsterPanelProps {
  monster: IMonster
}

export const MonsterPanel: FC<MonsterPanelProps> = ({ monster }) => {
  const healthRef = useRef(monster.health)

  return (
    <div className={classes.card}>
      <h3>
        {monster.name}
      </h3>
      <progress value={monster.health} max={healthRef.current} />
      <div className={classes.image}>
        <img src={ monster.img } alt={`${monster.name} icon`} />
      </div>
    </div>
  )
}
