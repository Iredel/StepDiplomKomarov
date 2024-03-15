import React from 'react'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import ReportsTable from '../components/ReportsTable'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const ReportScreen = () => {
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    return (
        <div className={`flex h-screen ${theme === 'Dark' ? 'dark' : ''}`}>
            <Sidebar />
            <div className="flex-grow p-5 bg-gray-100 dark:bg-gray-600">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {localization.reportsPage.title}
                </h1>
                <div className="products-table bg-white dark:bg-gray-700 p-5 rounded shadow">
                    <ReportsTable />
                </div>
            </div>
        </div>
    )
}

export default ReportScreen
