import React from 'react'
import Sidebar from '../components/Sidebar'
import ProductsTable from '../components/ProductsTable'
import { useDispatch, useSelector } from 'react-redux'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const MainScreen = () => {
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const dispatch = useDispatch()

    return (
        <div className={`flex h-screen ${theme === 'Dark' ? 'dark' : ''}`}>
            <Sidebar />
            <div className="w-3/4 bg-gray-100 dark:bg-gray-600 p-5">
                <div className="products-section mb-5">
                    <header>
                        <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                            {localization.productsPage.title}
                        </h4>
                    </header>
                    <div className="products-table bg-white dark:bg-gray-700 p-5 rounded shadow">
                        <ProductsTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainScreen
