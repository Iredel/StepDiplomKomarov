import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { connect, useDispatch, useSelector } from 'react-redux'
import { signIn, signOut } from '../redux/actions/authActions'
import { loginStyles as styles } from '../styles/loginStyles'
import Checkbox from 'expo-checkbox'
import Button from '../components/Button'
import COLORS from '../constants/colors'
import axios from 'axios'
import api from '../scripts/api'

const Login = ({ navigation, signIn }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '303611097968-43tgc11ss27pc3kadjpgchj6gn7r1kk3.apps.googleusercontent.com',
        })
    }, [])

    const handleSingIn = async () => {
        try {
            const response = await axios.post(`${api.defaults.baseURL}/users/signIn`, {
                email: email,
                password: password,
            })
            dispatch(
                signIn({
                    userId: response.data.userId,
                    token: response.data.token,
                    photoUrl: response.data.photoUrl,
                    email: response.data.email,
                    name: response.data.name,
                    lastName: response.data.lastName,
                }),
            )
            console.log('Success.')
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data)
                alert(error.response.data.message || 'Server Error')
            } else if (error.request) {
                console.error('Request Error:', error.request)
                alert('Request Error: Server is not responding')
            } else {
                console.error('Error:', error.message)
                alert('Error: Something went wrong')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0782F9" />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi Welcome Back ! 👋</Text>
                    <Text style={styles.subHeaderText}>Hello again you have been missed!</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email address</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor={COLORS.black}
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyeIconContainer}
                        >
                            <Ionicons
                                name={isPasswordShown ? 'eye-off' : 'eye'}
                                size={24}
                                color={COLORS.black}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Login"
                    filled
                    style={styles.loginButton}
                    onPress={() => handleSingIn()}
                />

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account ? </Text>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.registerLink}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (user) => dispatch(signIn(user)),
        signOut: () => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(Login)
