import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginScreen from './screens/LoginScreen'
import SingUpScreen from './screens/SingUpScreen'
import MainScreen from './screens/MainScreen'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import SettingsScreen from './screens/SettingsScreen'
import ReportScreen from './screens/ReportScreen'
import { signOut } from './redux/actions/authActions'

const isTokenExpired = (token) => {
    if (!token) return true

    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000

    return decodedToken.exp < currentTime
}

function App() {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const userIsAuthenticated = user.token

    useEffect(() => {
        const checkAndSignOut = () => {
            if (user.token && isTokenExpired(user.token)) {
                dispatch(signOut())
            }
        }

        checkAndSignOut()
    }, [user.token, dispatch])
    return (
        <>
            {userIsAuthenticated ? (
                <>
                    <Routes>
                        <Route path={'/'} element={<MainScreen />} />
                        <Route path={'/settings'} element={<SettingsScreen />} />
                        <Route path={'/reports'} element={<ReportScreen />} />
                        <Route path={'*'} element={<MainScreen />} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route path={'/login'} element={<LoginScreen />} />
                        <Route path={'/register'} element={<SingUpScreen />} />
                        <Route path={'*'} element={<LoginScreen />} />
                    </Routes>
                </>
            )}
        </>
    )
}

export default App
