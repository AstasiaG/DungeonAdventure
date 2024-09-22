import { PlayerStats } from '@/components/PlayerStats/PlayerStats'
import { PlayerContext } from '@/context'
import { IMonster } from '@/types/types';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Data from '@/assets/api.json'
import { MonsterPanel } from '@/components/MonsterPanel/MonsterPanel';
import { ActionBtns } from '@/components/ActionBtns/ActionBtns';
import * as classes from './Game.module.scss'

export const Game = () => {
  const { floor, player, setFloor } = useContext(PlayerContext);
  const [monsters, setMonsters] = useState<IMonster[]>([]);
  const [monster, setMonster] = useState<IMonster | null>(null);
  const [isWin, setIsWin] = useState<boolean>(false)

  const attack = () => {
    setMonster({ ...monster, health: monster.health -= player.damage })
    if (monster.health <= 0) {
      setIsWin(true)
    }
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
        <button className={classes.btn} onClick={() => {
          setFloor(floor + 1)
          setIsWin(false)
        }}>
          Next room
        </button>
        :
        <MonsterPanel monster={monster} />
      }
      <PlayerStats />
      <ActionBtns attack={attack} />
    </div>
  )
}
