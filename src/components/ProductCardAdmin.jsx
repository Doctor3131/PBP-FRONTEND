import React from 'react'

export default function ProductCardAdmin({ product, onEdit, onDelete }) {
  const { name, price, stock, image } = product

  return (
    <div className="product-card-admin">
      <img src={image} alt={name} className="product-image-admin" />
      <div className="product-info-admin">
        <h4 className="product-name-admin">{name}</h4>
        <p>Price: Rp {price.toLocaleString()}</p>
        <p>Stock: {stock}</p>
      </div>
      <div className="product-actions-admin">
        <button onClick={onEdit} className="admin-button edit-button">Edit</button>
        <button onClick={onDelete} className="admin-button delete-button">Delete</button>
      </div>
    </div>
  )
}
