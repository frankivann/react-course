import { createContext, useReducer } from 'react'

export const CartContext = createContext()

const initialState = []
const reducer = (state, action) => {
  console.log(state)
  console.log(action)

  const { type, payload } = action

  switch (type) {
    case 'ADD_TO_CART': {
      const { id } = payload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...payload, // product
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART': {
      const { id } = payload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART': {
      return initialState
    }

    default:
      break
  }
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
