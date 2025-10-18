import { useState, useMemo } from 'react'
import { CATEGORIES, PRODUCTS } from './utils/data'
import { useNotification } from './hooks/useNotification'
import { useCart } from './hooks/useCart'
import { useWishlist } from './hooks/useWishlist'

import Notification from './components/Notification'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'

import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import UserDashboard from './pages/UserDashboard'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [currentView, setCurrentView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [userRole, setUserRole] = useState('visitor')

  const isLoggedIn = userRole !== 'visitor'

  const [notification, showNotification, setNotification] = useNotification()
  const { cartItems, setCartItems, addToCart } = useCart(showNotification, userRole)
  const { wishlistItems, setWishlistItems, addToWishlist } = useWishlist(showNotification, userRole)

  const filteredProducts = useMemo(() => {
    return Object.entries(PRODUCTS)
      .filter(([category]) => selectedCategory === 'Home' || category === selectedCategory.toLowerCase().replace(/ /g, '-'))
      .flatMap(([_, products]) => products)
      .filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [selectedCategory, searchQuery])

  const handleLogin = (role) => {
    setUserRole(role)
    setCurrentView(role === 'admin' ? 'admin' : 'home')
    showNotification(`Logged in as ${role}`, 'success')
  }

  const handleLogout = () => {
    setUserRole('visitor')
    setCartItems([])
    setWishlistItems([])
    setCurrentView('home')
    showNotification('Logged out successfully', 'success')
  }

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat)
    setSidebarOpen(false)
    setCurrentView('home')
    setSelectedProduct(null)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-detail')
  }

  const renderContent = () => {
    if (currentView === 'login') {
      return <LoginPage onLogin={handleLogin} />
    }
    if (userRole === 'visitor' && ['cart', 'wishlist', 'dashboard'].includes(currentView)) {
      showNotification('Access denied. Please log in.', 'error')
      return <LoginPage onLogin={handleLogin} />
    }
    if (userRole === 'admin' && currentView === 'admin') {
      return <AdminPage />
    }
    if (currentView === 'cart') {
      return <Cart cartItems={cartItems} setCartItems={setCartItems} />
    }
    if (currentView === 'wishlist') {
      return <Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />
    }
    if (currentView === 'dashboard' && userRole === 'user') {
      return <UserDashboard />
    }
    if (currentView === 'product-detail' && selectedProduct) {
      return <ProductDetail product={selectedProduct} addToCart={addToCart} addToWishlist={addToWishlist} />
    }

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
      }}>
        {filteredProducts.map(prod => (
          <ProductCard
            key={prod.name}
            product={prod}
            onClick={() => handleProductClick(prod)}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p>No products found for the current search/category.</p>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />

      <Sidebar
        open={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
        categories={CATEGORIES}
        onCategoryClick={handleCategoryClick}
        onLoginClick={() => { setCurrentView('login'); setSidebarOpen(false) }}
        onLogoutClick={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      <div style={{ flex: 1 }}>
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          onCartClick={() => setCurrentView('cart')}
          onWishlistClick={() => setCurrentView('wishlist')}
          onUserClick={() => setCurrentView('dashboard')}
          onAdminClick={() => setCurrentView('admin')}
          userRole={userRole}
        />
        <div style={{ padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
