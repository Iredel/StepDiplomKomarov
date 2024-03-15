// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBmUQ76116YjlhBUJJiZnOLFNwm4XB2veY',
    authDomain: 'autoboxpay.firebaseapp.com',
    projectId: 'autoboxpay',
    storageBucket: 'autoboxpay.appspot.com',
    messagingSenderId: '303611097968',
    appId: '1:303611097968:web:37060d8839f7e5c87f55b5',
    measurementId: 'G-X1YH3YF3PK',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
