import React from 'react'
import {Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen'
import AuthProtectRoute from './Components/AuthProtectRoute/AuthProtectRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path = '/' element = {<LoginScreen />}/>
          <Route path = '/login' element = {<LoginScreen />}/>
          <Route path = '/register' element = {<RegisterScreen />}/>
          <Route element = {<AuthProtectRoute/>}>
            <Route path = '/home' element = {<HomeScreen />}/>
            <Route path = '/new' element = {<NewWorkspaceScreen />}/>
            <Route path = '/workspaces/:workspace_id' element = {<WorkspaceDetailScreen />}></Route>
            <Route path = '/workspaces/:workspace_id/channels/:channel_id' element={<WorkspaceDetailScreen />}/>
          </Route>
        </Route>
      </Routes>

    </div>
  )
}

export default App
