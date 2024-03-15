import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'qrcode.react'
import ProductModal from '../components/ProductModal'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const ProductTable = () => {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [qrCode, setQRCode] = useState('')
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const user = useSelector((state) => state.auth)
    const theme = useSelector((state) => state.app.theme)

    useEffect(() => {
        fetchProducts().then()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/products/getAllProducts',
                { companyName: user.companyName },
                { headers: { Authorization: `Bearer ${user.token}` } },
            )
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const handleShowModal = (product) => {
        setEditingProduct(product)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setEditingProduct(null)
        setShowModal(false)
    }

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.post(
                `http://localhost:3000/products/deleteProduct/`,
                { companyName: user.companyName, productId },
                { headers: { Authorization: `Bearer ${user.token}` } },
            )
            fetchProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const generateQRCode = (productId, companyName) => {
        const qrData = { companyName, productId }
        const qrString = JSON.stringify(qrData)
        setQRCode(qrString)
    }

    return (
        <div
            className={`container mx-auto mt-5 p-3 border rounded-md ${
                theme === 'Dark' ? 'dark' : ''
            }`}
        >
            {products.length === 0 ? (
                <div
                    className="alert-info p-4 rounded-lg text-blue-700 bg-blue-100 border-l-4 border-blue-500"
                    role="alert"
                >
                    No products available
                </div>
            ) : (
                <div className="max-h-[750px] overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Id
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.productsTable.productPhoto}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.productsTable.productName}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.productsTable.productDescription}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.productsTable.productPrice}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    {localization.productsTable.actionsBtn}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {product._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            className="h-20 w-20"
                                            src={product.productPhoto}
                                            alt={product.productName}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {product.productName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {product.productDescription}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {product.productPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                                            onClick={() => handleShowModal(product)}
                                        >
                                            {localization.productsTable.actionEdit}
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900 dark:hover:text-red-300 mr-3"
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            {localization.productsTable.actionDelete}
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-900 dark:hover:text-green-300"
                                            onClick={() =>
                                                generateQRCode(product._id, user.companyName)
                                            }
                                        >
                                            {localization.productsTable.generateQrCodeBtn}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500"
                onClick={() => handleShowModal(null)}
            >
                {localization.productsTable.addProductBtn}
            </button>

            {qrCode && (
                <div className="mt-3">
                    <QRCode value={qrCode} />
                    <button
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 dark:hover:bg-indigo-500"
                        onClick={() => {
                            setQRCode('')
                        }}
                    >
                        X
                    </button>
                </div>
            )}

            <ProductModal
                show={showModal}
                handleClose={handleCloseModal}
                fetchProducts={fetchProducts}
                user={user}
                isEditing={!!editingProduct}
                editedProduct={editingProduct}
            />
        </div>
    )
}

export default ProductTable
