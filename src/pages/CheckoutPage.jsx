// src/pages/CheckoutPage.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

export default function CheckoutPage({ cartItems, onPlaceOrder }) {
  const navigate = useNavigate() // Inisialisasi useNavigate
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', phone: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  const handleCreateOrder = (e) => {
    e.preventDefault()
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert('Harap isi semua informasi pengiriman.')
      return
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: calculateTotal(),
      shippingInfo: shippingInfo,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    }

    onPlaceOrder(newOrder) // Panggil fungsi dari App.jsx
    alert('Pesanan berhasil dibuat!')
    navigate(`/order/${newOrder.id}`) // Arahkan ke halaman detail pesanan
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Keranjang Anda kosong.</h2>
        <button onClick={() => navigate('/')}>Kembali Belanja</button>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Ringkasan Pesanan</h3>
        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <span>{item.name}</span>
            <span>Rp{item.price.toLocaleString()}</span>
          </div>
        ))}
        <hr />
        <div className="summary-total">
          <strong>Total</strong>
          <strong>Rp{calculateTotal().toLocaleString()}</strong>
        </div>
      </div>

      <form className="shipping-form" onSubmit={handleCreateOrder}>
        <h3>Informasi Pengiriman</h3>
        <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleInputChange} required />
        <textarea name="address" placeholder="Alamat Lengkap" onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Nomor Telepon" onChange={handleInputChange} required />
        <button type="submit">Buat Pesanan</button>
      </form>
    </div>
  )
}
