export default function ProductCard({ product, onDelete, onUpdateStock }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">Rp {product.price.toLocaleString("id-ID")}</p>
      <div className="stock-controls">
        <button onClick={() => onUpdateStock(product.id, -1)}>-</button>
        <span>Stok: {product.stock}</span>
        <button onClick={() => onUpdateStock(product.id, 1)}>+</button>
      </div>
      <button className="delete-btn" onClick={() => onDelete(product.id)}>
        Hapus
      </button>
    </div>
  );
}
