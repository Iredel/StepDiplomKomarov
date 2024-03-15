import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const ProductModal = ({ show, handleClose, fetchProducts, user, isEditing, editedProduct }) => {
    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productPhoto: '',
    })
    const fileInputRef = useRef(null)
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    useEffect(() => {
        if (isEditing) {
            setProductData({
                productName: editedProduct.productName,
                productDescription: editedProduct.productDescription,
                productPrice: editedProduct.productPrice,
                productPhoto: editedProduct.productPhoto,
            })
        } else {
            resetFormData()
        }
    }, [isEditing, editedProduct])

    const resetFormData = () => {
        setProductData({
            productName: '',
            productDescription: '',
            productPrice: '',
            productPhoto: '',
        })
        setFile(null)
        setFileName('')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setFileName(selectedFile.name)
        }
    }

    const sendPhotoToServer = async () => {
        try {
            if (file) {
                const formData = new FormData()
                formData.append('photo', file)
                const response = await axios.post(
                    'http://localhost:3000/photo/uploadProductImg',
                    formData,
                )
                return `http://192.168.0.103:3000/photo/${fileName}`
            } else {
                return isEditing ? editedProduct.productPhoto : ''
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }

    const handleOperation = async () => {
        try {
            if (
                !productData.productName ||
                !productData.productDescription ||
                !productData.productPrice
            ) {
                alert('Please fill all fields.')
                return
            }
            const productPhotoUrl = await sendPhotoToServer()
            const productPayload = {
                productName: productData.productName,
                productDescription: productData.productDescription,
                productPrice: productData.productPrice,
                productPhoto: productPhotoUrl,
                companyName: user.companyName,
            }
            if (isEditing) {
                await axios.post(
                    `http://localhost:3000/products/updateProduct/`,
                    {
                        ...productPayload,
                        productId: editedProduct._id,
                    },
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    },
                )
            } else {
                await axios.post('http://localhost:3000/products/createProduct', productPayload, {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
            }

            fetchProducts()
            handleClose()
            resetFormData()
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred while saving the product.' + error)
        }
    }

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'block' : 'hidden'}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title"
                                >
                                    {isEditing
                                        ? localization.productModal.editMode.title
                                        : localization.productModal.addMode.title}
                                </h3>
                                <div className="mt-2">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="productName"
                                        type="text"
                                        placeholder={localization.productModal.addMode.nameInput}
                                        name="productName"
                                        value={productData.productName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="productDescription"
                                        type="text"
                                        placeholder={
                                            localization.productModal.addMode.descriptionInput
                                        }
                                        name="productDescription"
                                        value={productData.productDescription}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="productPrice"
                                        type="text"
                                        placeholder={localization.productModal.addMode.priceInput}
                                        name="productPrice"
                                        value={productData.productPrice}
                                        onChange={handleInputChange}
                                    />
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Фото (URL)
                                        </label>
                                        <input
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            id="file-input"
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleClose}
                        >
                            {localization.productModal.closeBtn}
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleOperation}
                        >
                            {isEditing
                                ? localization.productModal.editMode.submitButton
                                : localization.productModal.addMode.submitButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal
