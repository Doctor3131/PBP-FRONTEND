export default function ProductCard({ product, onClick, addToCart, addToWishlist }) {
  return (
    <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "6px", cursor: "pointer" }} onClick={onClick} />
      <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.name}</h3>
      <p style={{ fontWeight: 'bold' }}>Rp {product.price.toLocaleString()}</p>
      <p style={{ fontSize: '14px', color: '#666' }}>Stock: {product.stock}</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          style={{
            cursor: product.stock === 0 ? "not-allowed" : "pointer",
            padding: '8px 16px',
            backgroundColor: product.stock === 0 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
        <button
          onClick={() => addToWishlist(product)}
          style={{ cursor: "pointer", border: '1px solid #007bff', background: 'none', borderRadius: '4px', padding: '8px 12px' }}
        >
          ❤️
        </button>
      </div>
    </div>
  )
}
