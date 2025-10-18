import React from "react";

export default function Cart({ cartItems, setCartItems }) {
  const removeItem = name => setCartItems(cartItems.filter(item => item.name !== name));
  const updateQuantity = (name, quantity) => {
    setCartItems(cartItems.map(item => item.name === name ? {...item, quantity} : item));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
      {cartItems.map(item => (
        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center" }}>
          <div>
            <h4>{item.name}</h4>
            <p>Rp {item.price.toLocaleString()}</p>
          </div>
          <div>
            <input type="number" min={1} max={item.stock} value={item.quantity} onChange={e => updateQuantity(item.name, Number(e.target.value))} style={{ width: "60px", marginRight: "10px" }} />
            <button onClick={() => removeItem(item.name)} style={{ cursor: "pointer" }}>Remove</button>
          </div>
        </div>
      ))}
      {cartItems.length > 0 && <h3>Total: Rp {total.toLocaleString()}</h3>}
    </div>
  );
}
