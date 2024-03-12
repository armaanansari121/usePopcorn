import { useEffect, useState } from "react";

const KEY = "244c6aae";

export function useMovieDetails(selectedId) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDetails() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong while fetching movie data.");
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
  return { movie, isLoading, error };
}
