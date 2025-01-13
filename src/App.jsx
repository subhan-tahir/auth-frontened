import React from 'react'
import Header from './Header'
import Router from './router/Router'
import Home from './pages/Home'
import Login from './pages/Login'
import Sidebar from './Components/Sidebar'

const App = () => {
  return (
  <>
  
  {/* <Home header={'Home'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellat iste debitis doloremque amet perspiciatis enim animi veniam vitae dolor.'}/> */}
  
  {/* <Login /> */}
  <Sidebar />
  <Router />
  </>
  )
}

export default App