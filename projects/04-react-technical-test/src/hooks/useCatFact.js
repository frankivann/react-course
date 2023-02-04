import { useEffect, useState } from 'react'
import { getRandomCatFact } from '../services'

export function useCatFact () {
  const [fact, setFact] = useState('')

  const refreshFact = () => {
    getRandomCatFact()
      .then(setFact)
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
