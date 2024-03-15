import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})
const persistor = persistStore(store)

export { store, persistor }
