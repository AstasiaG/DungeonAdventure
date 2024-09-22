import '@/styles/global.scss'
import Bg from '@/assets/bg.png'
import { Main } from '@/pages/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Characters } from '@/pages/Characters/Characters'
import { Game } from '@/pages/Game/Game'
import { useState } from 'react'
import { IPlayer } from '@/types/types'
import { PlayerContext } from '@/context'

export const App = () => {
  const [floor, setFloor] = useState<number>(1)
  const [player, setPlayer] = useState<IPlayer | null>(null)
  
  return (
    <PlayerContext.Provider value={{
      floor,
      setFloor,
      player,
      setPlayer
    }}>
      <div className='container'>
        <div className='bg'>
          <img src={Bg} alt=''/>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/game" element={<Game />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </PlayerContext.Provider>
  )
}
