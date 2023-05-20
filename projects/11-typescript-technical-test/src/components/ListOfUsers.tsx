import { SortBy, User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  handleUserDelete: (email: string) => void
  handleChangeSort: (sortBy: SortBy) => void
}

export const ListOfUsers: React.FC<Props> = ({ users, showColors, handleUserDelete, handleChangeSort }) => {
  return (
    <table width='100%'>

      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => handleChangeSort(SortBy.FIRST)}>Nombre</th>
          <th onClick={() => handleChangeSort(SortBy.LAST)}>Apellido</th>
          <th onClick={() => handleChangeSort(SortBy.COUNTRY)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? 'table' : ''}>
        {
          users.map(user => (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt={`picture of ${user.name}`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleUserDelete(user.email)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
