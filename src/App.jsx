import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import OrderManagementPage from './pages/OrderManagementPage'
import ShopPage from './pages/ShopPage/index.jsx'
import ProductDetailPage from './pages/ProductDetailPage/index.jsx'
import CartPage from './pages/CartPage/index.jsx'
import WishlistPage from './pages/WishlistPage/index.jsx'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { fetchCategoriesAPI } from './services/categoryService'
import { getCartAPI, addToCartAPI } from './services/cartService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: 'Home' })

  const [cartItemCount, setCartItemCount] = useState(0)
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('ecom_token')
    if (token) {
      setIsAuthenticated(true)
      setUserEmail(localStorage.getItem('user_email'))
      setUserRole(localStorage.getItem('user_role'))
    }
  }, [])

  const fetchInitialData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const [categoriesRes, cartRes] = await Promise.all([
          fetchCategoriesAPI(),
          getCartAPI(),
        ])
        setCategories([{ id: 0, name: 'Home' }, ...categoriesRes.data])
        setCartItemCount(cartRes.data.items.length)
      } catch (error) {
        console.error("Gagal mengambil data awal:", error)
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  const handleAddToCart = async (product) => {
    try {
      await addToCartAPI({ product_id: product.id, qty: 1 })
      alert(`${product.name} berhasil ditambahkan ke keranjang!`)
      fetchInitialData()
    } catch (error) {
      alert(`Gagal menambahkan: ${error.message}`)
    }
  }

  const handleAddToWishlist = (product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems(prevItems => [...prevItems, product])
      alert(`${product.name} berhasil ditambahkan ke wishlist!`)
    } else {
      alert(`${product.name} sudah ada di wishlist.`)
    }
  }

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        {isAuthenticated && (
          <Sidebar
            open={sidebarOpen}
            categories={categories}
            userRole={userRole}
            onCategoryClick={(cat) => setSelectedCategory(cat)}
          />
        )}
        <div style={{ flex: 1, transition: 'margin-left 0.3s', marginLeft: isAuthenticated && sidebarOpen ? '250px' : '0' }}>
          <Navbar
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartItemCount={cartItemCount}
            wishlistItemCount={wishlistItems.length}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
          <main>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to="/shop" />} />
              <Route path="/login" element={!isAuthenticated ? <LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} setUserRole={setUserRole} /> : <Navigate to="/shop" />} />
              <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/shop" />} />

              <Route path="/shop" element={isAuthenticated ? <ShopPage searchQuery={searchQuery} selectedCategory={selectedCategory} /> : <Navigate to="/login" />} />
              <Route path="/product/:id" element={isAuthenticated ? <ProductDetailPage handleAddToWishlist={handleAddToWishlist} /> : <Navigate to="/login" />} />
              <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} />
              <Route path="/wishlist" element={isAuthenticated ? <WishlistPage wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} handleAddToCart={handleAddToCart} /> : <Navigate to="/login" />} />

              <Route path="/admin/orders" element={isAuthenticated && userRole === 'admin' ? <OrderManagementPage /> : <Navigate to="/shop" />} />

              <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Halaman Tidak Ditemukan</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
