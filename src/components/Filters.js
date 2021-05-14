import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import HyperlinkIcon from "../link.svg";

const useStyles = makeStyles({
  root: {
    color: "rgba(37, 99, 235, 1)",
    width: "75%",
  },
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Filters = () => {
  let query = useQuery();
  const session_id = query.get("session_id");
  const [yearValue, setYearValue] = useState([2010, 2021]);
  const [imdbValue, setImdbValue] = useState([8, 10]);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      genre: [],
    },
    onSubmit: (values) => {
      values["start_year"] = yearValue[0];
      values["end_year"] = yearValue[1];
      values["rating_start"] = imdbValue[0];
      values["rating_end"] = imdbValue[1];
      if (values.genre.length === 0) {
        values.genre.push("All genres");
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleYearChange = (event, newValue) => {
    setYearValue(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setImdbValue(newValue);
  };

  const genreOptions = [
    "All genres",
    "Drama",
    "Action",
    "Crime",
    "Adventure",
    "Biography",
    "Comedy",
    "Animation",
    "Thriller",
    "Horror",
    "Romance",
    "Music",
  ];

  const sessionCreator = "Phil";
  return (
    <div className="container mx-auto px-4 mt-4 md:w-6/12">
      {session_id ? (
        <div className="mb-4 flex rounded-md">
          <div>
            <img
              src={HyperlinkIcon}
              width={15}
              height={15}
              className="inline mr-3"
            />
          </div>
          <div>
            {sessionCreator} has invited you to the movie finding session.
          </div>
        </div>
      ) : null}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="block mb-2 font-bold">
            Enter your name
          </label>
          <input
            id="name"
            required
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Phil Dunphy"
            className="block border border-gray-400 mb-2 w-9/12 p-1 rounded-md"
          />
          <div className="font-bold">Genre</div>
          <div className="p-1">
            {genreOptions.map((option) => (
              <label key={option} className="mb-1 block w-max">
                <Field
                  type="checkbox"
                  name="genre"
                  value={option}
                  className="mr-1 checked:bg-blue-600 checked:border-transparent"
                />
                <span className="font-light">{option}</span>
              </label>
            ))}
          </div>
          <div className="font-bold">Year Released</div>
          <div className="text-gray-400 text-sm mt-2">
            {yearValue[0]}- {yearValue[1]}
          </div>
          <Slider
            className={classes.root}
            max={2021}
            min={1990}
            value={yearValue}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <div className="font-bold">IMDB Rating</div>
          <div className="text-gray-400 text-sm mt-2">
            {imdbValue[0]}- {imdbValue[1]}
          </div>
          <Slider
            className={classes.root}
            max={10}
            min={0}
            value={imdbValue}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />

          {session_id ? (
            <button
              type="submit"
              className="bg-blue-700 text-white block px-4 py-2 mx-auto mb-2 hover:bg-blue-800 focus:outline-none rounded-md"
            >
              Join Session
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white block px-4 py-2 mx-auto mb-2 hover:bg-blue-800 focus:outline-none rounded-md"
            >
              Create Session
            </button>
          )}
        </form>
      </FormikProvider>
    </div>
  );
};

export default Filters;
