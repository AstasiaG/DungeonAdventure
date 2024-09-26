import '@/styles/global.scss'
import Bg from '@/assets/bg.png'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { IPlayer } from '@/types/types'
import { PlayerContext } from '@/context'
import { Router } from './Router'
import { DescriptionPanel } from './DescriptionPanel/DescriptionPanel'

export const App = () => {
  const [floor, setFloor] = useState<number>(1)
  const [player, setPlayer] = useState<IPlayer | null>(null)
  const [text, setText] = useState<string>('')
  const playerRef = useRef<IPlayer>(null);

  useEffect(() => {
    if (localStorage.getItem('player')) {
      const currentPlayer: IPlayer = JSON.parse(localStorage.getItem('player'));
      setPlayer(currentPlayer);
    }
  }, [])
  
  return (
    <PlayerContext.Provider value={{
      floor,
      setFloor,
      player,
      setPlayer,
      playerRef,
      text,
      setText
    }}>
      <div className='container'>
        <div className='bg'>
          <img src={Bg} alt=''/>
        </div>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
      <DescriptionPanel />
    </PlayerContext.Provider>
  )
}
