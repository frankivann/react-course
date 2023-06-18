import { useCallback, useState } from 'react'
import Movies from './components/Movies'
import useMovies from './hooks/useMovies'
import useQuery from './hooks/useQuery'
import './App.css'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { query, error, updateQuery } = useQuery()
  const { movies, getMovies, loading } = useMovies({ query, sort })

  const getDebounceMovies = useCallback(
    debounce((query) => {
      getMovies({ query })
    }, 300),
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    updateQuery(newQuery)
    getDebounceMovies(newQuery)
  }

  return (
    <div className='home'>
      <header>
        <h1>Buscador de Pelis 🎥</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='...'
            name='query'
            value={query}
            onChange={handleChange}
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>buscar</button>
        </form>
        {error && <small className='error'>{error}</small>}
      </header>

      {loading ? <small>cargando...</small> : <Movies movies={movies} />}
    </div>
  )
}

export default App
