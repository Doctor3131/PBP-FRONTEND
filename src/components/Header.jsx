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
  onLogout
}) {

  // FIX: Handle the confirmation dialog directly within the component
  // that contains the button. This makes the component more self-contained.
  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout() // This calls the function from App.jsx
    }
  }

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
              onClick={handleLogoutClick} // FIX: Use the new local handler
              style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9em' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}
