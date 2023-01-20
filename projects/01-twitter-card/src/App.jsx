import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'

export default function App () {
  const users = [
    {
      name: 'ibai',
      username: 'ibaillanos'
    },
    {
      name: 'midudev',
      username: 'midudev'
    },
    {
      name: 'elon',
      username: 'elonmusk'
    },
    {
      name: 'christian',
      username: 'cbum'
    },
    {
      name: 'angela',
      username: 'angela'
    }
  ]

  return (
    <div className='App'>
      <div className='tw-bodyCard'>
        <h3 className='tw-title'>Twitter Card 🥳</h3>
        {users.map(({ name, username }) => (
          <TwitterFollowCard
            name={name}
            key={username}
            username={username}
          />
        ))}
      </div>
    </div>
  )
}
