import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

export function StartButton () {
  const getQuestions = useQuestionStore(state => state.getQuestions)

  const handleClick = () => {
    getQuestions(5)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      ¡Empezar!
    </Button>
  )
}
