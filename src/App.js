import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // State to store the fetched movies
  const [movies, setMovies] = useState([]);
  // To show movies are on their way to show on the screen - Loading...
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimer, setRetryTimer] = useState(null);

  useEffect(() => {
    if (retryCount > 0) {
      const timer = setTimeout(() => {
        fetchMovieHandler();
      }, 5000);
      setRetryTimer(timer);
    }
    return () => {
      clearTimeout(retryTimer);
    };
  }, [retryCount]);

  // Function to fetch movies data from the API
  async function fetchMovieHandler() {
    try {
      setShowLoader(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying");
      }
      // Parse the JSON response
      const data = await response.json();

      // Transform the movie data into the desired format
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      // Update the state with the transformed movies data
      setMovies(transformedMovies);
      setShowLoader(false);
      setRetryCount(0);
      clearTimeout(retryTimer);
    } catch (error) {
      setError(error.message);
      setShowLoader(false);
      setRetryCount(retryCount + 1);
    }
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={fetchMovieHandler}>Retry</button>
      </React.Fragment>
    );
  }

  if (showLoader) {
    content = <p>Loading ...</p>;
  }

  function handleCancelRetry() {
    clearTimeout(retryTimer);
    setRetryCount(0);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {retryCount > 0 && <button onClick={handleCancelRetry}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
