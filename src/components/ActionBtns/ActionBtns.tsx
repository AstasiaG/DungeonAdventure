import React, { FC } from 'react'
import {Btn} from '@/components/UI/Btn/Btn'
import { Link } from 'react-router-dom'
import * as classes from '@/components/UI/Btn/Btn.module.scss'

interface ButtonsProps {
  attack: () => void
}

export const ActionBtns: FC<ButtonsProps> = ({attack}) => {

  return (
    <div>
      <Btn onClick={attack}>
        Attack
      </Btn>
      {/* <Btn onClick={() => attack}>
        Dodge
      </Btn> */}
      <Link to={"/"} className={classes.btn}>
        Run
      </Link>
    </div>
  )
}
