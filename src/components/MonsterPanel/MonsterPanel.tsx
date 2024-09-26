import { IMonster } from '@/types/types'
import React, { FC, useContext, useEffect, useMemo, useRef } from 'react'
import * as classes from './MonsterPanel.module.scss'
import { PlayerContext } from '@/context'

interface MonsterPanelProps {
  monster: IMonster
}

export const MonsterPanel: FC<MonsterPanelProps> = ({ monster }) => {
  const { setText} = useContext(PlayerContext)
  let healthRef = useRef(monster?.health);

  return (
    <div className={classes.card}>
      <h3>
        {monster.name}
      </h3>
      <progress value={monster.health} max={healthRef.current} />
      <div
        className={classes.image}
        onMouseEnter={() => setText(monster.description)}
        onMouseLeave={() => setText('')}
      >
        <img src={monster.img} alt={`${monster.name} icon`} />
      </div>
    </div>
  )
}
