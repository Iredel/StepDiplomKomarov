import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { signIn, signOut } from '../redux/actions/authActions'
import { connect, useDispatch } from 'react-redux'
import { singUpStyles as styles } from '../styles/singUpStyles'
import Checkbox from 'expo-checkbox'
import Button from '../components/Button'
import COLORS from '../constants/colors'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import api from '../scripts/api'

const Signup = ({ navigation, signIn }) => {
    const dispatch = useDispatch()
    const [isPasswordShown, setIsPasswordShown] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        userName: '',
        userLastName: '',
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        if (!result.cancelled && result.assets.length > 0) {
            const uri = result.assets[0].uri
            const fileName = uri.split('/').pop()
            setFileName(fileName)
            setImage(uri)
            uploadAvatarToServer(uri, fileName)
        }
    }

    const uploadAvatarToServer = async (uri, fileName) => {
        try {
            const formData = new FormData()
            const file = {
                uri: uri,
                name: fileName,
                type: 'image/jpeg',
            }

            formData.append('avatar', file)

            const response = await axios.post(
                `${api.defaults.baseURL}/photo/uploadAvatar`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
        } catch (error) {
            console.error('Error uploading avatar:', error)
        }
    }

    const changeHandler = (name, text) => {
        setUserCredentials({
            ...userCredentials,
            [name]: text,
        })
    }

    const handleSingUp = async () => {
        setIsLoading(true)

        if (
            !userCredentials.email ||
            !userCredentials.password ||
            !userCredentials.userName ||
            !userCredentials.userLastName
        ) {
            alert('Please fill in all fields')
            setIsLoading(false)
            return
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(userCredentials.email)) {
            alert('Please enter a valid email address')
            setIsLoading(false)
            return
        }

        if (userCredentials.password.length < 7) {
            alert('Password must be at least 7 characters long')
            setIsLoading(false)
            return
        }

        try {
            await axios.post(`${api.defaults.baseURL}/users/signUp`, {
                name: userCredentials.userName,
                lastName: userCredentials.userLastName,
                photoUrl: `${api.defaults.baseURL}/photo/avatar/${fileName}`,
                email: userCredentials.email,
                password: userCredentials.password,
                userRole: 'user',
            })
            await uploadAvatarToServer()
            try {
                const response = await axios.post(`${api.defaults.baseURL}/users/signIn`, {
                    email: userCredentials.email,
                    password: userCredentials.password,
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
                console.log('User Logged.')
            } catch (error) {
                alert(error.message)
                console.error('SingUp Fail:', error.message)
            }
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
                <ActivityIndicator size="large" color="#007260" />
            </View>
        )
    }

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Create Account</Text>
                        <Text style={styles.subHeaderText}>Connect with your friend today!</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>First name</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={userCredentials.userName}
                                placeholder="Enter your first name"
                                placeholderTextColor={COLORS.black}
                                style={styles.input}
                                onChangeText={(text) => changeHandler('userName', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Last name</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={userCredentials.userLastName}
                                placeholder="Enter your last name"
                                placeholderTextColor={COLORS.black}
                                style={styles.input}
                                onChangeText={(text) => changeHandler('userLastName', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email address</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={userCredentials.email}
                                placeholder="Enter your email address"
                                placeholderTextColor={COLORS.black}
                                keyboardType="email-address"
                                style={styles.input}
                                onChangeText={(text) => changeHandler('email', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={userCredentials.password}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                style={styles.input}
                                onChangeText={(text) => changeHandler('password', text)}
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {image && (
                            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                        )}
                        <Button title="Pick an image for avatar" onPress={pickImage} />
                    </View>
                    <Button
                        title="Sign Up"
                        filled
                        style={styles.signupButton}
                        onPress={() => handleSingUp()}
                    />

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account</Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (user) => dispatch(signIn(user)),
        signOut: () => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(Signup)
