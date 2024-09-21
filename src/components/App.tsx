import '@/styles/global.scss'
import Bg from '@/assets/bg.png'
import { Main } from '@/pages/Main/Main'

export const App = () => {
  
  return (
    <div className='container'>
      <div className='bg'>
        <img src={Bg} alt=''/>
      </div>
      <Main />
    </div>
  )
}
