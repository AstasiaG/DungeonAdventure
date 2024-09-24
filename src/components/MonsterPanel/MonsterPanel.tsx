import { IMonster } from '@/types/types'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import * as classes from './MonsterPanel.module.scss'

interface MonsterPanelProps {
  monster: IMonster
}

export const MonsterPanel: FC<MonsterPanelProps> = ({ monster }) => {
  let healthRef = useRef(monster.health);
  console.log(monster.health, healthRef)

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
