import COLORS from '../../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    theme: COLORS.white,
    language: 'English',
}

export const loadAppSettings = async () => {
    try {
        const serializedState = await AsyncStorage.getItem('appSettings')
        if (serializedState === null) {
            return initialState
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.error('Error loading app settings from AsyncStorage:', error)
        return initialState
    }
}

export const saveAppSettings = async (settings) => {
    try {
        const serializedState = JSON.stringify(settings)
        await AsyncStorage.setItem('appSettings', serializedState)
    } catch (error) {
        console.error('Error saving app settings to AsyncStorage:', error)
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'change_theme':
            const updatedThemeState = { ...state, theme: action.payload }
            saveAppSettings(updatedThemeState)
            return updatedThemeState

        case 'change_language':
            const updatedLanguageState = { ...state, language: action.payload }
            saveAppSettings(updatedLanguageState)
            return updatedLanguageState

        default:
            return state
    }
}

export default appReducer
