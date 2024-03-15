export const changeTheme = (newTheme) => ({
    type: 'change_theme',
    payload: newTheme,
})

export const changeLanguage = (language) => {
    return {
        type: 'change_language',
        payload: language,
    }
}
