import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import OrderManagementPage from './pages/OrderManagementPage'
import ShopPage from './pages/ShopPage'
// Anda perlu membuat halaman-halaman ini
// import ProductDetailPage from './pages/ProductDetailPage'
// import CartPage from './pages/CartPage'
// import WishlistPage from './pages/WishlistPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: 'Home' })

  // Cek status login saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem('ecom_token')
    const email = localStorage.getItem('user_email')
    const role = localStorage.getItem('user_role')
    if (token && email && role) {
      setIsAuthenticated(true)
      setUserEmail(email)
      setUserRole(role)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUserEmail('')
    setUserRole('')
    alert('Anda berhasil logout.')
    // Redirect ke home, yang akan di-handle oleh <Navigate> di dalam Routes
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <Router>
      <div className="App" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        {isAuthenticated && (
          <Sidebar
            open={sidebarOpen}
            onCategoryClick={(cat) => {
              setSelectedCategory(cat)
              setSidebarOpen(false)
            }}
            userRole={userRole}
          />
        )}
        <div style={{ flex: 1, marginLeft: isAuthenticated && sidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s' }}>
          <Navbar
            toggleSidebar={toggleSidebar}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartItemCount={0} // Ganti dengan data dinamis dari cart API
            wishlistItemCount={0} // Ganti dengan state wishlist
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
          <main>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to="/shop" />} />
              <Route path="/login" element={!isAuthenticated ? <LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} setUserRole={setUserRole} /> : <Navigate to="/shop" />} />
              <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/shop" />} />

              {/* Rute yang dilindungi */}
              <Route path="/shop" element={isAuthenticated ? <ShopPage searchQuery={searchQuery} selectedCategory={selectedCategory} setSidebarOpen={setSidebarOpen} /> : <Navigate to="/login" />} />
              {/* <Route path="/product/:id" element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />} /> */}
              {/* <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} /> */}
              {/* <Route path="/wishlist" element={isAuthenticated ? <WishlistPage /> : <Navigate to="/login" />} /> */}

              <Route path="/admin/orders" element={isAuthenticated && userRole === 'admin' ? <OrderManagementPage /> : <Navigate to="/" />} />

              <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Halaman Tidak Ditemukan</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
