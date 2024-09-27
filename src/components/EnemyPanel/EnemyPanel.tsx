import { IEnemy } from '@/types/types'
import React, { FC, useContext, useEffect, useMemo, useRef } from 'react'
import * as classes from './EnemyPanel.module.scss'
import { PlayerContext } from '@/context'

interface EnemyPanelProps {
  enemy: IEnemy
}

export const EnemyPanel: FC<EnemyPanelProps> = ({ enemy }) => {
  const { setText} = useContext(PlayerContext)
  let healthRef = useRef(enemy?.health);

  return (
    <div className={classes.card}>
      <h3>
        {enemy.name}
      </h3>
      <progress value={enemy.health} max={healthRef.current} />
      <div
        className={classes.image}
        onMouseEnter={() => setText(enemy.description)}
        onMouseLeave={() => setText('')}
      >
        <img src={enemy.img} alt={`${enemy.name} icon`} />
      </div>
    </div>
  )
}
