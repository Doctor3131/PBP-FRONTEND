import React from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate

export default function CartPanel({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate(); // Inisialisasi navigate
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Tutup panel keranjang
    onClose();
    // Arahkan ke halaman checkout dan bawa data keranjang
    navigate('/checkout', { state: { cartItems: cart } });
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Keranjang Belanja</h2>
          <button className="close-cart-btn" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? <p>Keranjang Anda kosong.</p> : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* ... isi cart item tetap sama ... */}
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="remove-item-btn" onClick={() => onRemoveItem(item.id)}>Hapus</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total: Rp {totalPrice.toLocaleString('id-ID')}</h3>
            {/* Ganti Link dengan button yang memanggil handleCheckout */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}