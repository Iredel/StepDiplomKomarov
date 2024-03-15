import React, { useState } from 'react'
import { View, Text } from 'react-native'
import QRScanner from '../components/QRScanner'
import Product from '../components/Product'
import Button from '../components/Button'
import { homeStyles } from '../styles/homeStyles'
import { useSelector } from 'react-redux'
import { English } from '../localization/English'
import { Ukrainian } from '../localization/Ukrainian'

const Home = () => {
    const [scannedData, setScannedData] = useState(null)
    const theme = useSelector((state) => state.app.theme)
    const language = useSelector((state) => state.app.language)
    const styles = homeStyles(theme)
    const localization = language === 'Ukrainian' ? Ukrainian : English

    return (
        <View style={styles.container}>
            {scannedData ? (
                <>
                    <Product data={scannedData} />
                    <Button
                        title={localization.homePage.scanAgainButton}
                        onPress={() => {
                            setScannedData(null)
                        }}
                        filled
                    ></Button>
                </>
            ) : (
                <View>
                    <QRScanner onDataScanned={setScannedData} />
                </View>
            )}
        </View>
    )
}

export default Home
