import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import ProtectedPage from './pages/ProtectedPage'
import OrderManagementPage from './pages/OrderManagementPage'

import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('ecom_token')
    const email = localStorage.getItem('user_email')
    const role = localStorage.getItem('user_role')

    if (token && email && role) {
      setIsAuthenticated(true)
      setUserEmail(email)
      setUserRole(role)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userEmail={userEmail} userRole={userRole} />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} setUserRole={setUserRole} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterForm />}
          />
          <Route
            path="/protected"
            element={<ProtectedPage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/admin/orders"
            element={userRole === 'admin' ? <OrderManagementPage isAuthenticated={isAuthenticated} /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Halaman Tidak Ditemukan</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
