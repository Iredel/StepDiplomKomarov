import React from 'react'
import { View, Text, Image, SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../redux/actions/authActions'
import { accountStyles } from '../styles/accountStyle'
import Button from '../components/Button'
import { English } from '../localization/English'
import { Ukrainian } from '../localization/Ukrainian'

const Account = ({ navigation }) => {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const styles = accountStyles(theme)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const handleSignOut = () => {
        dispatch(signOut())
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {localization.accountPage.accountPageHeaderText}! 👋
                    </Text>
                    <Text style={styles.subHeaderText}>
                        {localization.accountPage.accountPageSubHeaderText}.
                    </Text>
                </View>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: user.photoUrl,
                    }}
                />

                <Text style={styles.text}>Email: {user.email}</Text>
                <Text style={styles.text}>
                    Name: {user.name} {user.lastName}
                </Text>
                <Button
                    title={localization.accountPage.accountLogoutButton}
                    onPress={handleSignOut}
                    filled
                ></Button>
            </View>
        </SafeAreaView>
    )
}

export default Account
