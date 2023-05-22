import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // State to store the fetched movies
  const [movies, setMovies] = useState([]);

  // To show movies are on its way to show on screen .. Loding...
  const [showloader, setShowLoader] = useState(false);

  // Function to fetch movies data from the API
  async function fetchMovieHandler() {
    try {
      setShowLoader(true);
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
      setShowLoader(false);
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
        {/* if not showloader then display the movies on screen */}

        {!showloader && movies.length > 0 && <MoviesList movies={movies} />}

        {!showloader && movies.length === 0 && <p>Found No Movies</p>}

        {/* if there is loading time then display below msg. */}
        {showloader && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
