import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // State to store the fetched movies
  const [movies, setMovies] = useState([]);

  // Function to fetch movies data from the API
  async function fetchMovieHandler() {
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      // Parse the JSON response
      const data = await response.json();

      // Transform the movie data into desired format
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      // Update the state with the transformed movies data
      setMovies(transformedMovies);
    } catch (error) {
      console.error("SOMETHING WENT WRONG :", error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;