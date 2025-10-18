import React from "react";

export default function ProductCard({ product, onClick, addToCart, addToWishlist }) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer" }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "6px" }} onClick={onClick} />
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString()}</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button onClick={() => addToCart(product)} style={{ cursor: "pointer" }}>Buy</button>
        <button onClick={() => addToWishlist(product)} style={{ cursor: "pointer" }}>❤️</button>
      </div>
      {product.stock === 0 && <span style={{ color: "red" }}>Sold Out</span>}
    </div>
  );
}
