import { PlayerStats } from '@/components/PlayerStats/PlayerStats'
import { PlayerContext } from '@/context'
import { IMonster, IPlayer } from '@/types/types';
import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Data from '@/assets/api.json'
import { MonsterPanel } from '@/components/MonsterPanel/MonsterPanel';
import { ActionBtns } from '@/components/ActionBtns/ActionBtns';
import * as classes from './Game.module.scss'

export const Game = () => {
  const { floor, player, setFloor, setPlayer, playerRef } = useContext(PlayerContext);
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [monster, setMonster] = useState<IMonster | null>(null);
  const [isWin, setIsWin] = useState<boolean>(false)

  console.log(playerRef.current)

  const attack = () => {
    setMonster({ ...monster, health: monster.health -= player.damage })
    setPlayer({ ...player, action: --player.action})
    console.log(playerRef.current, player)

    checkHealth()
  }

  const checkHealth = () => {
    if (monster.health <= 0) {
      setIsWin(true)
      setPlayer({...player, action: playerRef.current.action})
    }

    if (player.action === 0 && !(monster.health <= 0)) {
      monsterAttack()
    }
  }

  const monsterAttack = () => {
    setPlayer({ ...player, health: player.health -= monster.damage, action: playerRef.current.action})
  }

  const getRandomMonster = useMemo(() => {
    setMonsters(Data.Monsters)
    const result: number = Math.floor(Math.random() * monsters.length)
    setMonster(monsters[result])
  }, [floor, monsters])


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
        :
        <MonsterPanel monster={monster} />
      }
      <PlayerStats />
      {!isWin &&
        <ActionBtns attack={attack} />
      }
    </div>
  )
}
