import React, { useState } from 'react'
import './RegisterScreen.css'
import useForm from '../../hooks/useForm'
import { REGISTER_FIELD_NAMES } from '../../constants/form/register'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../services/authService'

function generateSecurePassword(length = 16) {
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
	const password = Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map((val) => charset[val % charset.length])
		.join('');
	return password;
}

const RegisterScreen = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

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
			setError('An error occurred communicating with the server. Try again later')
		}
		finally {
			setLoading(false)
		}
	}
	
	const { form_state, handleSubmit, handleChange } = useForm({
		onSubmit,
		initial_form_state: {
			[REGISTER_FIELD_NAMES.NAME]: '',
			[REGISTER_FIELD_NAMES.EMAIL]: '',
			[REGISTER_FIELD_NAMES.PASSWORD]: ''
		}
	})

	return (
		<div className="register-container">
			<div className="register-card">
				<div className="register-header">
					<div className="register-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="8.5" cy="7" r="4"></circle>
							<line x1="20" y1="8" x2="20" y2="14"></line>
							<line x1="23" y1="11" x2="17" y2="11"></line>
						</svg>
					</div>
					<h1>Create an Account</h1>
					<p>Join our community and start collaborating</p>
				</div>

				<form onSubmit={handleSubmit} className="register-form">
					<div className="form-group">
						<label htmlFor='name'>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
							Full Name
						</label>
						<input
							id='name'
							name={REGISTER_FIELD_NAMES.NAME}
							type='text'
							placeholder='Enter your full name'
							value={form_state[REGISTER_FIELD_NAMES.NAME]}
							onChange={handleChange}
							required
						/>
					</div>

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
							name={REGISTER_FIELD_NAMES.EMAIL}
							placeholder='john.doe@example.com'
							type='email'
							value={form_state[REGISTER_FIELD_NAMES.EMAIL]}
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
							name={REGISTER_FIELD_NAMES.PASSWORD}
							type='password'
							placeholder='Create a strong password'
							value={form_state[REGISTER_FIELD_NAMES.PASSWORD]}
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
						className="register-btn"
						disabled={loading}
					>
						{loading ? (
							<>
								<div className="btn-spinner"></div>
								Creating Account...
							</>
						) : (
							<>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
									<circle cx="8.5" cy="7" r="4"></circle>
									<line x1="20" y1="8" x2="20" y2="14"></line>
									<line x1="23" y1="11" x2="17" y2="11"></line>
								</svg>
								Create Account
							</>
						)}
					</button>
				</form>

				<div className="register-footer">
					<p>
						Already have an account? <Link to="/login" className="login-link">Sign in here</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterScreen