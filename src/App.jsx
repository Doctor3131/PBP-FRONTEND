import React, { useState, useCallback } from 'react'

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { getAllProducts, CATEGORIES } from './data.js'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

import ProductCard from './components/ProductCard.jsx'

import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Wishlist from './components/Wishlist.jsx'
import LoginModal from './components/LoginModal.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

// Main content wrapper component
function MainContent() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loginOpen, setLoginOpen] = useState(false)

  const allProducts = getAllProducts()

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Filter products
  const filteredProducts = allProducts.filter(product => {

    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'Home' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Add to cart with stock validation
  const addToCart = useCallback((product) => {
    if (product.stock === 0) {
      alert('This product is out of stock')

      return
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        // Check if we can add more
        if (existing.quantity >= product.stock) {
          alert('Cannot add more than available stock')

          return prev
        }

        return prev.map(item =>
          item.id === product.id

            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  // Add to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        alert('Product already in wishlist')

        return prev

      }

      return [...prev, product]
    })
  }, [])

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  // Navigation handlers

  const handleCartClick = () => navigate('/cart')
  const handleWishlistClick = () => navigate('/wishlist')

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    navigate(`/product/${product.id}`)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSelectedProduct(null)
    setSidebarOpen(false)
    navigate('/')
  }

  // Home page component
  const HomePage = () => (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        {selectedCategory === 'Home' ? 'All Products' : selectedCategory}
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}

              addToCart={addToCart}
              addToWishlist={addToWishlist}

            />
          ))}
        </div>

      )}
    </div>
  )

  // Product detail route handler
  const ProductDetailRoute = () => {
    const pathSegments = window.location.pathname.split('/')
    const productId = pathSegments[pathSegments.length - 1]
    const product = allProducts.find(p => p.id === productId)

    return (
      <ProductDetail
        product={product}
        addToCart={addToCart}
        addToWishlist={addToWishlist}

      />
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        toggle={toggleSidebar}
        categories={CATEGORIES}
        onCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          toggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}

          onCartClick={handleCartClick}

          onWishlistClick={handleWishlistClick}

        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailRoute />} />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistItems={wishlistItems}
                  setWishlistItems={setWishlistItems}
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cartItems={cartItems}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </main>

        {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </div>
    </div>
  )
}

function App() {

  return (
    <Router>

      <MainContent />
    </Router>
  )
}

export default App
