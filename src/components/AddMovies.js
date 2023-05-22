import React, { useState } from "react";
import "./AddMovies.css";
const AddMovies = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [openingtext, setOpeningOpeningText] = useState("");
  const [releasedate, setreleaseDate] = useState("");

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const MoviesObject = {
      title: title,
      openingtext: openingtext,
      releasedate: releasedate,
    };

    onAddMovie(MoviesObject);
    setTitle("");
    setOpeningOpeningText("");
    setreleaseDate("");
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const openingtextHandler = (event) => {
    setOpeningOpeningText(event.target.value);
  };

  const releaseDateHandler = (event) => {
    setreleaseDate(event.target.value);
  };
  return (
    <div>
      <form onSubmit={FormSubmitHandler}>
        <div className="AddMoviesHere">
          <div className="Movies">
            <label htmlFor="title">Title</label>
            <input type="text" onChange={titleHandler} value={title} />
          </div>
          <div className="Movies">
            <label htmlFor="Opening_Text">Opening Text</label>
            <textarea
              onChange={openingtextHandler}
              value={openingtext}
              rows={5}
              cols={60}
            />
          </div>
          <div className="Movies">
            <label htmlFor="Release-Date">Release Date</label>
            <input
              type="text"
              onChange={releaseDateHandler}
              value={releasedate}
            />
          </div>
          <button>ADD MOVIES</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovies;
