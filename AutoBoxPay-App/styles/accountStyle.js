import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const accountStyles = (theme) =>
    StyleSheet.create({
        safeAreaView: {
            flex: 1,
            backgroundColor: theme,
        },
        container: {
            flex: 1,
            marginHorizontal: 22,
        },
        header: {
            marginVertical: 22,
        },
        headerText: {
            fontSize: 22,
            marginVertical: 12,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            fontWeight: 'bold',
        },
        subHeaderText: {
            fontSize: 16,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
        logoutButton: {
            marginTop: 18,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logoutButtonText: {
            color: COLORS.white,
            fontSize: 16,
            fontWeight: 'bold',
        },
        tinyLogo: {
            width: 100,
            height: 100,
            margin: 15,
            borderRadius: 100,
        },
        text: {
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            fontSize: 16,
        },
    })
