import { useAppDispatch } from './store'
import { type UserId, type User, deleteUserById, addNewUser } from '../store/users/slice'

export function useUser () {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  return {
    addUser,
    removeUser
  }
}
