import { useEffect, useRef, useState, useMemo } from 'react'
import { ListOfUsers } from './components/ListOfUsers'
import { SortBy, type User } from './types.d'
import './App.css'

export default function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(function () {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res?.results)
        originalUsers.current = res?.results
      })
      .catch(err => console.error(err))
  }, [])

  const toggleShowColors = () => setShowColors(!showColors)

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sortValue: SortBy) => {
    // const newSortingValue = sorting === SortBy.NONE ? sortValue : SortBy.NONE
    setSorting(sortValue)
  }

  const handleUserDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const onFilteredByCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByCountry(event.target.value)
  }

  const handleUserReset = () => setUsers(originalUsers.current)

  const filteredUsers = useMemo(() => {
    return filterByCountry && filterByCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterByCountry.toLowerCase()))
      : users
  }, [filterByCountry, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.FIRST]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filteredUsers])

  return (
    <>
      <header>
        <h1>Prueba Técnica</h1>
        <div style={{ display: 'flex', placeContent: 'center', gap: '20px', marginBottom: '50px' }}>
          <button onClick={toggleShowColors}>Colorear filas</button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'Dejar de ordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleUserReset}>Resetear usuarios</button>
          <input
            type='text'
            placeholder='filtrar por país'
            onChange={onFilteredByCountry}
          />
        </div>
      </header>

      <ListOfUsers
        users={sortedUsers}
        showColors={showColors}
        handleChangeSort={handleChangeSort}
        handleUserDelete={handleUserDelete}
      />
    </>
  )
}
