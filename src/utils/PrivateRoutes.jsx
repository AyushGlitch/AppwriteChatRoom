import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoutes = ({children}) => {
    const {user} = useAuth()
    return (
        <>
            {user ? children : <Navigate to="/login"/>}
        </>
    )
}

export default PrivateRoutes