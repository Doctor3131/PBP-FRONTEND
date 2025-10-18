import Cart from '../components/Cart.jsx'

export default function CartPage({ cartItems, setCartItems }) {
  return (
    <Cart cartItems={cartItems} setCartItems={setCartItems} />
  )
}
