import React, { useState, useEffect } from 'react'
import { View, Text, Switch, TouchableOpacity, Modal, Picker } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { changeTheme, changeLanguage } from '../redux/actions/appActions'
import { settingsStyles } from '../styles/settingsStyles'
import COLORS from '../constants/colors'
import { English } from '../localization/English'
import { Ukrainian } from '../localization/Ukrainian'

const Settings = () => {
    const [themeEnabled, setThemeEnabled] = useState(false)
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false)
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const dispatch = useDispatch()
    const styles = settingsStyles(theme)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    useEffect(() => {
        dispatch(changeTheme(COLORS.white))
    }, [])

    const toggleDarkMode = () => {
        setThemeEnabled((prev) => !prev)
        const newTheme = themeEnabled ? COLORS.white : COLORS.black
        dispatch(changeTheme(newTheme))
    }

    const changeLanguageHandler = (selectedLanguage) => {
        dispatch(changeLanguage(selectedLanguage))
        setLanguageModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Modal transparent animationType="slide" visible={isLanguageModalVisible}>
                <View style={styles.languageModalContainer}>
                    <View style={styles.languageModalContent}>
                        <TouchableOpacity onPress={() => changeLanguageHandler('English')}>
                            <Text style={styles.languageModalText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeLanguageHandler('Ukrainian')}>
                            <Text style={styles.languageModalText}>Українська</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
                            <Text style={styles.languageModalText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text style={styles.title}>{localization.settingsPage.title}</Text>
            <View style={styles.switchContainer}>
                <Text
                    style={{
                        fontSize: 17,
                        color: theme === COLORS.black ? COLORS.white : COLORS.black,
                    }}
                >
                    {localization.settingsPage.darkModeText}
                </Text>
                <Switch value={themeEnabled} onValueChange={toggleDarkMode} />
            </View>

            <View style={styles.languageContainer}>
                <Text style={{ fontSize: 17, color: theme === COLORS.black ? COLORS.white : COLORS.black }}>
                    {localization.settingsPage.languageSwitchText}
                </Text>
                <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
                    <Text style={styles.languageText}>{language}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    theme: state.app.theme,
    language: state.app.language,
})

const mapDispatchToProps = {
    changeTheme,
    changeLanguage,
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
