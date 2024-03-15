import { StyleSheet } from 'react-native'

export const qrScannerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        marginBottom: 20,
    },
    camera: {
        height: 500,
        width: 500,
    },
    button: {
        padding: 10,
        backgroundColor: '#2E8B57',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
