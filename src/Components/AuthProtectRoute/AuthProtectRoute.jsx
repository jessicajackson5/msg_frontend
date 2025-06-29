 import React from 'react'
 import LOCALSTORAGE_KEYS from '../../constants/localstorage'
 import { Outlet } from 'react-router-dom'

 const AuthProtectRoute = () => {
    const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
    console.log(auth_token
        
    )
    if(auth_token){
        return <Outlet/>
    } else{
        return <Navigate to={'/login'}/>
    }
 }
 export default AuthProtectRoute