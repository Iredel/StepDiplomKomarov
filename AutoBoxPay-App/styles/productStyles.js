import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const productStyles = (theme) =>
    StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            width: 350,
        },
        image: {
            width: '100%',
            height: 300,
            resizeMode: 'cover',
            borderRadius: 12,
            marginBottom: 12,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 12,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
        price: {
            fontSize: 20,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
        text: {
            fontSize: 17,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
        },
        errorContainer: {
            padding: 20,
            alignItems: 'center',
        },
        errorText: {
            color: 'red',
            backgroundColor: 'rgba(0,0,0,0.75)',
            padding: 10,
            borderRadius: 10,
            fontSize: 16,
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        overlayText: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
        },
    })
