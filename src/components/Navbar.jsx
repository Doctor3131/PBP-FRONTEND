import React from 'react'

export default function Navbar({
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,

  onCartClick,
  onWishlistClick,
}) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-2xl hover:text-gray-600 transition-colors"
            aria-label="Toggle menu"
          >

            ☰

          </button>

          <h1 className="text-2xl font-bold text-gray-800">KeyStore</h1>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

          className="flex-1 max-w-md mx-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-4">
          <button
            onClick={onWishlistClick}

            className="relative hover:text-red-500 transition-colors"
            aria-label="Wishlist"
          >
            <span className="text-2xl">❤️</span>
            {wishlistCount > 0 && (

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartClick}
            className="relative hover:text-blue-500 transition-colors"

            aria-label="Cart"
          >
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </button>

        </div>
      </div>
    </nav>
  )
}
