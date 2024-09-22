import React, { FC, useContext, useState } from 'react'
import {IPlayer} from '@/types/types'
import Data from '@/assets/api.json';
import { CharacterItem } from '@/components/CharacterItem/CharacterItem'
import * as classes from './Characters.module.scss'
import { NavLink } from 'react-router-dom';
import { PlayerContext } from '@/context';

export const Characters = () => {
  const { setPlayer } = useContext(PlayerContext)
  const [active, setActive] = useState(0)

  const characters: IPlayer[] = Data.Characters

  const ChoosePlayer = (character: IPlayer) => {
    setActive(character.id)
    setPlayer(character)
  }

  return (
    <div className={ classes.characters }>
      <h2>Choose player</h2>
      <div className={classes.list}>
        {characters.map((character: IPlayer) => 
          <CharacterItem character={character} active={active} onClick={ () => ChoosePlayer(character)} />
        )}
      </div>
      <NavLink to={'/game'} className={classes.btn}>
        In dungeon
      </NavLink>
    </div>
  )
}
