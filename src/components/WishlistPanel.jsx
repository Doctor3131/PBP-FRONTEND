// src/components/WishlistPanel.jsx
import React from 'react'

export default function WishlistPanel({ isOpen, onClose, wishlist, onRemoveItem, onMoveToCart }) {

  return (
    <div className={`cart-panel ${isOpen ? 'open' : ''}`} style={{ width: '400px' }}>
      <div className="cart-header">
        <h2>Wishlist ❤️</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="cart-items-list">
        {wishlist.length === 0 ? (
          <p>Wishlist Anda kosong. Tambahkan produk favorit Anda!</p>
        ) : (
          wishlist.map(item => (
            <div key={item.id} className="cart-item" style={{ alignItems: 'flex-start' }}>
              {/* Perbaikan: Menggunakan tag <img> untuk gambar item Wishlist */}
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details" style={{ marginRight: '10px' }}>
                <h4>{item.name}</h4>
                <p>Rp {item.price.toLocaleString('id-ID')} / unit</p>
                <p style={{ fontSize: '0.8em', color: '#777' }}>Stok: {item.stock}</p>
              </div>

              <div className="cart-item-controls" style={{ gap: '5px', flexShrink: 0 }}>
                <button
                  onClick={() => onMoveToCart(item)}
                  className="checkout-button"
                  style={{ padding: '8px', fontSize: '0.8em', backgroundColor: '#27ae60' }}
                  disabled={item.stock <= 0}
                >
                  {item.stock > 0 ? 'Pindah ke Keranjang 🛒' : 'Stok Habis'}
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="remove-btn"
                  style={{ width: '100%', fontSize: '0.8em' }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <button onClick={onClose} className="link-button" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
          Tutup Wishlist
        </button>
      </div>
    </div>
  )
}
