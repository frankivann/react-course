import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestiondata'
import { useQuestionStore } from '../store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ marginTop: '12px' }}>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
    </footer>
  )
}
