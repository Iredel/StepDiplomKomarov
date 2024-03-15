import { configureStore } from '@reduxjs/toolkit'
import { loadState } from './reducers/authReducer'
import { loadAppSettings } from './reducers/appReducer'
import rootReducer from './reducers/rootReducer'

const store = configureStore({
    reducer: rootReducer,
})

loadState().then((preloadedState) => {
    store.dispatch({ type: 'SIGN_IN', payload: preloadedState })
})

loadAppSettings().then((preloadedSettings) => {
    store.dispatch({ type: 'change_theme', payload: preloadedSettings.theme })
    store.dispatch({ type: 'change_language', payload: preloadedSettings.language })
})

export default store
