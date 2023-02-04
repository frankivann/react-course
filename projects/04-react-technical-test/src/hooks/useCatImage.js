import { useEffect, useState } from 'react'
import { PREFIX_CAT_ENDPOINT_IMAGE } from '../utils/constants'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(function () {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    const imageEnpoint = `https://cataas.com/cat/says/${threeFirstWords}?size=50&json=true`

    fetch(imageEnpoint)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${PREFIX_CAT_ENDPOINT_IMAGE}${imageUrl}` }
}
