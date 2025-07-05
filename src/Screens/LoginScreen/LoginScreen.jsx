import React, { useEffect, useState } from 'react'
import './LoginScreen.css'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import { LOGIN_FIELD_NAMES } from '../../constants/form/login'

const LoginScreen = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            setLoading(true)
            const server_response_data = await login({
                email: form_state[LOGIN_FIELD_NAMES.EMAIL],
                password: form_state[LOGIN_FIELD_NAMES.PASSWORD]
            })
            if (server_response_data.ok) {
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    server_response_data.data.authorization_token
                )
                navigate('/home')
            } else {
                setError(server_response_data.message)
            }
        } catch (error) {
            setError('An error occurred communicating with the server. Try again later')
        } finally {
            setLoading(false)
        }
    }

    // Set initial form state
    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit,
        initial_form_state: {
            [LOGIN_FIELD_NAMES.EMAIL]: '',
            [LOGIN_FIELD_NAMES.PASSWORD]: ''
        }
    })

    // Executes when the form is submitted
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10,17 15,12 10,7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor='email'>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Email Address
                        </label>
                        <input
                            id='email'
                            name={LOGIN_FIELD_NAMES.EMAIL}
                            placeholder='john.doe@example.com'
                            type='email'
                            value={form_state.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor='password'>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <circle cx="12" cy="16" r="1"></circle>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            Password
                        </label>
                        <input
                            id='password'
                            name={LOGIN_FIELD_NAMES.PASSWORD}
                            placeholder='Enter your password'
                            type='password'
                            value={form_state[LOGIN_FIELD_NAMES.PASSWORD]}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type='submit'
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="btn-spinner"></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10,17 15,12 10,7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account? <Link to="/register" className="register-link">Sign up for an account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
