import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from './data.js'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import UserRouter from './router/UserRouter.jsx'

import HomePage from './pages/HomePage.jsx'
import CartPage from './pages/CartPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [currentAppView, setCurrentAppView] = useState(null)
  const [userRole, setUserRole] = useState('visitor');

  const isLoggedIn = userRole !== 'visitor';
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const filteredProducts = Object.entries(PRODUCTS)
    .filter(([category]) => selectedCategory === 'Home' || category === selectedCategory.toLowerCase())
    .flatMap(([_, products]) => products)
    .filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentAppView(role === 'admin' ? 'admin' : null);
  }

  const handleLogout = () => {
    setUserRole('visitor');
    setCartItems([]);
    setWishlistItems([]);
    setCurrentAppView(null);
  }

  const addToCart = product => {
    if (userRole === 'visitor') {
      alert("Please log in to add items to your cart.");
      setCurrentAppView('login');
      return;
    }
    if (product.stock === 0) return
    // ... rest of cart logic
    const exist = cartItems.find(item => item.name === product.name)
    if (exist) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) } : item))
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }])
    }
  }

  const addToWishlist = product => {
    if (userRole === 'visitor') {
      alert("Please log in to add items to your wishlist.");
      setCurrentAppView('login');
      return;
    }
    if (!wishlistItems.find(item => item.name === product.name)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  const mainProps = {
    filteredProducts,
    setSelectedProduct: setCurrentAppView,
    addToCart,
    addToWishlist,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    userRole // Pass userRole down to pages if needed
  }


  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar
        open={sidebarOpen}
        toggle={toggleSidebar}
        categories={CATEGORIES}
        onCategoryClick={cat => { setSelectedCategory(cat); setSidebarOpen(false); setCurrentAppView(null) }}
        onLoginClick={() => { setCurrentAppView('login'); setSidebarOpen(false); }}
        onLogoutClick={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      <div style={{ flex: 1 }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          onCartClick={() => setCurrentAppView('cart')}
          onWishlistClick={() => setCurrentAppView('wishlist')}
          onUserClick={() => setCurrentAppView('dashboard')}
          onAdminClick={() => setCurrentAppView('admin')}
          userRole={userRole}
        />

        <div style={{ padding: '20px' }}>
          {/* Delegate all page rendering to the new UserRouter */}
          <UserRouter
            userRole={userRole}
            currentAppView={currentAppView}
            onLogin={handleLogin}
            mainProps={mainProps}
          />
        </div>
      </div>
    </div>
  )
}

export default App
