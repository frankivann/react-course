import { useFilters } from '../hooks/useFilters'
import './Filters.css'

export default function Filters () {
  const { filters, setFilters } = useFilters()

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>

      <div>
        <label htmlFor='price'>Price</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Category</label>
        <select id='category' onChange={handleChangeCategory}>
          <option value='all'>all</option>
          <option value='smartphones'>smartphones</option>
          <option value='laptops'>laptops</option>
          <option value='home-decoration'>home decoration</option>
        </select>
      </div>

    </section>
  )
}
