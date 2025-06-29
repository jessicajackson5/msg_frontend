import React, {useState} from 'react';
import './RegisterScreen.css';
import useForm from '../../hooks/useForm.jsx'
import { REGISTER_FIELD_NAMES } from '../../constants/form/register.js';
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'

const RegisterScreen = () => {
    const[error, setError] = useState(null)
    const[loading,setLoading] = useState(false)

    const navigate = useNavigate() 
    const onSubmit = async () => {
        try {
			setLoading(true)
			const server_response_data = await register({
				name: form_state[REGISTER_FIELD_NAMES.NAME],
				email: form_state[REGISTER_FIELD_NAMES.EMAIL],
				password: form_state[REGISTER_FIELD_NAMES.PASSWORD]
			})
			if (server_response_data.ok) {
				navigate('/login')
			}
			else {
				setError(server_response_data.message)
			}
		}
		catch (error) {
			console.log(error)
			setError('An error ocurred communicating with the server. Try again later')
		}
		finally {
			setLoading(false)
		}
	}
	const {form_state, handleSubmit, handleChange} = useForm({ 
		onSubmit, 
		initial_form_state: { 
			[REGISTER_FIELD_NAMES.NAME]: '', 
			[REGISTER_FIELD_NAMES.EMAIL]: '', 
			[REGISTER_FIELD_NAMES.PASSWORD]: '' 
		} 
	})

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>

				<div>
					<label htmlFor='name'>Enter your name:</label>
					<input
						id='name'
						name={REGISTER_FIELD_NAMES.NAME}
						type='text'
						value={form_state[REGISTER_FIELD_NAMES.NAME]}
						onChange={handleChange}

					/>
				</div>
				<div>

					<label htmlFor='email'>Enter your email:</label>
					<input
						id='email'
						name={REGISTER_FIELD_NAMES.EMAIL}
						placeholder='johndoe@mail.com'
						type='email'
						value={form_state[REGISTER_FIELD_NAMES.EMAIL]}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Enter your password:</label>
					<input
						id='password'
						name={REGISTER_FIELD_NAMES.PASSWORD}
						type='password'
						value={form_state[REGISTER_FIELD_NAMES.PASSWORD]}
						onChange={handleChange}

					/>
				</div>
				{error && <span style={{ color: 'red' }}>{error}</span>}
				{
					loading
						? <button type='button' disabled={loading}>Loading</button>
						: <button type='submit' >Register</button>
				}

			</form>
		</div>
	)
}

export default RegisterScreen