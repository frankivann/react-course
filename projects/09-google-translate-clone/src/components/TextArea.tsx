import { Form } from 'react-bootstrap'
import { SectionType } from '../constants'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px' }

const getPlaceHolder = ({ type, loading }: {type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Enter text...'
  if (loading === true) return 'Loading...'

  return 'Translation'
}

export const TextArea: React.FC<Props> = ({ type, loading, value, onChange }) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      placeholder={getPlaceHolder({ type, loading })}
      disabled={type === SectionType.To}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
