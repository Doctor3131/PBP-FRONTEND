import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../../services/authService' // <-- Gunakan Service
import '../../assets/styles/AuthForm.css' // <-- Path CSS baru

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      // Panggil fungsi dari service
      const response = await registerAPI({ email, password })

      setMessage(response.message)
      setMessageType('success')

      setTimeout(() => navigate('/login'), 2000)

    } catch (error) {
      setMessage(error.message)
      setMessageType('error')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registrasi Akun</h2>
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          {/* ... form JSX tidak berubah ... */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (min. 6 karakter)</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Daftar</button>
        </form>
        <p className="register-link">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
