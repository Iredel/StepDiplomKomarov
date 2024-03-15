import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    userId: null,
    token: null,
    photoUrl: null,
    email: null,
    name: null,
    lastName: null,
}

export const loadState = async () => {
    try {
        const serializedState = await AsyncStorage.getItem('authState')
        if (serializedState === null) {
            return initialState
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.error('Error loading state from AsyncStorage:', error)
        return initialState
    }
}

const saveState = async (state) => {
    try {
        const serializedState = JSON.stringify(state)
        await AsyncStorage.setItem('authState', serializedState)
    } catch (error) {
        console.error('Error saving state to AsyncStorage:', error)
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            const { userId, email, token, photoUrl, name, lastName } = action.payload
            const newState = {
                ...state,
                userId,
                token,
                email,
                photoUrl,
                name,
                lastName,
            }
            saveState(newState)
            return newState

        case 'SIGN_OUT':
            const signOutState = {
                ...state,
                userId: null,
                token: null,
                photoUrl: null,
                email: null,
                name: null,
                lastName: null,
            }
            saveState(signOutState)
            return signOutState

        default:
            return state
    }
}

export default authReducer
