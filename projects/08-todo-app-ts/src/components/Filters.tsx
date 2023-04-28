import { BUTTONS_FILTERS } from '../consts'
import { type FilterValue } from '../types'

interface Props {
  filterSelected: FilterValue,
  onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <ul className='filters'>
      {
        Object.entries(BUTTONS_FILTERS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const classname = isSelected ? 'selected' : ''
          return (
            <li key={key}>
              <a
                href={href}
                className={classname}
                onClick={(event) => {
                  event.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
              >
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
