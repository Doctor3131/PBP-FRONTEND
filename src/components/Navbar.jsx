import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  cartItemCount,
  wishlistItemCount,
  isAuthenticated,
  handleLogout,
}) {
  const navigate = useNavigate()

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault()
      navigate('/login')
    }
  }

  const handleWishlistClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault()
      navigate('/login')
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 999 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated && <button onClick={toggleSidebar} style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer', border: 'none', background: 'none' }}>☰</button>}
        <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}><h1 style={{ margin: 0 }}>KeyStore</h1></Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ flex: 1, margin: '0 20px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link
          to={isAuthenticated ? "/wishlist" : "/login"}
          onClick={handleWishlistClick}
          style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
        >
          ❤️ {isAuthenticated ? wishlistItemCount : 0}
        </Link>
        <Link
          to={isAuthenticated ? "/cart" : "/login"}
          onClick={handleCartClick}
          style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
        >
          🛒 {isAuthenticated ? cartItemCount : 0}
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '8px 12px', border: 'none', borderRadius: '6px', background: '#dc3545', color: 'white' }}>Logout</button>
        ) : (
          <button onClick={() => navigate('/login')} style={{ cursor: 'pointer', padding: '8px 12px', border: 'none', borderRadius: '6px', background: '#007bff', color: 'white' }}>Login</button>
        )}
      </div>
    </div>
  )
}
