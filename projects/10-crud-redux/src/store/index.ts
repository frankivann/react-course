import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import usersReducer, { rollbackUser } from './users/slice'

const persistenceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action
  const previousState = store.getState() as RootState

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) return toast.success(`Usuario ${userIdToRemove} correctamente!`)
        throw new Error('Error al eliminar usuario')
      })
      .catch(error => {
        toast.error(`Error eliminando usuario ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.error(error)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [
    persistenceLocalStorageMiddleware,
    syncWithDatabaseMiddleware
  ]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
