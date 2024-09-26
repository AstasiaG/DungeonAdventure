import React, { FC, useContext } from 'react'
import {Btn} from '@/components/UI/Btn/Btn'
import { Link } from 'react-router-dom'
import * as classes from '@/components/UI/Btn/Btn.module.scss'
import { PlayerContext } from '@/context'

interface ButtonsProps {
  attack: () => void
  heal: () => void
}

export const ActionBtns: FC<ButtonsProps> = ({ attack, heal }) => {
  const {setText, player} = useContext(PlayerContext)

  return (
    <div style={{margin: "3rem auto 0", width: 'fit-content'}}>
      <Btn
        onClick={attack}
        onMouseEnter={() => setText(`Атака в ${player.damage} ед, тратит 1 ход`)}
        onMouseLeave={() => setText('')}
      >
        Attack
      </Btn>
      <Btn
        onClick={heal}
        onMouseEnter={() => setText(`Лечение в 20 ед, тратит 2 хода`)}
        onMouseLeave={() => setText('')}
      >
        Heal
      </Btn>
      <Link to={"/"} className={classes.btn}>
        Run
      </Link>
    </div>
  )
}
