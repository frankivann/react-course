import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './components/JavaScripLogo'
import { StartButton } from './components/StartButton'
import { useQuestionStore } from './store/questions'
import { Game } from './components/Game'
import './App.css'

export default function App () {
  const questions = useQuestionStore(state => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' marginBottom={2} gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <StartButton />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  )
}
