import React from "react";

export default function Navbar({ toggleSidebar, searchQuery, setSearchQuery, cartCount, wishlistCount, onCartClick, onWishlistClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={toggleSidebar} style={{ fontSize: "24px", marginRight: "10px", cursor: "pointer" }}>☰</button>
        <h1 style={{ margin: 0 }}>KeyStore</h1>
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ flex: 1, margin: "0 20px", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <button onClick={onWishlistClick} style={{ cursor: "pointer" }}>❤️ {wishlistCount}</button>
        <button onClick={onCartClick} style={{ cursor: "pointer" }}>🛒 {cartCount}</button>
        <button style={{ cursor: "pointer" }}>👤</button>
      </div>
    </div>
  );
}
