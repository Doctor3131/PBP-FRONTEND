// src/pages/MyOrdersPage.jsx

import React from 'react'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate

// 2. Hapus onNavigate dari props
export default function MyOrdersPage({ orders }) {
  const navigate = useNavigate() // 3. Inisialisasi hook

  if (!orders || orders.length === 0) {
    return (
      <div className="order-detail-container">
        <h1>My Orders</h1>
        <p>Anda belum memiliki pesanan.</p>
        <div style={{ marginTop: '20px' }}>
          {/* 4. Ganti onNavigate dengan navigate */}
          <button className="link-button" onClick={() => navigate('/')}>
            ← Mulai Belanja
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-detail-container">
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="order-detail-section">
          <h2>Order ID: {order.id}</h2>
          <p><strong>Status:</strong> <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span></p>
          <p><strong>Total:</strong> Rp {order.total.toLocaleString('id-ID')}</p>
          {/* 5. Ganti onNavigate dengan navigate ke URL dinamis */}
          <button className="link-button" onClick={() => navigate(`/order/${order.id}`)}>
            View Details
          </button>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button className="link-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
