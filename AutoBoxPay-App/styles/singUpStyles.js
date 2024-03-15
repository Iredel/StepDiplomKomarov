import { StyleSheet } from 'react-native'
import COLORS from '../constants/colors'

export const singUpStyles = StyleSheet.create({
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
        color: COLORS.black,
    },
    subHeaderText: {
        fontSize: 16,
        color: COLORS.black,
    },
    inputContainer: {
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 16,

        marginVertical: 8,
    },
    inputWrapper: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
    },
    input: {
        width: '100%',
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxText: {
        fontSize: 16,
    },
    signupButton: {
        marginTop: 18,
        marginBottom: 4,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
    },
    dividerText: {
        fontSize: 14,
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialLoginButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
    },
    socialLoginIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22,
    },
    loginText: {
        fontSize: 16,
        color: COLORS.black,
    },
    loginLink: {
        fontSize: 16,
        color: COLORS.primary,
        marginLeft: 6,
    },
})
