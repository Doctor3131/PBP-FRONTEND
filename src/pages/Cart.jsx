export default function Cart({ cartItems, setCartItems }) {
  const removeItem = name => setCartItems(cartItems.filter(item => item.name !== name))

  const updateQuantity = (name, quantity, maxStock) => {
    const validQty = Math.max(1, Math.min(quantity, maxStock))
    setCartItems(cartItems.map(item => item.name === name ? { ...item, quantity: validQty } : item))
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
      {cartItems.map(item => (
        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <div>
            <h4>{item.name}</h4>
            <p>Rp {item.price.toLocaleString()}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Available: {item.stock}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="number"
              min={1}
              max={item.stock}
              value={item.quantity}
              onChange={e => updateQuantity(item.name, Number(e.target.value), item.stock)}
              style={{ width: "60px", padding: '5px' }}
            />
            <button onClick={() => removeItem(item.name)} style={{ cursor: "pointer", padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>Remove</button>
          </div>
        </div>
      ))}
      {cartItems.length > 0 && <h3 style={{ marginTop: '20px' }}>Total: Rp {total.toLocaleString()}</h3>}
    </div>
  )
}
