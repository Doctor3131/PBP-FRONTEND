import { useState } from 'react'

export default function ProductDetail({ product, addToCart, addToWishlist }) {
  const [quantity, setQuantity] = useState(1)
  const handleQuantityChange = (val) => {
    const newQty = Math.max(1, Math.min(val, product.stock))
    setQuantity(newQty)
  }
  return (
    <div style={{ display: "flex", gap: "30px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <img src={product.image} alt={product.name} style={{ width: "300px", borderRadius: "8px" }} />
      <div style={{ flex: 1 }}>
        <h2>{product.name}</h2>
        <p style={{ fontSize: "18px", color: "#555" }}>Rp {product.price.toLocaleString()}</p>
        {product.stock === 0 ? (
          <span style={{ color: "red", fontWeight: "bold" }}>Sold Out</span>
        ) : (
          <>
            <div style={{ margin: "10px 0" }}>
              <label>Quantity: </label>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={e => handleQuantityChange(Number(e.target.value))}
                style={{ width: "60px", padding: "5px" }}
              />
              <span style={{ marginLeft: '10px', color: '#666' }}>({product.stock} available)</span>
            </div>
            <button
              onClick={() => addToCart({ ...product, quantity })}
              style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "10px" }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(product)}
              style={{ padding: "10px 20px", backgroundColor: "#fff", color: "#007bff", border: "1px solid #007bff", borderRadius: "6px", cursor: "pointer" }}
            >
              ❤️ Add to Wishlist
            </button>
          </>
        )}
        <div style={{ marginTop: "20px" }}>
          <h3>Product Specifications:</h3>
          <p>{product.specs}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  )
}
