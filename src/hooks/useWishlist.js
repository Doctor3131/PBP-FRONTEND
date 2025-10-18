import { useState } from 'react'

export function useWishlist(showNotification, userRole) {
  const [wishlistItems, setWishlistItems] = useState([])

  const addToWishlist = product => {
    if (userRole === 'visitor') {
      showNotification('Please log in to add items to your wishlist', 'warning')
      return
    }

    if (wishlistItems.find(item => item.name === product.name)) {
      showNotification('Item already in wishlist', 'warning')
      return
    }

    setWishlistItems([...wishlistItems, product])
    showNotification('Added to wishlist', 'success')
  }

  return { wishlistItems, setWishlistItems, addToWishlist }
}
