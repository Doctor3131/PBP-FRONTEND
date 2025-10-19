import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProtectedCheckoutAPI } from '../../services/checkoutService' // <-- Gunakan Service

const ProtectedPage = ({ isAuthenticated }) => {
  const [checkoutMessage, setCheckoutMessage] = useState('Memuat data...')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Anda harus login untuk mengakses fitur ini.")
      navigate('/login')
      return
    }

    const fetchProtectedData = async () => {
      try {
        const response = await fetchProtectedCheckoutAPI()
        setCheckoutMessage(response.message)
      } catch (error) {
        setCheckoutMessage(`Akses ditolak: ${error.message}`)
      }
    }

    fetchProtectedData()
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return <div style={{ padding: '20px' }}>Mengarahkan ke halaman login...</div>
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e6ffe6', minHeight: '100vh' }}>
      <h2>🔒 Halaman Checkout</h2>
      <p>Fitur ini hanya dapat diakses setelah login.</p>
      <div style={{ padding: '20px', border: '1px solid green', background: 'white', marginTop: '20px' }}>
        <p>Status Server:</p>
        <strong>{checkoutMessage}</strong>
      </div>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Kembali ke Home
      </button>
    </div>
  )
}

export default ProtectedPage
