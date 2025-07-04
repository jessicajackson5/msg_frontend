import React, { useEffect, useState } from 'react'
import './LoginScreen.css'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import { LOGIN_FIELD_NAMES } from '../../constants/form/login'

const LoginScreen = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // Executes when the form is submitted
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
            }
            else {
                setError(server_response_data.message)
            }
        }
        catch (error) {
            setError('An error ocurred communicating with the server. Try again later')
        }
        finally{
            setLoading(false)
        }
    }
    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit, 
        initial_form_state: { 
            [LOGIN_FIELD_NAMES.EMAIL]: '', 
            [LOGIN_FIELD_NAMES.PASSWORD]: '' 
        }
    })

    return (
        <div>
            <h1>Enter your email to sign in</h1>
            <form onSubmit={handleSubmit}>
                <div>

                    <label htmlFor='email'>Enter email:</label>
                    <input
                        id='email'
                        name={LOGIN_FIELD_NAMES.EMAIL}
                        placeholder='joedoe@mail.com'
                        type='email'
                        value={form_state.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Enter password:</label>
                    <input
                        id='password'
                        name={LOGIN_FIELD_NAMES.PASSWORD}
                        placeholder='current password'
                        type='password'
                        value={form_state.password}
                        onChange={handleChange}

                    />
                </div>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {
                    loading
                        ? <button type='button' disabled={loading}>Loading</button>
                        : <button type='submit' >Sign in</button>
                }

            </form>
        </div>
    )
}

export default LoginScreen
