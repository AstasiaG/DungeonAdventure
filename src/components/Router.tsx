import { PlayerContext } from '@/context'
import { Characters } from '@/pages/Characters/Characters'
import { Game } from '@/pages/Game/Game'
import { Main } from '@/pages/Main/Main'
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const Router = () => {
  const { player } = useContext(PlayerContext);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/game" element={player ? <Game /> : < Navigate to="/characters" replace />} />
      <Route path="/characters" element={player ? <>< Navigate to="/game" replace />} /> */}
      
      {player
        ?
        <>
          <Route path="/game" element={<Game />} />
          <Route path="/characters" element={< Navigate to="/game" replace />} />
        </>
        :
        <>
          <Route path="/characters" element={<Characters />} />
          <Route path="/game" element={< Navigate to="/characters" replace />} />
        </>
      }
    </Routes>
  )
}
