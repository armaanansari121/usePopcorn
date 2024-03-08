import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const KEY = "244c6aae";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const isRated = userRating ? true : false;
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

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

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError("");
        setUserRating(0);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

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
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    // Cleanup function, It runs after the component is unmounted. It also runs between re-renders.
    // The concept of closure is utilised here, i.e. a function remembers the variables at the time and
    // the place where the function was created.

    return function () {
      document.title = 'usePopcorn';
      console.log(`Cleanup function ran for ${title}`)
    }
  }, [title])

  // This effect will get rendered everytime this component is rendered and will pile up the copy of event
  // listeners, hence cleaning them up becomes necessary to avoid calling the same function again and again.
  useEffect(function () {
    const callback = function (e) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }
    document.addEventListener('keydown', callback)

    return function () {
      document.removeEventListener('keydown', callback);
    }
  }, [onCloseMovie])

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
            {isWatched ? (
              <p>You rated this movie {watchedUserRating} <span>🌟</span></p>
            ) : (
              <>
                <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                <button
                  className={`btn-add${isWatched || !isRated ? "-disabled" : ""}`}
                  onClick={handleAdd} disabled={isWatched || !isRated}
                >
                  + Add to list
                </button>
              </>
            )}
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
