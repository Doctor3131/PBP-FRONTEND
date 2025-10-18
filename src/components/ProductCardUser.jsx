// src/components/ProductCardUser.jsx
import React from 'react'

export default function ProductCardUser({ product, onAddToCart, onAddToWishlist }) {
  // Ambil 'image' dari prop product
  const { name, price, stock, image } = product

  const formattedPrice = price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return (
    <div className="product-card">
      {/* Perbaikan: Menggunakan tag <img> */}
      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{formattedPrice}</p>
        <p className="product-stock">Stok: {stock}</p>

        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToWishlist(product)}
            style={{ background: '#e74c3c', flexGrow: 1, padding: '10px 5px' }}
            title="Add to Wishlist"
          >
            ❤️
          </button>

          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            disabled={stock <= 0}
            style={{ background: 'var(--accent-color)', flexGrow: 4 }}
          >
            {stock > 0 ? 'Keranjang 🛒' : 'Habis'}
          </button>
        </div>
      </div>
    </div>
  )
}
