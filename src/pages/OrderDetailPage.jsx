// src/pages/OrderDetailPage.jsx

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom' // 1. Import hook

// 2. Hapus onNavigate, ganti dengan 'orders' dari App.jsx
export default function OrderDetailPage({ orders }) {
  const { orderId } = useParams() // 3. Ambil ID dari URL
  const navigate = useNavigate()

  // 4. Cari data pesanan berdasarkan ID dari URL
  const orderData = orders.find(o => o.id === orderId)

  if (!orderData) {
    return (
      <div className="order-detail-container">
        <h1>Order Not Found</h1>
        <p>Maaf, kami tidak dapat menemukan pesanan dengan ID tersebut.</p>
        <button className="link-button" onClick={() => navigate('/my-orders')}>
          ← Kembali ke Daftar Pesanan
        </button>
      </div>
    )
  }

  const totalProductPrice = orderData.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)

  return (
    <div className="order-detail-container">
      <h1>Detail Pesanan</h1>
      <div className="order-detail-section">
        <h2>Informasi Pesanan</h2>
        <p><strong>No. Pesanan:</strong> {orderData.id}</p>
        <p><strong>Status:</strong> <span className="status-badge">{orderData.status}</span></p>
        <p><strong>Tanggal Pesanan:</strong> {orderData.date}</p>
      </div>

      <div className="order-detail-section">
        <h2>Informasi Penerima</h2>
        <p><strong>Nama:</strong> {orderData.shippingInfo.name}</p>
        <p><strong>Alamat:</strong> {orderData.shippingInfo.address}</p>
        <p><strong>Telepon:</strong> {orderData.shippingInfo.phone}</p>
      </div>

      <div className="order-detail-section">
        <h2>Produk yang Dipesan</h2>
        {orderData.items.map(item => (
          <div key={item.id} className="checkout-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4>{item.name}</h4>
              <p>Rp {item.price.toLocaleString('id-ID')} x {item.quantity || 1}</p>
            </div>
            <p><strong>Rp {(item.price * (item.quantity || 1)).toLocaleString('id-ID')}</strong></p>
          </div>
        ))}
      </div>

      <div className="order-detail-section">
        <h2>Rincian Pembayaran</h2>
        <div className="cost-detail">
          <h3>Total Pembayaran: <span>Rp {orderData.total.toLocaleString('id-ID')}</span></h3>
        </div>
      </div>

      <div className="order-detail-section">
        {/* 5. Ganti onNavigate dengan navigate */}
        <button className="link-button" onClick={() => navigate('/')}>← Kembali ke Beranda</button>
      </div>
    </div>
  )
}
