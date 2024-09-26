import { IPlayer } from '@/types/types'
import React, { FC } from 'react'
import * as classes from './CharacterItem.module.scss'

interface CharacterProps {
  onClick: () => void
  character: IPlayer
  active: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const CharacterItem: FC<CharacterProps> = ({ character, active, ...props }) => {
  const isActive = character.id == active ? true : false
  
  return (
    <div className={isActive ? `${classes.card} ${classes.active}` : classes.card} {...props}>
      <h3>{character.name}</h3>
      <div className={classes.image}>
        <img src={character.img} alt={`${ character.name } icon`} />
      </div>
      <ul className={classes.stats}>
        <li className={classes.stat}>
          <p>
            Health
            <span>{ character.health }</span>
          </p>
        </li>
        <li className={classes.stat}>
          <p>
            Attack
            <span>{ character.damage }</span>
          </p>
        </li>
        <li className={classes.stat}>
          <p>
            Action
            <span>{ character.action }</span>
          </p>
        </li>
      </ul>
    </div>
  )
}
