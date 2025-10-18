import React from 'react'
import ProductDetail from '../components/Productdetail.jsx'

export default function ProductDetailPage({ product, addToCart, addToWishlist }) {
  return (
    <ProductDetail product={product} addToCart={addToCart} addToWishlist={addToWishlist} />
  )
}
