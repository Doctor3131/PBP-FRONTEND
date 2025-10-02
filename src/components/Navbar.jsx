import React from 'react';
import './Navbar.css';

const Navbar = ({ user, cartCount, onCartClick, onLoginClick, onLogoutClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>🛒 MyShop</h1>
        <span>E-Commerce Store</span>
      </div>
      
      <div className="nav-actions">
        {user ? (
          <>
            <span className="welcome-text">Halo, {user.username}!</span>
            <button className="logout-btn" onClick={onLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn-nav" onClick={onLoginClick}>
            🔐 Login
          </button>
        )}
        
        <button className="cart-button" onClick={onCartClick}>
          🛍️ Keranjang
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;