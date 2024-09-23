import React, { useContext, useEffect, useState } from 'react'
import {IPlayer} from '@/types/types'
import Data from '@/assets/api.json';
import { CharacterItem } from '@/components/CharacterItem/CharacterItem'
import * as classes from './Characters.module.scss'
import { Link } from 'react-router-dom';
import { PlayerContext } from '@/context';
import axios from 'axios';

export const Characters = () => {
  const { player, setPlayer, playerRef } = useContext(PlayerContext)
  const [characters, setCharacters] = useState<IPlayer[]>([])
  const [active, setActive] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // const characters: IPlayer[] = Data.Characters

  useEffect(() => {
    fetchCharacters()
  },[])

  async function fetchCharacters() {
    try {
      const response = await axios.get<{ Characters: IPlayer[] }>('https://dummyjson.com/c/c731-51ff-469f-8532')
      setCharacters(response.data.Characters)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const ChoosePlayer = (character: IPlayer) => {
    // const playerItem = JSON.stringify(character)
    // localStorage.setItem('player', playerItem);
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
          <CharacterItem character={character} active={active} onClick={ () => ChoosePlayer(character)} />
        )}
      </div>
      <Link to={'/game'} className={classes.btn}>
        In dungeon
      </Link>
    </div>
  )
}
