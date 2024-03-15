import React, { useState } from 'react'
import axios from 'axios'
import '../styles/SignUpScreen.css'
import { useNavigate } from 'react-router-dom'

const SignUpScreen = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({
        companyName: '',
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('')

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleModal = () => {
        setShowModal((prev) => !prev)
    }

    const signUpHandler = async () => {
        try {
            await axios
                .post('http://localhost:3000/users/signUp', {
                    ...form,
                    userRole: 'admin',
                })
                .then((response) => {
                    if (response.status === 201) {
                        navigate('/login')
                    }
                })
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Error during signup')
            } else {
                setErrorMessage('Network error or server is unreachable')
            }
            setShowModal(true)
            console.error('Error during signup:', error)
        }
    }

    return (
        <div className="signup-container">
            <h2 className="signup-header">Create an Account</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={changeHandler}
                    />
                </div>
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
                <button
                    type="button"
                    className="btn btn-primary signup-button"
                    onClick={signUpHandler}
                >
                    Sign Up
                </button>
                <a href={'/login'} className="ml-2">
                    Sign in
                </a>
            </form>
            {showModal && <div className="mt-4 text-2xl text-red-800">{errorMessage}</div>}
        </div>
    )
}

export default SignUpScreen
