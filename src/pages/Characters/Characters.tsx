import React, { useState } from 'react'
import {IPlayer} from '@/types/types'
import Data from '@/assets/api.json';
import { CharacterItem } from '@/components/CharacterItem/CharacterItem'
import * as classes from './Characters.module.scss'

export const Characters = () => {
  const [player, setPlayer] = useState<IPlayer | null>(null)
  const [active, setActive] = useState(0)

  const characters: IPlayer[] = Data.Characters

  return (
    <div className={ classes.characters }>
      <h2>Choose player</h2>
      <div className={classes.list}>
        {characters.map((character: IPlayer) => 
          <CharacterItem character={character} active={active} onClick={ () => setActive(character.id)} />
        )}
      </div>
    </div>
  )
}
