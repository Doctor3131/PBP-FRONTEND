// src/components/Header.jsx
import React from 'react'

export default function Header({
  search,
  setSearch,
  onToggleSidebar,
  onCartClick,
  onWishlistClick,
  cartCount,
  wishlistCount,
  userRole,
  onNavigate,
  onLogout // Prop ini adalah handler dari BerandaPage
}) {
  // Hapus fungsi handleLogoutClick lokal yang berlebihan

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="app-title">KeyStore</h1>
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
          <button
            onClick={() => onNavigate('login')}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            Login
          </button>
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
            <button className="user-icon-btn" style={{ fontSize: '1.5em' }} title={userRole === 'admin' ? 'Admin' : 'User'}>
              {userRole === 'admin' ? '👑' : '👤'}
            </button>
            <button
              onClick={onLogout} // <--- PERBAIKAN: Memanggil prop onLogout secara langsung
              style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9em' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}
