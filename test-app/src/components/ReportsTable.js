import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const ReportsTable = () => {
    const [reports, setReports] = useState([])
    const user = useSelector((state) => state.auth)
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    useEffect(() => {
        fetchReports().then()
    }, [])

    const fetchReports = async () => {
        try {
            const response = await axios.post('http://localhost:3000/report/byCompanyName', {
                companyName: user.companyName,
            })
            setReports(response.data)
        } catch (error) {
            console.error('Error fetching reports:', error)
        }
    }

    return (
        <div
            className={`container mx-auto mt-5 p-3 border rounded-md ${
                theme === 'Dark' ? 'dark' : ''
            }`}
        >
            {reports.length === 0 ? (
                <div
                    className="alert-info p-4 rounded-lg text-blue-700 bg-blue-100 border-l-4 border-blue-500"
                    role="alert"
                >
                    {localization.reportsTable.error}
                </div>
            ) : (
                <div className="max-h-[750px] overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.productPhoto}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.buyer}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.buyerEmail}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.purchaseTime}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.productName}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.reportsTable.productPrice}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        <img
                                            className="h-20 w-20"
                                            src={report.productPhoto}
                                            alt={report.productName}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {report.buyer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {report.buyerEmail}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {new Date(Number(report.purchaseTime)).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {report.productName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {report.productPrice}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ReportsTable
