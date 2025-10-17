import React from 'react';
export default function ProductCardUser({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-desc">{product.category}</p>
      <p className="product-price">Rp {product.price.toLocaleString("id-ID")}</p>
      <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
        Tambah ke Keranjang
      </button>
    </div>
  );
}