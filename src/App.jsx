import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from './data.js'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductDetail from './components/Productdetail.jsx'
import Cart from './components/Cart.jsx'
import Wishlist from './components/Wishlist.jsx'
import LoginModal from './components/LoginModal.jsx'

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
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const addToWishlist = product => {
    if (!wishlistItems.find(item => item.name === product.name)) {
      setWishlistItems([...wishlistItems, product])
    }
  }

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar
        open={sidebarOpen}
        toggle={toggleSidebar}
        categories={CATEGORIES}
        onCategoryClick={cat => { setSelectedCategory(cat); setSidebarOpen(false) }}
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
        />

        <div style={{ padding: '20px' }}>
          {selectedProduct === 'cart' ? (
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
          ) : selectedProduct === 'wishlist' ? (
            <Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />
          ) : selectedProduct ? (
            <ProductDetail product={selectedProduct} addToCart={addToCart} addToWishlist={addToWishlist} />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
            }}>
              {filteredProducts.map(prod => (
                <ProductCard
                  key={prod.name}
                  product={prod}
                  onClick={() => setSelectedProduct(prod)}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          )}
        </div>

        {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </div>
    </div>
  )
}

export default App
