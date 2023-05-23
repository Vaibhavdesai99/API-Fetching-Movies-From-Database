import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  // useCallback is to memoize the fetchMovieHandler function so that it doesn't get re-created on every render, optimizing performance by preventing unnecessary re-renders of child components that receive this function as a prop.
  // GET REQUEST :
  const fetchMovieHandler = useCallback(async () => {
    setShowLoader(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-api-5d842-default-rtdb.firebaseio.com/movies.json"
      );

      // console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong ...");
      }
      // Parse the JSON response
      const data = await response.json();

      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setShowLoader(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  // DELETE REQUEST:
  async function deleteMovieHandler(id) {
    try {
      const response = await fetch(
        `https://react-http-api-5d842-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      // Remove the deleted movie from the movies state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (showLoader) {
    content = <p>Loading ...</p>;
  }

  // POST REQUEST :
  async function AddMovieHandler(movies) {
    const response = await fetch(
      "https://react-http-api-5d842-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movies),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

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
