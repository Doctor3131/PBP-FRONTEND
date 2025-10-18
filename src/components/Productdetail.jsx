import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductDetail({ product, addToCart, addToWishlist }) {

  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">

        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/')}

          className="text-blue-600 hover:underline"
        >
          Back to Home
        </button>

      </div>
    )
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1

    setQuantity(Math.max(1, Math.min(product.stock, value)))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4 inline-flex items-center gap-1"

      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-2">Stock: {product.stock} available</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              Rp {product.price.toLocaleString('id-ID')}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <p className="text-gray-700">{product.specs || 'No specifications available'}</p>
            </div>

            {product.stock > 0 ? (
              <>

                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}

                    onChange={handleQuantityChange}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                  />

                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="px-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Add to wishlist"
                  >

                    ❤️ Wishlist
                  </button>
                </div>
              </>
            ) : (
              <p className="text-red-600 font-bold text-xl">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
