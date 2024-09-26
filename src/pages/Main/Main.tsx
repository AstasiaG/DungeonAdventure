import React, { useContext } from 'react'
import * as classes from './Main.module.scss'
import door from '@/assets/door.png'
import { NavLink } from 'react-router-dom'
import { PlayerContext } from '@/context'

export const Main = () => {
  const { player } = useContext(PlayerContext)

  
  return (
    <section className={classes.main}>
      <div className={classes.inner}>
        <h1>Dungeon Adventure</h1>
        <p>
          Это игра в которой вам нужно пробраться через подземелье с монстрами и добраться до сокровища
        </p>
        <p>Чтобы начать нажмите на кнопку ниже!</p>
        <div className={classes.image}>
          <img src={door} alt=''/>
        </div>
        <NavLink to={`${player ? '/game' : '/characters'}`} className={classes.btn}>
          Start Game
        </NavLink>
      </div>
    </section>
  )
}
