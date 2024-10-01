import { IEnemy } from '@/types/types';
import React, { useMemo, useState } from 'react'

export const useEnemy = (isLoading: boolean, enemies: IEnemy[], floor: number) => {
  const [enemy, setEnemy] = useState<IEnemy>(null)
  
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

  return [enemy, setEnemy] as const;
}
