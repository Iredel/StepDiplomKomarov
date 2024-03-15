import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Login from './screens/Login'
import Signup from './screens/Singup'
import Home from './screens/Home'
import Account from './screens/Account'
import AllUsers from './screens/Settings'
import store from './redux/store'
import COLORS from './constants/colors'
import PurchaseHistory from './screens/PurchaseHistory'
import { jwtDecode } from 'jwt-decode'
import { signOut } from './redux/actions/authActions'
import { homeStyles } from './styles/homeStyles'
import { Ukrainian } from './localization/Ukrainian'
import { English } from './localization/English'

global.atob = global.atob || require('base-64').decode
global.btoa = global.btoa || require('base-64').encode

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.black,
                },
                tabBarActiveTintColor: COLORS.primary,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: localization.tabNavigator.home,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="PurchaseHistory"
                component={PurchaseHistory}
                options={{
                    tabBarLabel: localization.tabNavigator.history,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: localization.tabNavigator.account,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={AllUsers}
                options={{
                    tabBarLabel: localization.tabNavigator.settings,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
)

const isTokenExpired = (token) => {
    if (!token) return true

    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000

    return decodedToken.exp < currentTime
}

const AppNavigator = () => {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkAndSignOut = () => {
            if (user.token && isTokenExpired(user.token)) {
                dispatch(signOut())
            }
        }

        checkAndSignOut()
    }, [user.token, dispatch])

    return (
        <NavigationContainer>{user.token ? <TabNavigator /> : <AuthStack />}</NavigationContainer>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    )
}
