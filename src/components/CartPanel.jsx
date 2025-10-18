// src/components/CartPanel.jsx
import React from 'react'

export default function CartPanel({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Keranjang Belanja</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="cart-items-list">
        {cart.length === 0 ? (
          <p>Keranjang Anda kosong.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              {/* Perbaikan: Menggunakan tag <img> */}
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>{item.price.toLocaleString('id-ID')} / unit</p>
                <p style={{ fontSize: '12px', color: '#666' }}>Stok: {item.stock}</p>
              </div>

              <div className="cart-item-controls">
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                  className="quantity-input"
                />
                <button onClick={() => onRemoveItem(item.id)} className="remove-btn">Hapus</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <h3>Total: {total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</h3>

        {cart.length > 0 && (
          <button
            onClick={onCheckout}
            className="checkout-button"
          >
            Lanjutkan ke Checkout →
          </button>
        )}
      </div>
    </div>
  )
}
