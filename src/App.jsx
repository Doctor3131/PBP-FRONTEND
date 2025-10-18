import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from './data.js'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import LoginModal from './components/LoginModal.jsx'
import HomePage from './pages/HomePage.jsx'
import CartPage from './pages/CartPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import UserDashboard from './pages/UserDashboard.jsx'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loginOpen, setLoginOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const filteredProducts = Object.entries(PRODUCTS)
    .filter(([category]) => selectedCategory === 'Home' || category === selectedCategory.toLowerCase())
    .flatMap(([_, products]) => products)
    .filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const addToCart = product => {
    if (product.stock === 0) return

    const exist = cartItems.find(item => item.name === product.name)

    if (exist) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) } : item))
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }])
    }
  }

  const addToWishlist = product => {
    if (!wishlistItems.find(item => item.name === product.name)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  const renderPage = () => {
    if (selectedProduct === 'cart') {
      return <CartPage cartItems={cartItems} setCartItems={setCartItems} />
    }
    if (selectedProduct === 'wishlist') {
      return <WishlistPage wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />
    }
    if (selectedProduct === 'dashboard') {
      return <UserDashboard />
    }
    if (selectedProduct && selectedProduct !== 'cart' && selectedProduct !== 'wishlist' && selectedProduct !== 'dashboard') {
      return <ProductDetailPage product={selectedProduct} addToCart={addToCart} addToWishlist={addToWishlist} />
    }
    return (
      <HomePage
        filteredProducts={filteredProducts}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
      />
    )
  }

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar
        open={sidebarOpen}
        toggle={toggleSidebar}
        categories={CATEGORIES}
        onCategoryClick={cat => { setSelectedCategory(cat); setSidebarOpen(false); setSelectedProduct(null) }}
        onLoginClick={() => setLoginOpen(true)}
      />
      <div style={{ flex: 1 }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          onCartClick={() => setSelectedProduct('cart')}
          onWishlistClick={() => setSelectedProduct('wishlist')}
          onUserClick={() => setSelectedProduct('dashboard')}
        />

        <div style={{ padding: '20px' }}>
          {renderPage()}
        </div>

        {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </div>
    </div>
  )
}

export default App
