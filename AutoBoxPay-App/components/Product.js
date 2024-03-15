import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import api from '../scripts/api'
import { productStyles } from '../styles/productStyles'
import Button from './Button'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const Product = (props) => {
    const [fetchedData, setFetchedData] = useState({})
    const [loading, setLoading] = useState(true)
    const [itPurchased, setItPurchased] = useState(false)
    const [error, setError] = useState('')
    const productData = JSON.parse(props.data)
    const user = useSelector((state) => state.auth)
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const styles = productStyles(theme)

    const getProduct = async () => {
        try {
            const response = await axios.post(
                `${api.defaults.baseURL}/products/getProduct/`,
                {
                    companyName: productData.companyName,
                    productId: productData.productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            )
            setFetchedData(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.status === 404) {
                setError(localization.product.noProductMsg)
            }
        }
    }
    const productPurchase = async () => {
        try {
            const deleteResponse = await axios.post(
                `${api.defaults.baseURL}/products/deleteProduct/`,
                {
                    companyName: productData.companyName,
                    productId: productData.productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            )
            const reportResponse = await axios.post(
                `${api.defaults.baseURL}/report/createReport`,
                {
                    buyer: `${user.name + ' ' + user.lastName}`,
                    buyerEmail: user.email,
                    purchaseTime: Date.now(),
                    productPrice: fetchedData.productPrice,
                    productPhoto: fetchedData.productPhoto,
                    productName: fetchedData.productName,
                    companyName: productData.companyName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            )
            setItPurchased(true)
        } catch (error) {
            console.error('Error fetching product:', error)
            setError('Error fetching product')
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    if (loading) {
        return <Text>{localization.product.loading}</Text>
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{localization.product.noProductMsg}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {itPurchased && (
                <View style={styles.overlay}>
                    <Text style={styles.overlayText}>{localization.product.purchased}</Text>
                </View>
            )}
            <Image source={{ uri: fetchedData.productPhoto }} style={styles.image} />
            <Text style={styles.title}>{fetchedData.productName}</Text>
            <Text style={styles.text}>{fetchedData.productDescription}</Text>
            <Text style={styles.price}>
                {localization.product.price}: {fetchedData.productPrice} ₴
            </Text>
            {!itPurchased && (
                <Button title={localization.product.buy} onPress={productPurchase} filled />
            )}
        </View>
    )
}

export default Product
