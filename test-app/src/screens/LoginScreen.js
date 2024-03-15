import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { signIn } from '../redux/actions/authActions'
import '../styles/LoginScreen.css'

const LoginScreen = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    // Додавання стану для повідомлення про помилку
    const [errorMessage, setErrorMessage] = useState('')

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleModal = () => {
        setShowModal((prev) => !prev)
    }

    const signInUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/signIn', { ...form })
            dispatch(
                signIn({
                    userId: response.data.userId,
                    token: response.data.token,
                    companyName: response.data.companyName,
                    photoUrl: response.data.photoUrl,
                    email: response.data.email,
                }),
            )
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Error during login')
            } else {
                setErrorMessage('Network error or server is unreachable')
            }
            setShowModal(true)
            console.error('Error during login:', error)
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-header">Welcome Back!</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </div>

                <button type="button" className="btn btn-primary login-button" onClick={signInUser}>
                    Log In
                </button>
                <a href={'/register'} className="ml-2">
                    Sign up
                </a>
            </form>
            {showModal && <div className="mt-4 text-2xl text-red-800">{errorMessage}</div>}
        </div>
    )
}

export default LoginScreen
