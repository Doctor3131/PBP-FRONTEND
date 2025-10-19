// src/pages/ProductDetailPage.jsx

import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts' // Asumsi hook ini mengambil semua produk
import ProductDetail from '../components/ProductDetail'
import Navbar from '../components/Navbar'
import Notification from '../components/Notification'
import { useNotification } from '../hooks/useNotification'

export default function ProductDetailPage({ userRole, cart, setCart, wishlist, setWishlist, isAuthenticated }) {
  const { productId } = useParams() // Mengambil ID produk dari URL
  const navigate = useNavigate()
  const { products } = useProducts() // Mengambil daftar produk
  const { notification, showNotification } = useNotification()

  // Cari produk yang sesuai dengan ID dari URL
  const product = products.find(p => p.id === parseInt(productId))

  const handleAddToCart = (productToAdd) => {
    if (!isAuthenticated) {
      alert('Silakan login untuk menambahkan barang ke keranjang.')
      navigate('/login')
      return
    }
    setCart(prevCart => [...prevCart, productToAdd])
    showNotification(`${productToAdd.name} telah ditambahkan ke keranjang!`)
  }

  const handleAddToWishlist = (productToAdd) => {
    if (!isAuthenticated) {
      alert('Silakan login untuk menambahkan barang ke wishlist.')
      navigate('/login')
      return
    }
    setWishlist(prevWishlist => [...prevWishlist, productToAdd])
    showNotification(`${productToAdd.name} telah ditambahkan ke wishlist!`)
  }

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Produk tidak ditemukan!</h1>
        <Link to="/">Kembali ke Beranda</Link>
      </div>
    )
  }

  return (
    <div>
      <Navbar userRole={userRole} cartCount={cart.length} wishlistCount={wishlist.length} />
      <Notification message={notification.message} type={notification.type} isVisible={notification.isVisible} />

      <main className="container">
        {/* Gunakan komponen ProductDetail yang sudah ada */}
        <ProductDetail
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          userRole={userRole}
        />
      </main>
    </div>
  )
}
