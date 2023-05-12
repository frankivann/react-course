import { Toaster } from 'sonner'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'
import './App.css'

export default function App () {
  return (
    <>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  )
}
