import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, SectionType } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'

function App () {
  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()
  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>

        <Col>
          <h2>From</h2>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>

        <Col>
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
            variant='link'
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <h2>To</h2>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </Col>
      </Row>

    </Container>
  )
}

export default App
