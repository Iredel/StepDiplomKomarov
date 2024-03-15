const initialState = {
    theme: 'Light',
    language: 'English',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'change_theme':
            return { ...state, theme: action.payload }
        case 'change_language':
            return { ...state, language: action.payload }
        default:
            return state
    }
}

export default appReducer
