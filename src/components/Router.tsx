import { PlayerContext } from '@/context'
import { Characters } from '@/pages/Characters/Characters'
import { Game } from '@/pages/Game/Game'
import { Main } from '@/pages/Main/Main'
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const Router = () => {
  const { player } = useContext(PlayerContext);
  return (
    player
      ?
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Main />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
      :
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/" element={<Main />} />
        <Route path="/game" element={ < Navigate to="/characters" replace/>}/>
      </Routes>
  )
}
