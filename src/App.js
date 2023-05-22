import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  //useEffect in this code is to fetch movie data.
  //data fetching once when the component is initially rendered.

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  // useCallback is to memoize the fetchMovieHandler function so that it doesn't get re-created on every render, optimizing performance by preventing unnecessary re-renders of child components that receive this function as a prop.
  const fetchMovieHandler = useCallback(async () => {
    setShowLoader(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong ...");
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
    } catch (error) {
      setError(error.message);
    }
    setShowLoader(false);
  }, []);

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (showLoader) {
    content = <p>Loading ...</p>;
  }

  const AddMovieHandler = (movies) => {
    console.log(movies);
  };

  return (
    <React.Fragment>
      <AddMovies onAddMovie={AddMovieHandler} />
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
