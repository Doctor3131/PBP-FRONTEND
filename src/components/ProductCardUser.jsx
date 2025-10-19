// src/components/ProductCardUser.jsx

import React from 'react'
import { Link } from 'react-router-dom' // Import Link

// Komponen ini tidak perlu diubah secara fungsional, hanya cara navigasinya
export default function ProductCardUser({ product, onAddToCart, onAddToWishlist }) {
  const { id, name, description, price, image } = product

  return (
    // Bungkus seluruh card dengan Link
    <Link to={`/product/${id}`} className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="price">Rp{price.toLocaleString()}</p>
      </div>
      <div className="product-actions">
        {/* Hentikan propagasi event agar Link tidak terpicu saat tombol diklik */}
        <button onClick={(e) => { e.preventDefault(); onAddToCart(product) }}>
          Add to Cart
        </button>
        <button onClick={(e) => { e.preventDefault(); onAddToWishlist(product) }}>
          Add to Wishlist
        </button>
      </div>
    </Link>
  )
}
