export async function queryMovies ({ query }) {
  if (!query) return null
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`)
    const json = await response.json()

    const movies = json?.Search

    return movies?.map(movies => ({
      id: movies.imdbID,
      title: movies.Title,
      year: movies.Year,
      poster: movies.Poster
    }))
  } catch (error) {
    throw new Error('Error searching movies.')
  }
}
