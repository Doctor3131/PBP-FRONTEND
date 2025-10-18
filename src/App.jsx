import { useState } from 'react'

// Import semua halaman
import BerandaPage from './pages/BerandaPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderDetailPage from './pages/OrderDetailPage.jsx'

// Import gaya CSS
import './assets/index.css'

// ===== MAIN APP (Router-like logic without react-router-dom) =====
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageData, setPageData] = useState(null)
  const [userRole, setUserRole] = useState('visitor')
  const [cart, setCart] = useState([])

  // Fungsi navigasi yang meneruskan data ke halaman berikutnya
  const navigate = (page, data = null) => {
    setCurrentPage(page)
    setPageData(data)
  }

  const handleLogin = (role) => {
    setUserRole(role)
    navigate('home')
  }

  const handleLogout = () => {
    setUserRole('visitor')
    setCart([])
    navigate('home')
  }

  const renderPage = () => {
    if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} />
    }
    if (currentPage === 'home') {
      return (
        <BerandaPage
          onNavigate={navigate}
          userRole={userRole}
          cart={cart}
          setCart={setCart}
          onLogout={handleLogout}
        />
      )
    }
    if (currentPage === 'checkout') {
      return (
        <CheckoutPage
          cartItems={pageData?.cartItems}
          onNavigate={navigate}
        />
      )
    }
    if (currentPage === 'order') {
      return (
        <OrderDetailPage
          orderData={pageData}
          onNavigate={navigate}
        />
      )
    }
    // Fallback atau error page
    return <h1>404 | Page Not Found</h1>
  }

  // Karena Anda menyertakan gaya CSS dalam string, kita akan me-render tag <style>
  // Namun, karena proyek Anda sudah memiliki file index.css, kita akan menghapus 
  // tag <style> dan mengandalkan impor CSS di src/main.jsx.
  return (
    <>
      {renderPage()}
    </>
  )
}
