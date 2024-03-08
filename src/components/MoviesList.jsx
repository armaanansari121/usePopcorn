import React, { useState } from 'react'
import Movie from './Movie';


function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (<Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />))}
    </ul>
  )
}

export default MoviesList
