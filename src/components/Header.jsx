import { Link, useNavigate } from 'react-router-dom'

const Header = ({ showSearchBar, showCartButton, showSidebarButton }) => {
  const navigate = useNavigate()

  return (
    <header className="app-header" style={{ height: '70px', padding: '0 20px' }}>
      <div className="header-left">
        {showSidebarButton && (
          <button className="menu-toggle-btn" onClick={() => { }}>☰</button>
        )}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="app-title">KeyStore</h1>
        </Link>
      </div>

      {showSearchBar && (
        <div className="header-center">
          <div className="search-bar">
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
      )}

      <div className="header-right">
        {showCartButton && (
          <button className="cart-icon-btn" onClick={() => navigate('/cart')}>
            🛒
          </button>
        )}
        <div className="user-dropdown">
          <button className="user-icon-btn">👤</button>
        </div>
      </div>
    </header>
  )
}

export default Header
