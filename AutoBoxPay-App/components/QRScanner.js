import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { qrScannerStyles as styles } from '../styles/qrScannerStyles'
import Button from './Button'
import { English } from '../localization/English'
import { Ukrainian } from '../localization/Ukrainian'
import { useSelector } from 'react-redux'

const QRScanner = ({ onDataScanned }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [showCamera, setShowCamera] = useState(false)
    const scaleValue = useState(new Animated.Value(1))[0]
    const language = useSelector((state) => state.app.language)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    useEffect(() => {
        ;(async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true)
            onDataScanned(data)

            Animated.timing(scaleValue, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    setShowCamera(false)
                    setScanned(false)
                }
            })
        }
    }

    if (hasPermission === null) {
        return <Text>{localization.qrCodeScanner.permissionRequestText}</Text>
    }
    if (hasPermission === false) {
        return <Text>{localization.qrCodeScanner.noAccessCameraText}</Text>
    }

    return (
        <View style={styles.container}>
            {showCamera && (
                <View style={styles.cameraContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={styles.camera}
                    />
                </View>
            )}
            <Button
                title={showCamera ? localization.qrCodeScanner.HideCamera : localization.qrCodeScanner.Scan}
                filled
                onPress={() => {
                    setShowCamera(!showCamera)
                }}
            ></Button>
        </View>
    )
}

export default QRScanner
