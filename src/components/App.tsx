import '@/styles/global.scss'
import Bg from '@/assets/bg.png'
import { Main } from '@/pages/Main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Characters } from '@/pages/Characters/Characters'

export const App = () => {
  
  return (
    <div className='container'>
      <div className='bg'>
        <img src={Bg} alt=''/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/characters" element={<Characters />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
