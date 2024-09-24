import { PlayerStats } from '@/components/PlayerStats/PlayerStats'
import { PlayerContext } from '@/context'
import { IMonster, IPlayer } from '@/types/types';
import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { MonsterPanel } from '@/components/MonsterPanel/MonsterPanel';
import { ActionBtns } from '@/components/ActionBtns/ActionBtns';
import * as classes from './Game.module.scss'
import axios from 'axios';

export const Game = () => {
  const { floor, player, setFloor, setPlayer, playerRef } = useContext(PlayerContext);
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [monster, setMonster] = useState<IMonster | null>(null);
  const [isWin, setIsWin] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (localStorage.getItem('player')) {
      const currentPlayer: IPlayer = JSON.parse(localStorage.getItem('player'));
      setPlayer(currentPlayer);
      playerRef.current = currentPlayer
    }
  },[])

  useEffect(() => {
    fetchMonsters()
  },[floor])

  async function fetchMonsters() {
    try {
      const response = await axios.get<{ Monsters: IMonster[] }>('https://dummyjson.com/c/c731-51ff-469f-8532')
      setMonsters(response.data.Monsters)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const attack = () => {
    setMonster({ ...monster, health: monster.health - player.damage })
    setPlayer({ ...player, action: player.action - 1 })
  }

  const checkHealth = useMemo(() => {
    if (player && monster) {
      if ((monster.health) <= 0) {
        setIsWin(true)
        setPlayer({ ...player, action: playerRef.current.action })
        setMonster(null)
        setIsLoading(true)
      }

      if (player.action === 0 && !(monster.health <= 0)) {
        setPlayer({ ...player, health: player.health - monster.damage, action: playerRef.current.action})
      }
    }
  },[player?.action, monster?.health])

  const monsterAttack = () => {
    setPlayer({ ...player, health: player.health - monster.damage, action: playerRef.current.action})
  }

  const getRandomMonster = useMemo(() => {
    const result: number = Math.floor(Math.random() * monsters.length)
    setMonster(monsters[result])
  }, [monsters])

  return (
    <div className={classes.game}>
      <h2>${floor} Floor</h2>
      {isWin ?
        <div className={classes.btnFrame}>
          <button className={classes.btn} onClick={() => {
            setFloor(floor + 1)
            setIsWin(false)
          }}>
            Next room
          </button>
        </div>
        : isLoading ? <h3>Loading...</h3> :
        <MonsterPanel monster={monster} />
      }
      {player &&
        <PlayerStats />
      }
      {!isWin &&
        <ActionBtns attack={attack} />
      }
    </div>
  )
}
