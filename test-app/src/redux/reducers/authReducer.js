const initialState = {
    userId: null,
    token: null,
    companyName: null,
    photoUrl: null,
    email: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            const { userId, email, token, companyName, photoUrl } = action.payload
            return {
                ...state,
                userId: userId,
                token: token,
                companyName: companyName,
                email: email,
                photoUrl: photoUrl,
            }

        case 'SIGN_OUT':
            return {
                ...state,
                userId: null,
                token: null,
                companyName: null,
                photoUrl: null,
                email: null,
            }

        default:
            return state
    }
}

export default authReducer
