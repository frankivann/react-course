import { createContext, useState } from 'react'
const INITIAL_FILTERS = {
  category: 'all',
  minPrice: 0
}

// Singleton
// 1. Crear contexto
export const FiltersContext = createContext()

// 2. Proveer contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const value = { filters, setFilters }

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}
