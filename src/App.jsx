import React from 'react'
import {Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'

const App = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path = '/' element = {<LoginScreen /> }/>
          <Route path = '/login' element = {<LoginScreen /> }/>
          <Route path = '/register' element = {<RegisterScreen />}/>
          <Route path = '/home' element = {<HomeScreen /> }/>
        </Route>
      </Routes>

    </div>
  )
}

export default App
