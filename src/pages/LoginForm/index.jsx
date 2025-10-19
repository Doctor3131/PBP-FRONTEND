import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../../services/authService'
import '../../assets/styles/AuthForm.css'

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
      const response = await loginAPI({ email, password })

      setMessage(response.message)
      setMessageType('success')

      localStorage.setItem('ecom_token', response.data.token)
      localStorage.setItem('user_email', response.data.user.email)
      localStorage.setItem('user_role', response.data.user.role)

      setIsAuthenticated(true)
      setUserEmail(response.data.user.email)
      setUserRole(response.data.user.role)

      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (error) {
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
