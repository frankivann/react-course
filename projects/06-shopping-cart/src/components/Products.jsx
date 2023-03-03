import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import './Products.css'

export function Products ({ products }) {
  const { addToCart, cart } = useCart() // eslint-disable-line

  const chackProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = chackProductInCart(product)

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - {product.price}$
              </div>
              <div>
                <button onClick={() => addToCart(product)}>
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
