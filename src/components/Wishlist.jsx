import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Wishlist({ wishlistItems, setWishlistItems, addToCart }) {
  const navigate = useNavigate()

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const moveToCart = (item) => {
    addToCart(item)
    removeItem(item.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-md p-12">
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline text-lg"

          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}

              className="w-full h-48 object-cover"

            />
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2">Stock: {item.stock}</p>
              <p className="text-xl font-bold text-blue-600 mb-4">
                Rp {item.price.toLocaleString('id-ID')}

              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => moveToCart(item)}
                  disabled={item.stock === 0}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  Remove

                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
