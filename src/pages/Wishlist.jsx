// src/pages/Wishlist.jsx
export default function Wishlist({ wishlistItems, setWishlistItems, addToCart }) {
  const removeItem = name => setWishlistItems(wishlistItems.filter(item => item.name !== name))
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>Wishlist</h2>
      {wishlistItems.length === 0 ? <p>Your wishlist is empty</p> : null}
      {wishlistItems.map(item => (
        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", alignItems: "center", borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <div>
            <h4>{item.name}</h4>
            <p>Rp {item.price.toLocaleString()}</p>
            <p style={{ fontSize: '12px', color: item.stock === 0 ? 'red' : '#666' }}>
              {item.stock === 0 ? 'Out of Stock' : `Stock: ${item.stock}`}
            </p>
          </div>
          <div>
            <button
              onClick={() => addToCart(item)}
              disabled={item.stock === 0}
              style={{
                marginRight: "10px",
                cursor: item.stock === 0 ? "not-allowed" : "pointer",
                padding: '5px 10px',
                backgroundColor: item.stock === 0 ? '#ccc' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Add to Cart
            </button>
            <button onClick={() => removeItem(item.name)} style={{ cursor: "pointer", padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}
