import { type TodoId, type Todo as TodoTypes } from '../types'

interface Props extends TodoTypes {
  onRemoveTodo: ({ id }: TodoId) => void
  onCompletedTodo: ({ id, completed }: Pick<TodoTypes, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onCompletedTodo }) => {
  //
  const handleCheckboxToggleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCompletedTodo({ id, completed: event.target.checked })
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={handleCheckboxToggleTodo}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => onRemoveTodo({ id })}
      />
    </div>
  )
}
