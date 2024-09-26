import { PlayerStats } from '@/components/PlayerStats/PlayerStats'
import { PlayerContext } from '@/context'
import { IMonster, IPlayer } from '@/types/types';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { MonsterPanel } from '@/components/MonsterPanel/MonsterPanel';
import { ActionBtns } from '@/components/ActionBtns/ActionBtns';
import * as classes from './Game.module.scss'
import axios from 'axios';
import { WinPanel } from '@/components/WinPanel/WinPanel';
import { LosePanel } from '@/components/LosePanel/LosePanel';

import data from '@/assets/api.json'

export const Game = () => {
  const { floor, player, setFloor, setPlayer, playerRef, setText } = useContext(PlayerContext);
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [monster, setMonster] = useState<IMonster | null>(null);
  const [isWin, setIsWin] = useState<boolean>(false)
  const [isLose, setIsLose] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // проверяем наличие игрока, сохраняем в переменную и реф
  useEffect(() => {
    if (localStorage.getItem('player')) {
      const currentPlayer: IPlayer = JSON.parse(localStorage.getItem('player'));
      setPlayer(currentPlayer);
      playerRef.current = currentPlayer
    }
  }, [])
  
// получаем монстров
  useEffect(() => {
    fetchMonsters()
  },[])

  async function fetchMonsters() {
    try {
      // const response = await axios.get<{ Monsters: IMonster[] }>('https://dummyjson.com/c/c731-51ff-469f-8532')
      // setMonsters(response.data.Monsters)
      setMonsters(data.Monsters)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // атака игрока
  const attack = () => {
    setMonster({ ...monster, health: monster.health - player.damage })
    setPlayer({ ...player, action: player.action - 1 })
  }

  const heal = () => {
    if (player.health < playerRef.current.health && player.action >= 2) {
      if (playerRef.current.health + 15 > playerRef.current.health) {
        setPlayer({ ...player, health: playerRef.current.health, action: player.action - 2 })
      } else {
        setPlayer({ ...player, health: player.health + 15, action: player.action - 2 })
      }
    } else if(player.health === playerRef.current.health) {
        setText('У вас уже полное здоровье!')
       setTimeout(() => {
        setText('')
      }, 2000);
    }
  }

  // следим за здоровьем монстра и ходами игрока
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

      if (player.health <= 0) {
        setIsLose(true)
        localStorage.clear()
      }
    }
  },[player?.action, monster?.health])

  const monsterAttack = () => {
    setPlayer({ ...player, health: player.health - monster.damage, action: playerRef.current.action })
  }

  const getRandomMonster = useMemo(() => {
    const result: number = Math.floor(Math.random() * monsters.length)
    setMonster(monsters[result])
  }, [floor,monsters])

  return (
    <div className={classes.game}>
      {isWin ?
        <WinPanel floor={floor} setFloor={setFloor} setIsLoading={setIsLoading} setIsWin={setIsWin} />
        :
        isLose ?
          <LosePanel floor={floor} setFloor={setFloor} setIsLose={setIsLose} />
        :
        isLoading ?
          <h3>Loading...</h3>
        :
          <>
            <h2>{floor} Floor</h2>
            <MonsterPanel monster={monster} />
          </>
      }

      {player &&
        <PlayerStats />
      }
      {!isWin &&
        <ActionBtns attack={attack} heal={heal} />
      }
    </div>
  )
}
