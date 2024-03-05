import React, { useState } from 'react'
import Movie from './Movie';


function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (<Movie movie={movie} key={movie.imdbID} />))}
    </ul>
  )
}

export default MoviesList
