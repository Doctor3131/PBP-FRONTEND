import { formatCurrency } from '../../utils/helpers'

const WishlistPage = ({ wishlistItems, setWishlistItems, handleAddToCart }) => {
  const handleRemoveFromWishlist = (productToRemove) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productToRemove.id))
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Wishlist Saya</h2>
      {wishlistItems.length === 0 ? (
        <p>Anda belum memiliki item di wishlist.</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
            <div>
              <h4>{item.name}</h4>
              <p>{formatCurrency(item.price)}</p>
            </div>
            <div>
              <button onClick={() => {
                handleAddToCart(item)
                handleRemoveFromWishlist(item)
              }} style={{ marginRight: '10px' }}>Pindahkan ke Keranjang</button>
              <button onClick={() => handleRemoveFromWishlist(item)} style={{ color: 'red' }}>Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default WishlistPage
