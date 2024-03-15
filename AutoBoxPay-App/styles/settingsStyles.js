import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const settingsStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme === COLORS.black ? COLORS.black : COLORS.white,
        },
        title: {
            fontSize: 36,
            fontWeight: 'bold',
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            marginBottom: 16,
        },
        switchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
        },
        languageContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
        },
        languageModalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 100,
            marginBottom: 250,
            marginTop: 250,
            border: 1,
            borderStyle: 'solid',
            borderColor: theme === COLORS.black ? COLORS.white : COLORS.black,
            borderWidth: 2,
            borderRadius: 10,
        },
        languageModalContent: {
            color: theme === COLORS.black ? COLORS.black : COLORS.white,
            padding: 20,
            borderRadius: 10,
        },
        languageModalText: {
            fontSize: 18,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            marginVertical: 10,
        },
        languageText: {
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
    })
}
