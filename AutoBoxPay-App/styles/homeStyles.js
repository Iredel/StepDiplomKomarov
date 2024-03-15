import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const homeStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === COLORS.black ? COLORS.black : COLORS.white,
        },
        scannedText: {
            marginTop: 20,
            fontSize: 16,
            fontWeight: 'bold',
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
    })
