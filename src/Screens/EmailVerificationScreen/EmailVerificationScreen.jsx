import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './EmailVerificationScreen.css'

const EmailVerificationScreen = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [verificationStatus, setVerificationStatus] = useState('loading') // 'loading', 'success', 'error'
    const [message, setMessage] = useState('')
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const verifyEmail = async () => {
            const verifyToken = searchParams.get('verify_token')
            
            if (!verifyToken) {
                setVerificationStatus('error')
                setMessage('Invalid verification link. Please check your email and try again.')
                return
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/api/users/verify?verify_token=${verifyToken}`)
                const data = await response.json()

                if (data.ok) {
                    setVerificationStatus('success')
                    setMessage('Your email has been successfully verified! You can now log in to your account.')
                } else {
                    setVerificationStatus('error')
                    setMessage(data.message || 'Verification failed. Please try again.')
                }
            } catch (error) {
                console.error('Verification error:', error)
                setVerificationStatus('error')
                setMessage('An error occurred during verification. Please try again.')
            }
        }

        verifyEmail()
    }, [searchParams])

    useEffect(() => {
        if (verificationStatus === 'success') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        navigate('/login')
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [verificationStatus, navigate])

    const handleGoToLogin = () => {
        navigate('/login')
    }

    const handleResendEmail = () => {
        // This could be implemented to resend verification email
        navigate('/login')
    }

    if (verificationStatus === 'loading') {
        return (
            <div className="verification-container">
                <div className="verification-card">
                    <div className="loading-spinner"></div>
                    <h2>Verifying your email...</h2>
                    <p>Please wait while we verify your email address.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="verification-container">
            <div className="verification-card">
                {verificationStatus === 'success' ? (
                    <>
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22,4 12,14.01 9,11.01"></polyline>
                            </svg>
                        </div>
                        <h2>Email Verified Successfully!</h2>
                        <p>{message}</p>
                        <div className="verification-actions">
                            <button 
                                className="btn-primary" 
                                onClick={handleGoToLogin}
                            >
                                Go to Login Now
                            </button>
                            <p className="redirect-text">
                                Redirecting to login in {countdown} seconds...
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="error-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <h2>Verification Failed</h2>
                        <p>{message}</p>
                        <div className="verification-actions">
                            <button 
                                className="btn-primary" 
                                onClick={handleGoToLogin}
                            >
                                Go to Login
                            </button>
                            <button 
                                className="btn-secondary" 
                                onClick={handleResendEmail}
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default EmailVerificationScreen 