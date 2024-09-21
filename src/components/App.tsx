import { Suspense, useState } from 'react'
import '@/components/App.scss'
import { Link, Outlet } from 'react-router-dom';
import bg from '@/assets/yami-yami-8.jpg'
import Coffee from '@/assets/coffee-cup.svg'

export const App = () => {
  const [count, setCount] = useState(0);
 
   function increment() {
     setCount(count + 1);
   }
 
   function decrement() {
     setCount(count - 1);
  }

  
  
  return (
    <div>
      <h2>Working</h2>
    </div>
  )
}
