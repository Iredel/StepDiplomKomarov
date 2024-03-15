import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const purchaseHistoryStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === COLORS.white ? COLORS.white : COLORS.black,
            paddingHorizontal: 10,
        },
        header: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            marginVertical: 20,
            alignSelf: 'center',
        },
        item: {
            backgroundColor: theme === COLORS.white ? COLORS.white : COLORS.black,
            marginBottom: 15,
            borderRadius: 15,
            flexDirection: 'row',
            shadowColor: COLORS.grey,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 8,
        },
        image: {
            width: 100,
            height: 100,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
        },
        infoContainer: {
            flex: 1,
            padding: 10,
        },
        title: {
            fontSize: 21,
            fontWeight: 'bold',
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            marginBottom: 5,
        },
        date: {
            fontSize: 20,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            marginBottom: 5,
        },
        price: {
            fontSize: 18,
            color: theme === COLORS.black ? COLORS.white : COLORS.black,
            fontWeight: 'bold',
        },
    })
