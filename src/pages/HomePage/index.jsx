import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = ({ isAuthenticated, setIsAuthenticated, userEmail, userRole }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('ecom_token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_role')
    setIsAuthenticated(false)
    alert('Anda berhasil logout.')
    navigate('/')
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🛍️ KeyStore Home</h1>
      <p>Selamat datang! Lihat koleksi keyboard mekanik terbaik kami.</p>

      <div style={{ margin: '30px 0' }}>
        {isAuthenticated ? (
          <>
            <h3 style={{ color: 'green' }}>Halo, {userEmail}!</h3>
            <p>Anda sudah login dan siap berbelanja!</p>
            {userRole === 'admin' && (
              <Link to="/admin/orders" style={styles.linkButton}>
                📋 Manajemen Pesanan
              </Link>
            )}
            <Link to="/protected" style={styles.linkButton}>
              🔒 Akses Checkout
            </Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <p style={{ color: 'red' }}>Anda perlu Login untuk melakukan Checkout.</p>
            <Link to="/login" style={styles.linkButton}>
              Login Sekarang
            </Link>
            <Link to="/register" style={styles.linkButton}>
              Daftar Akun
            </Link>
          </>
        )}
      </div>

      <p>Ini adalah halaman utama yang dapat diakses oleh siapa pun.</p>
    </div>
  )
}

const styles = {
  linkButton: {
    margin: '0 10px',
    padding: '10px 15px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#007bff'
  },
  logoutButton: {
    padding: '10px 15px',
    marginLeft: '10px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  }
}

export default HomePage
