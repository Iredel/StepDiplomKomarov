import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme, changeLanguage } from '../redux/actions/appActions'
import Sidebar from '../components/Sidebar'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const SettingsScreen = () => {
    const dispatch = useDispatch()
    const { theme, language } = useSelector((state) => state.app)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    useEffect(() => {
        if (theme === 'Dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    const handleThemeChange = (e) => {
        dispatch(changeTheme(e.target.value))
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-5 bg-gray-100 dark:bg-gray-600">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {localization.settingsPage.title}
                </h1>

                <div className="mb-6">
                    <label
                        htmlFor="language"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        {localization.settingsPage.languagePicker}
                    </label>
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                        <option value="English">{localization.settingsPage.english}</option>
                        <option value="Ukrainian">{localization.settingsPage.ukrainian}</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="theme"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        {localization.settingsPage.themePicker}
                    </label>
                    <select
                        id="theme"
                        value={theme}
                        onChange={handleThemeChange}
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                        <option value="Light">{localization.settingsPage.light}</option>
                        <option value="Dark">{localization.settingsPage.dark}</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SettingsScreen
