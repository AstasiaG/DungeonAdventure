import { PlayerStats } from '@/components/UI/PlayerStats/PlayerStats'
import { PlayerContext } from '@/context'
import { IEnemy, IPlayer } from '@/types/types';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ActionBtns } from '@/components/UI/ActionBtns/ActionBtns';
import * as classes from './Game.module.scss'
import axios from 'axios';
import { WinPanel } from '@/components/WinPanel/WinPanel';
import { LosePanel } from '@/components/LosePanel/LosePanel';

import data from '@/assets/api.json'
import { EnemyPanel } from '@/components/EnemyPanel/EnemyPanel';
import { useFetch } from '@/hooks/useFetch';
import { getPlayer } from '@/utils/GetPlayer';

export const Game = () => {
  const { floor, player, setFloor, setPlayer, playerRef, setText } = useContext(PlayerContext);
  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const [enemy, setEnemy] = useState<IEnemy | null>(null);
  const [isWin, setIsWin] = useState<boolean>(null)
  const [isLose, setIsLose] = useState<boolean>(false)

  // проверяем наличие игрока, сохраняем в переменную и реф
  useEffect(() => {
    // setEnemies(data.enemies)
    fetchEnemies()

    setPlayer(getPlayer(player))
    playerRef.current = getPlayer(player)

  }, [])

  const [fetchEnemies, isLoading, error] = useFetch(async() => {
    const response = await axios.get<{ Monsters: IEnemy[] }>('https://dummyjson.com/c/c731-51ff-469f-8532')
    setEnemies(response.data.Monsters)
  })

  useEffect(() => {
    checkWin()
    enemyAttack()

  }, [player, enemy])

  // атака игрока
  const playerAttack = () => {
    setEnemy({ ...enemy, health: enemy.health - player.damage })
    setPlayer({ ...player, action: player.action - 1 })
  }

  const heal = () => {
    const currentHealth = player.health;
    const maxHealth = playerRef.current.health;

    if (currentHealth < maxHealth && player.action >= 2) {
      setPlayer({
        ...player,
        health:
          currentHealth + 15 > maxHealth
            ?
            maxHealth
            :
            currentHealth + 15,
        action: player.action - 2
      })
      setText("Лечение на 15 ед")

    } else if(currentHealth === maxHealth) {
        setText('У вас уже полное здоровье!')
    } else if (currentHealth < maxHealth && player.action < 2) {
      setText('Не хватает очков действия!')
    }
  }

  // следим за здоровьем монстра и ходами игрока
  const checkWin = () => {
    if (player && enemy) {
      if ((enemy.health) <= 0) {
        setIsWin(true)
        setPlayer({ ...player, action: playerRef.current.action })
        setEnemy(null)
        localStorage.removeItem("enemy")
      } else if (player.health <= 0) {
        setIsLose(true)
        setText(`Ваш герой пал в коридорах подземелья от руки ${enemy}`)
        localStorage.clear()
      }
    }
  }

  const enemyAttack = () => {
    if (player.action === 0 && !(enemy.health <= 0)) {
      setPlayer({ ...player, health: player.health - enemy.damage, action: playerRef.current.action })
    }
  }


  const getEnemy = useMemo(() => {
    if (!isLoading) {
      if (localStorage.getItem('enemy')) {
        const id: number = JSON.parse(localStorage.getItem('enemy'))
        setEnemy(enemies[id])
      } else if (!enemy) {
        const result: number = Math.floor(Math.random() * enemies.length)
        setEnemy(enemies[result])
        localStorage.setItem("enemy", JSON.stringify(result))
      }
    }
  }, [floor, enemies])

  return (
    <div className={classes.game}>
      {isWin ?
        <WinPanel floor={floor} setFloor={setFloor} setIsWin={setIsWin} />
        :
        isLose ?
          <LosePanel floor={floor} setFloor={setFloor} setIsLose={setIsLose} />
          :
        !enemy ?
          <h3>Loading...</h3>
        :
          <>
            <h2>{floor} Floor</h2>
            <EnemyPanel enemy={enemy} />
          </>
      }

      {player &&
        <PlayerStats />
      }

      {!isWin &&
        <ActionBtns attack={playerAttack} heal={heal} />
      }
    </div>
  )
}
