import { useState } from 'react'
import { Todos } from './components/Todos'
import { FilterValue, TodoTitle, type Todo, type TodoId } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mocksTodos = [
  {
    id: '1',
    title: 'Ver el twitch de midu 💜',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React con TypeScript',
    completed: false
  },
  {
    id: '3',
    title: 'Decir que la vida es un ciclo',
    completed: false
  }
]

const App = () => {
  const [todos, setTodos] = useState(mocksTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const onRemoveTodo = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const onCompletedTodo = ({ id, completed }: Pick<Todo, 'id' | 'completed'>) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const onFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter)
  }

  const onClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const onAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filterTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <Header onAddTodo={onAddTodo} />

      <Todos
        onRemoveTodo={onRemoveTodo}
        todos={filterTodos}
        onCompletedTodo={onCompletedTodo}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={onClearCompleted}
        filterSelected={filterSelected}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}

export default App
