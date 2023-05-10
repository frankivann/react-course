import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import './App.css'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE, SectionType } from './constants'
import { useStore } from './hooks/useStore'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromText,
    setResult,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              value={fromText}
              onChange={setFromText}
              type={SectionType.From}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            variant='link'
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              value={result}
              onChange={setResult}
              loading={loading}
              type={SectionType.To}
            />
          </Stack>
        </Col>
      </Row>

    </Container>
  )
}

export default App
