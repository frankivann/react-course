function ListOfMovies ({ movies }) {
  return (
    <main className='movies'>
      <ul className='listOfMovies'>
        {
      movies.map(movie => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))
    }
      </ul>
    </main>
  )
}

function NoMovies () {
  return (
    <p>no se encontraron películas para esta busqueda.</p>
  )
}

export default function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMovies />
  )
}
