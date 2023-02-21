import { useEffect, useState, useRef } from 'react'

export default function useQuery () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(function () {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if (query === '') {
      setError('No se puede buscar una película vacía.')
      return
    }

    if (query.match(/^\d+$/)) {
      setError('No se puede buscar una película que inicie con un número.')
      return
    }

    if (query.length < 3) {
      setError('La busqueda debe tener más de 3 caracteres.')
      return
    }

    setError(null)
  }, [query])

  const updateQuery = query => setQuery(query)

  return { query, error, updateQuery }
}
