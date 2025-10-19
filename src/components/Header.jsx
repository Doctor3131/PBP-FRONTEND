// src/components/Header.jsx

import React from 'react'
import { Link, useNavigate } from 'react-router-dom' // 1. Import Link dan useNavigate

// 2. Hapus 'onNavigate' dari daftar props
export default function Header({
  search,
  setSearch,
  onToggleSidebar,
  onCartClick,
  onWishlistClick,
  cartCount,
  wishlistCount,
  userRole,
  onLogout
}) {
  const navigate = useNavigate() // Inisialisasi navigate

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
      navigate('/') // Arahkan ke home setelah logout
    }
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        {/* Tambahkan Link ke halaman utama pada judul */}
        <Link to="/" className="app-title" style={{ textDecoration: 'none' }}>
          KeyStore
        </Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="header-right">
        {userRole === 'visitor' ? (
          // 3. Ganti tombol Login dengan komponen Link
          <Link
            to="/login"
            className="login-button-header" // Tambahkan class untuk styling jika perlu
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', textDecoration: 'none' }}>
            Login
          </Link>
        ) : (
          <>
            <button className="cart-icon-btn" onClick={onWishlistClick} title="Wishlist">
              ❤️
              {wishlistCount > 0 && <span className="cart-count-badge" style={{ backgroundColor: '#e74c3c' }}>{wishlistCount}</span>}
            </button>
            <button className="cart-icon-btn" onClick={onCartClick} title="Cart">
              🛒
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>

            {/* 4. Buat ikon user dan admin menjadi Link */}
            {userRole === 'user' && (
              <Link to="/my-orders" className="user-icon-btn" style={{ fontSize: '1.5em' }} title="My Orders">👤</Link>
            )}
            {userRole === 'admin' && (
              <Link to="/admin" className="user-icon-btn" style={{ fontSize: '1.5em' }} title="Admin Dashboard">👑</Link>
            )}

            <button
              onClick={handleLogoutClick}
              style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9em' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}
