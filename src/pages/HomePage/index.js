import React from 'react'

const HomePage = ({ isAuthenticated, userEmail, userRole }) => (
  <div>
    <h1>Selamat Datang di Toko Kami!</h1>
    {isAuthenticated ? (
      <p>Anda login sebagai: {userEmail} (Role: {userRole})</p>
    ) : (
      <p>Silakan login untuk berbelanja.</p>
    )}
  </div>
)

export default HomePage
