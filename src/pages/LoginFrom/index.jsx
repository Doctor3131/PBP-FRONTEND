import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../../services/authService' // <-- Gunakan Service
import '../../assets/styles/AuthForm.css' // <-- Path CSS baru

const LoginForm = ({ setIsAuthenticated, setUserEmail, setUserRole }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      // Panggil fungsi dari service, bukan axios langsung
      const response = await loginAPI({ email, password })

      setMessage(response.message)
      setMessageType('success')

      // Simpan token dan data user ke localStorage
      localStorage.setItem('ecom_token', response.token)
      localStorage.setItem('user_email', response.user.email)
      localStorage.setItem('user_role', response.user.role)

      // Update state di App.js
      setIsAuthenticated(true)
      setUserEmail(response.user.email)
      setUserRole(response.user.role)

      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {
      // Error sudah diformat oleh interceptor di api.js
      setMessage(error.message)
      setMessageType('error')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login KeyStore</h2>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          {/* ... form JSX tidak berubah ... */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Masuk</button>
        </form>
        <p className="register-link">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
