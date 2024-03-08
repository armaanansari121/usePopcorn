import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const KEY = "f84fc31d";

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Actors: actors,
    imdbRating,
    Director: director,
    Plot: plot,
    Genre: genre,
    Runtime: runtime,
    Released: released
  } = movie;

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong while fetching movie data.")
        }
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [selectedId])


  return (
    <div className='details'>
      {isLoading && <Loader />}
      {!isLoading && !error && <>
        <header>
          <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={`Image of ${title}`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>{released} &bull; {runtime}</p>
            <p><span>⭐</span>{imdbRating} IMDB Rating </p>
          </div>
        </header>
        <section>
          <div className="rating">
            <StarRating maxRating={10} size={24} />
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Diected by {director}</p>
        </section>
      </>}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default MovieDetails;
