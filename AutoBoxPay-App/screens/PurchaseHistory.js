import React, { useState, useEffect, useCallback } from 'react'
import { View, FlatList, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { purchaseHistoryStyles } from '../styles/purchaseHistoryStyles'
import axios from 'axios'
import api from '../scripts/api'
import { useFocusEffect } from '@react-navigation/native'
import { Ukrainian } from '../localization/Ukrainian'
import { English } from '../localization/English'

const PurchaseHistory = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const user = useSelector((state) => state.auth)
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English
    const styles = purchaseHistoryStyles(theme)

    const fetchReportsByEmail = async (email) => {
        try {
            const response = await axios.post(`${api.defaults.baseURL}/report/byEmail`, {
                email: email,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            return response.data
        } catch (error) {
            setError('Failed to fetch purchase history.')
        }
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            fetchReportsByEmail(user.email)
                .then((data) => {
                    setError('')
                    setPurchaseHistory(data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setError('Failed to fetch purchase history.')
                    setLoading(false)
                })
        }, [user.email]),
    )

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        return <Text>{error}</Text>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{localization.purchaseHistory.title}</Text>
            <FlatList
                data={purchaseHistory}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.productPhoto || 'https://via.placeholder.com/100' }}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{item.productName}</Text>
                            <Text style={styles.date}>
                                {localization.purchaseHistory.date}:{' '}
                                {new Date(Number(item.purchaseTime)).toLocaleDateString()}
                            </Text>
                            <Text style={styles.price}>
                                {localization.purchaseHistory.price}: {item.productPrice}₴
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default PurchaseHistory
