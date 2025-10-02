import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, user, onLoginRequired }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [rating, setRating] = useState(0);
  const [imgError, setImgError] = useState(false);

  const handleWishlist = () => {
    if (!user) {
      onLoginRequired();
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleRating = (star) => {
    if (!user) {
      onLoginRequired();
      return;
    }
    setRating(star);
  };

  const handleAddToCart = () => {
    if (!user) {
      onLoginRequired();
      return;
    }
    onAddToCart(product);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={imgError ? "/placeholder-image.jpg" : product.image} 
          alt={product.name}
          onError={handleImageError}
        />
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          title={user ? "Tambahkan ke wishlist" : "Login untuk wishlist"}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rp {product.price.toLocaleString()}</p>
        
        <div className="product-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? 'filled' : ''}`}
              onClick={() => handleRating(star)}
              title={user ? `Beri rating ${star} bintang` : "Login untuk memberi rating"}
            >
              ★
            </span>
          ))}
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          title={user ? "Tambahkan ke keranjang" : "Login untuk menambahkan ke keranjang"}
        >
          + Tambah ke Keranjang
        </button>
        
        {!user && (
          <div className="login-hint">
            <small>Login untuk berbelanja</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;