// src/pages/MyOrdersPage.jsx
import React from 'react'

export default function MyOrdersPage({ orders, onNavigate }) {
  // Add a random status to each order for simulation
  const ordersWithStatus = orders.map(order => {
    if (!order.status) {
      const statuses = ['Processing', 'Shipped', 'Delivered']
      order.status = statuses[Math.floor(Math.random() * statuses.length)]
    }
    return order
  })

  return (
    <div className="order-detail-container">
      <h1>My Orders</h1>
      {ordersWithStatus.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        ordersWithStatus.map(order => (
          <div key={order.id} className="order-detail-section">
            <h2>Order ID: {order.id}</h2>
            <p><strong>Status:</strong> <span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span></p>
            <p><strong>Total:</strong> Rp {order.totalCost.toLocaleString('id-ID')}</p>
            <button className="link-button" onClick={() => onNavigate('order', order)}>
              View Details
            </button>
          </div>
        ))
      )}
      <div style={{ marginTop: '20px' }}>
        <button className="link-button" onClick={() => onNavigate('home')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
