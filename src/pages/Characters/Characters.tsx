import React, { FC, useContext, useEffect, useState } from 'react'
import {IPlayer} from '@/types/types'
import Data from '@/assets/api.json';
import { CharacterItem } from '@/components/CharacterItem/CharacterItem'
import * as classes from './Characters.module.scss'
import { Link, NavLink } from 'react-router-dom';
import { PlayerContext } from '@/context';

export const Characters = () => {
  const { player, setPlayer } = useContext(PlayerContext)
  const [active, setActive] = useState<number>()

  const characters: IPlayer[] = Data.Characters

  const ChoosePlayer = (character: IPlayer) => {
    // const playerItem = JSON.stringify(character)
    // localStorage.setItem('player', playerItem);
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
      <Link to={'/game'} className={classes.btn}>
        In dungeon
      </Link>
    </div>
  )
}
