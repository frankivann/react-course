const localStorageCart = JSON.parse(window.localStorage.getItem('cart')) || []
export const CART_REDUCER_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

const updateLocalStorage = (cart) => {
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

const clearLocalStorage = () => window.localStorage.removeItem('cart')

// Dictionary
const UPDATE_STATE_BY_ACTION = {
  [CART_REDUCER_TYPES.ADD_TO_CART]: (state, action) => {
    const { payload } = action
    const { id } = payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      /* 1. FORMA : más legible */
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

      /* 2. FORMA : más típica */
      // const newState = state.map(product => {
      //   if (product.id === id) {
      //     return {
      //       ...product,
      //       quantity: product.quantity + 1
      //     }
      //   }

      //   return product
      // })

      /* 3. FORMA : más rápida */
      const newState = [
        ...state.slice(0, productInCartIndex),
        {
          ...state[productInCartIndex],
          quantity: state[productInCartIndex].quantity + 1
        },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...payload, // product
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },

  [CART_REDUCER_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },

  [CART_REDUCER_TYPES.CLEAR_CART]: () => {
    clearLocalStorage()
    return []
  }
}

export const cartInitialState = localStorageCart
export const cartReducer = (state, action) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
