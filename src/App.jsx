// src/App.jsx

import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Import Halaman (Pages)
import BerandaPage from './pages/BerandaPage'
import LoginPage from './pages/LoginPage'
import CheckoutPage from './pages/CheckoutPage'
import MyOrdersPage from './pages/MyOrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import AdminPage from './pages/AdminPage'
import ProductDetailPage from './pages/ProductDetailPage'

// Import CSS
import './assets/index.css'
import './assets/admin.css'

/**
 * Komponen ProtectedRoute
 * Best practice untuk melindungi rute yang memerlukan otentikasi.
 * @param {object} props - Props.
 * @param {boolean} props.isAllowed - Kondisi apakah user diizinkan mengakses.
 * @param {string} props.redirectTo - Rute tujuan jika tidak diizinkan.
 * @param {React.ReactNode} props.children - Komponen anak yang akan dirender jika diizinkan.
 */
const ProtectedRoute = ({ isAllowed, redirectTo = '/login', children }) => {
  if (!isAllowed) {
    // Jika tidak diizinkan, arahkan ke halaman login
    alert('Anda harus login untuk mengakses halaman ini.')
    return <Navigate to={redirectTo} replace />
  }
  return children
}

// ===== KOMPONEN UTAMA APP =====
export default function App() {
  // State utama yang dikelola secara terpusat
  const [userRole, setUserRole] = useState('visitor') // 'visitor', 'user', 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // State untuk data e-commerce
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [orders, setOrders] = useState([])

  // Cek status login dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole')
    if (storedRole && storedRole !== 'visitor') {
      setUserRole(storedRole)
      setIsAuthenticated(true)
    }
  }, [])

  // Fungsi untuk menangani proses login
  const handleLogin = (role) => {
    setUserRole(role)
    setIsAuthenticated(true)
    localStorage.setItem('userRole', role) // Simpan peran di localStorage
  }

  // Fungsi untuk menangani proses logout
  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      setUserRole('visitor')
      setIsAuthenticated(false)
      // Hapus state yang berhubungan dengan user
      setCart([])
      setWishlist([])
      localStorage.removeItem('userRole')
    }
  }

  // Fungsi untuk membuat pesanan baru
  const handlePlaceOrder = (orderData) => {
    setOrders(prevOrders => [...prevOrders, orderData])
    setCart([]) // Kosongkan keranjang setelah pesanan berhasil
  }

  return (
    <Routes>
      {/* Rute Publik */}
      <Route
        path="/"
        element={
          <BerandaPage
            userRole={userRole}
            onLogout={handleLogout}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/product/:productId"
        element={
          <ProductDetailPage
            userRole={userRole}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}
      />

      {/* Rute yang Dilindungi (Hanya untuk User & Admin) */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <CheckoutPage cartItems={cart} onPlaceOrder={handlePlaceOrder} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <MyOrdersPage orders={orders} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:orderId"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <OrderDetailPage orders={orders} />
          </ProtectedRoute>
        }
      />

      {/* Rute Khusus Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={userRole === 'admin'} redirectTo="/">
            <AdminPage onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Rute Fallback (404 Not Found) */}
      <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>404: Halaman Tidak Ditemukan</h1>} />
    </Routes>
  )
}
