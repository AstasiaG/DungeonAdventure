import React, { useContext, useEffect, useState } from 'react'
import {IPlayer} from '@/types/types'
import { CharacterItem } from '@/components/CharacterItem/CharacterItem'
import * as classes from './Characters.module.scss'
import { Link } from 'react-router-dom';
import { PlayerContext } from '@/context';
import axios from 'axios';
import data from '@/assets/api.json'
import { useFetch } from '@/hooks/useFetch';

export const Characters = () => {
  const { player, setPlayer, playerRef, setText } = useContext(PlayerContext)
  const [characters, setCharacters] = useState<IPlayer[]>([])
  const [active, setActive] = useState<number>()

  useEffect(() => {
    setCharacters(data.characters)
    setText('')
    // fetchCharacters()
  },[])

  const [fetchCharacters, isLoading, error] = useFetch(async() => {
    const response = await axios.get<{ Characters: IPlayer[] }>('https://dummyjson.com/c/c731-51ff-469f-8532');
    setCharacters(response.data.Characters)
  })

  const ChoosePlayer = (character: IPlayer) => {
    localStorage.setItem("player", JSON.stringify(character))
    setActive(character.id)
    setPlayer(character)
    playerRef.current = character
  }

  return (
    <div className={ classes.characters }>
      <h2>Choose player</h2>
      <div className={classes.list}>
        {isLoading ? <h3>Loading...</h3> :
          characters.map((character: IPlayer) => 
            <CharacterItem
              character={character}
              active={active}
              onClick={() => ChoosePlayer(character)}
              key={character.id}
              onMouseEnter={() => setText(character.description)}
              onMouseLeave={() => setText('')}
            />
        )}
      </div>
      <Link to={'/game'} className={classes.btn}>
        In dungeon
      </Link>
    </div>
  )
}
