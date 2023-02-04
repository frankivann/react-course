import { CAT_ENDPOINT_RANDOM_FACT } from '../utils/constants'

export async function getRandomCatFact () {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  return data.fact
}
