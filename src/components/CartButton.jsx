import React from 'react';
import cartIcon from '../assets/cartIcon.png'; // Impor gambar ikon

export default function CartButton({ onClick }) {
  return (
    <button className="cart-icon-btn" onClick={onClick} aria-label="Buka keranjang">
      <img src={cartIcon} alt="Keranjang Belanja" />
    </button>
  );
}