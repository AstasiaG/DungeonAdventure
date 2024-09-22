import { PlayerContext } from '@/context'
import React, { useContext } from 'react'
import * as classes from './PlayerStats.module.scss'

export const PlayerStats = () => {
  const {player} = useContext(PlayerContext)
  return (
      <ul className={classes.stats}>
        <li className={classes.stat}>
          <p>
            HP
            <br />
            <span>
              {player.health}
            </span>
          </p>
        </li>
        <li className={classes.stat}>
          <p>
            AP
            <br />
            <span>
              {player.action}
            </span>
          </p>
        </li>
        <li className={classes.stat}>
          <p>
            DP
            <br />
            <span>
              {player.damage}
            </span>
          </p>
        </li>
      </ul>
  )
}
