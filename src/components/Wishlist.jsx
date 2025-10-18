import React from "react";

export default function Wishlist({ wishlistItems, setWishlistItems, addToCart }) {
  const removeItem = name => setWishlistItems(wishlistItems.filter(item => item.name !== name));

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>Wishlist</h2>
      {wishlistItems.length === 0 ? <p>Your wishlist is empty</p> : null}
      {wishlistItems.map(item => (
        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center" }}>
          <div>
            <h4>{item.name}</h4>
            <p>Rp {item.price.toLocaleString()}</p>
          </div>
          <div>
            <button onClick={() => addToCart(item)} style={{ marginRight: "10px", cursor: "pointer" }}>Add to Cart</button>
            <button onClick={() => removeItem(item.name)} style={{ cursor: "pointer" }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
