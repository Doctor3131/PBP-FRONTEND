import React from 'react'
import Wishlist from '../components/Wishlist.jsx'

export default function WishlistPage({ wishlistItems, setWishlistItems, addToCart }) {
  return (
    <Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} addToCart={addToCart} />
  )
}
