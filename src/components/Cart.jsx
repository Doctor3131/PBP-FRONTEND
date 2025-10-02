import React from 'react';
import './Cart.css';

const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout, totalHarga, onClose }) => {
  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>🛒 Keranjang Belanja</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Keranjang belanja kosong</p>
              <button className="continue-shopping" onClick={onClose}>
                Lanjutkan Belanja
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="total-section">
                  <h3>Total: Rp {totalHarga.toLocaleString()}</h3>
                </div>
                <button className="checkout-btn" onClick={onCheckout}>
                  💳 Checkout Sekarang
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;