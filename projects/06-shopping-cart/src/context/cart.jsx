import { createContext } from 'react'
import { useCartReducer } from '../hooks/useCartReducer'
export const CartContext = createContext()

export function CartProvider ({ children }) {
  const { addToCart, clearCart, removeFromCart, state } = useCartReducer()

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  )
}
