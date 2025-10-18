import { useState } from 'react'

// Import all pages
import BerandaPage from './pages/BerandaPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderDetailPage from './pages/OrderDetailPage.jsx'
import MyOrdersPage from './pages/MyOrdersPage.jsx' // Import the new page

// Import CSS styles
import './assets/index.css'

// ===== MAIN APP (Router-like logic without react-router-dom) =====
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageData, setPageData] = useState(null)
  const [userRole, setUserRole] = useState('visitor')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([]) // Add state for orders

  // Navigation function that passes data to the next page
  const navigate = (page, data = null) => {
    if (page === 'order' && data && !orders.find(o => o.id === data.id)) {
      setOrders(prevOrders => [...prevOrders, data])
    }
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
    setOrders([]) // Clear orders on logout
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
    // Add the new case for My Orders page
    if (currentPage === 'my-orders') {
      return (
        <MyOrdersPage
          orders={orders}
          onNavigate={navigate}
        />
      )
    }
    // Fallback or error page
    return <h1>404 | Page Not Found</h1>
  }

  return (
    <>
      {renderPage()}
    </>
  )
} import { useState } from 'react'

// Import all pages
import BerandaPage from './pages/BerandaPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderDetailPage from './pages/OrderDetailPage.jsx'
import MyOrdersPage from './pages/MyOrdersPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx' // Import Product Detail Page
import AdminPage from './pages/AdminPage.jsx' // Import Admin Page

// Import CSS styles
import './assets/index.css'

// ===== MAIN APP (Router-like logic without react-router-dom) =====
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageData, setPageData] = useState(null)
  const [userRole, setUserRole] = useState('visitor')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([]) // Add state for orders

  // Navigation function that passes data to the next page
  const navigate = (page, data = null) => {
    if (page === 'order' && data && !orders.find(o => o.id === data.id)) {
      setOrders(prevOrders => [...prevOrders, data])
    }
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
    setOrders([]) // Clear orders on logout
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
    if (currentPage === 'productDetail') {
      return (
        <ProductDetailPage
          product={pageData}
          onNavigate={navigate}
          // Dummy functions for now, you can implement them later
          addToCart={(item) => {
            setCart(prevCart => [...prevCart, item]);
            alert(`${item.name} added to cart!`);
          }}
          addToWishlist={(item) => alert(`${item.name} added to wishlist!`)}
        />
      );
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
    // Add the new case for My Orders page
    if (currentPage === 'my-orders') {
      return (
        <MyOrdersPage
          orders={orders}
          onNavigate={navigate}
        />
      )
    }
    if (currentPage === 'admin') {
      return <AdminPage onNavigate={navigate} />
    }
    // Fallback or error page
    return <h1>404 | Page Not Found</h1>
  }

  return (
    <>
      {renderPage()}
    </>
  )
}
