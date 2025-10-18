import React, { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";

function App() {
  // Data produk dummy
  const products = [
    { 
      id: 1, 
      name: "Sepatu Sneakers", 
      price: 350000, 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" 
    },
    { 
      id: 2, 
      name: "Tas Kulit Wanita", 
      price: 500000, 
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" 
    },
    { 
      id: 3, 
      name: "Headset Bluetooth", 
      price: 150000, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" 
    },
    { 
      id: 4, 
      name: "Kemeja Pria", 
      price: 200000, 
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" 
    },
  ];

  // State
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Tambah ke keranjang (cek login dulu)
  const addToCart = (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`✅ ${product.name} ditambahkan ke keranjang!`);
  };

  // Hapus dari keranjang
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Hitung total harga
  const totalHarga = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Login function
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  // Checkout (harus login)
  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }
    
    alert(`✅ Checkout berhasil! Total: Rp ${totalHarga.toLocaleString()}`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="app">
      <Navbar 
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setShowCart(!showCart)}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
      />
      
      {showCart ? (
        <Cart 
          cart={cart} 
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          totalHarga={totalHarga}
          onClose={() => setShowCart(false)}
          user={user}
          onLoginRequired={() => setShowLoginModal(true)}
        />
      ) : (
        <div className="main-content">
          <div className="hero-section">
            <h1>Selamat Datang di MyShop</h1>
            <p>Temukan produk terbaik dengan harga terbaik</p>
            {!user && (
              <div className="login-prompt">
                <p>⚠️ Login untuk mulai berbelanja</p>
                <button 
                  className="login-btn-hero"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login Sekarang
                </button>
              </div>
            )}
          </div>
          
          <div className="products-section">
            <h2>Produk Terbaru</h2>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  user={user}
                  onLoginRequired={() => setShowLoginModal(true)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default App;