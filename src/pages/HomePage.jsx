import ProductCard from '../components/ProductCard.jsx'

export default function HomePage({ filteredProducts, setSelectedProduct, addToCart, addToWishlist }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    }}>
      {filteredProducts.map(prod => (
        <ProductCard
          key={prod.name}
          product={prod}
          onClick={() => setSelectedProduct(prod)}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}
      {filteredProducts.length === 0 && (
        <p>No products found for the current search/category.</p>
      )}
    </div>
  )
}
