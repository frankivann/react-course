import { useRef, useState, useMemo, useCallback } from 'react'
import { queryMovies } from '../services/movies'

export default function useMovies ({ query, sort }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null) // eslint-disable-line
  const [loading, setLoading] = useState(false)
  const prevQuery = useRef(query)

  const getMovies = useCallback(async ({ query }) => {
    if (prevQuery.current === query) return null
    try {
      setLoading(true)
      prevQuery.current = query
      const newMovies = await queryMovies({ query })
      setMovies(newMovies)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    if (!movies) return
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
