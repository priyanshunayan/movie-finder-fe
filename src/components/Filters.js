import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import HyperlinkIcon from "../link.svg";
import { DEV_API_URL } from "../config";
import Header from "./Header";

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
  const [sessionFromApi, setSessionFromApi] = useState(null);
  const classes = useStyles();

  const registerQuery = async (values) => {
    fetch(`${DEV_API_URL}/register-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success query", data);
      })
      .catch((err) => {
        console.log("An error occurred", err);
      });
  };

  const createSessionAndRegisterQuery = (values, data) => {
    fetch(`${DEV_API_URL}/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("sucess", data);
        values["session_id"] = data.session_id;
        setSessionFromApi(data.session_id);
        registerQuery(values);
      })
      .catch((err) => {
        console.log("An error occurred", err);
      });
  };
  const joinSessionAndRegisterQuery = (session_id, values) => {
    const postRequest = { session_id };
    fetch(`${DEV_API_URL}/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        values["session_id"] = data.session_id;
        const can_join = data.can_join;
        if (can_join) {
          setSessionFromApi(data.session_id);
          registerQuery(values);
        }
      })
      .catch((err) => {
        console.log("An error occurred", err);
      });
  };

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
      const data = {
        session_creator: values["name"],
      };

      if (session_id) {
        joinSessionAndRegisterQuery(session_id, values);
      } else {
        createSessionAndRegisterQuery(values, data);
      }
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
    <div className="bg-gray-50">
      <Header />
      <div className="md:py-8">
        <div className="container mx-auto p-4 md:w-6/12 bg-white md:rounded md:border">
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
              <div className="font-bold mt-4 mb-2">Genre</div>
              <div className="grid grid-cols-2 gap-2">
                {genreOptions.map((option) => (
                  <label key={option} className="mb-1 block w-max">
                    <Field
                      type="checkbox"
                      name="genre"
                      value={option}
                      className="mr-1 checked:bg-blue-600 checked:border-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="font-bold mt-4">Year Released</div>
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
              <div className="font-bold mt-4">IMDB Rating</div>
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
                  className="mt-8 bg-gray-700 font-semibold text-white block px-4 py-2 mx-auto mb-2 hover:bg-gray-800 focus:outline-none rounded-md"
                >
                  Join Session
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-8 bg-gray-700 font-semibold text-white block px-4 py-2 mx-auto mb-2 hover:bg-gray-800 focus:outline-none rounded-md"
                >
                  Create Session
                </button>
              )}
            </form>
          </FormikProvider>
          <p className="text-gray-500 text-xs text-center mt-4">
            Once you create a session, you will be able to pick movies together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filters;
