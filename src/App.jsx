import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "./data.js";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx"; // Note: Fixed filename casing here
import Cart from "./components/Cart.jsx";
import Wishlist from "./components/Wishlist.jsx";
import LoginModal from "./components/LoginModal.jsx";

// --- Main application logic and state moved into a component ---
function MainContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Home");
  // selectedProduct is only for displaying a single product detail *on the home view*
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Filter products by category + search
  const filteredProducts = Object.entries(PRODUCTS)
    .filter(([category]) => selectedCategory === "Home" || category === selectedCategory.toLowerCase())
    .flatMap(([_, products]) => products)
    .filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToCart = product => {
    if (product.stock === 0) return;
    const exist = cartItems.find(item => item.name === product.name);
    if (exist) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const addToWishlist = product => {
    if (!wishlistItems.find(item => item.name === product.name)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // Handlers to navigate using react-router-dom
  const handleCartClick = () => navigate("/cart");
  const handleWishlistClick = () => navigate("/wishlist");
  const handleProductClick = (product) => {
    // For a full routing solution, you'd navigate to `/products/${product.id}`
    // For now, we'll keep the internal state logic for product detail on the main view
    setSelectedProduct(product);
  };
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSidebarOpen(false);
    // When category changes, reset the selected product view
    setSelectedProduct(null);
    navigate("/"); // Navigate back to home/products view
  }


  // --- Product Grid Component for the main view ---
  const ProductGrid = () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px"
    }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(prod => (
          <ProductCard
            key={prod.name}
            product={prod}
            onClick={() => handleProductClick(prod)}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        ))
      ) : (
        <p>No products found for the current search or category.</p>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Sidebar
        open={sidebarOpen}
        toggle={toggleSidebar}
        categories={CATEGORIES}
        onCategoryClick={handleCategoryClick}
        onLoginClick={() => setLoginOpen(true)}
      />
      <div style={{ flex: 1 }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          onCartClick={handleCartClick}
          onWishlistClick={handleWishlistClick}
        />

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />} />

            {/* The main/home route handles the product grid or the temporary product detail view */}
            <Route path="/" element={
              selectedProduct ? (
                <ProductDetail
                  product={selectedProduct}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              ) : (
                <ProductGrid />
              )
            } />

            {/* You would add more routes here, like for checkout, order detail, etc. */}
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
            {/* <Route path="/order/:id" element={<OrderDetailPage />} /> */}

          </Routes>
        </div>

        {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </div>
    </div>
  );
}

// --- App component wraps MainContent with Router ---
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
