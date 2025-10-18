import React from 'react'

export default function ProductCard({ product, onClick, addToCart, addToWishlist }) {

  const handleAddToCart = (e) => {
    e.stopPropagation()

    if (product.stock > 0) {
      addToCart(product)
    }
  }

  const handleAddToWishlist = (e) => {
    e.stopPropagation()
    addToWishlist(product)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-2">
          Stock: {product.stock > 0 ? product.stock : <span className="text-red-600">Out of Stock</span>}
        </p>
        <p className="text-xl font-bold text-blue-600 mb-4">
          Rp {product.price.toLocaleString('id-ID')}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}

            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button
            onClick={handleAddToWishlist}
            className="px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            ❤️
          </button>
        </div>

      </div>
    </div>

  )

}
