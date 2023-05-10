import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistenceLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
