export default function ProductCardUser({ product, onAddToCart }) {
  const { id, name, price, image, stock } = product

  // Format harga ke Rupiah
  const formattedPrice = price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return (
    <div className="product-card">
      {/* Gambar produk menggunakan URL placeholder */}
      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">{formattedPrice}</p>
        <p className="product-stock">Stok: {stock}</p>

        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={stock <= 0}
        >
          {stock > 0 ? 'Tambah ke Keranjang 🛒' : 'Stok Habis'}
        </button>
      </div>
    </div>
  )
}
