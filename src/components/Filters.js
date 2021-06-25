import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import { DEV_API_URL, SOCKET_URL } from "../config";

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
  const history = useHistory();
  const session_id = query.get("session_id");
  const [yearValue, setYearValue] = useState([2010, 2021]);
  const [imdbValue, setImdbValue] = useState([8, 10]);
  const [sessionFromApi, setSessionFromApi] = useState(null);
  const [sessionCreator, setSessionCreator] = useState("");
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
        const session = data.session_id;
        const socket = new WebSocket(`${SOCKET_URL}/can_join/${session}`);
        socket.onopen = function () {
          console.log("Socket open.");
        };
        window.socket = socket;
        if (session_id) {
          history.push(`/movies?session_id=${session_id}`);
        } else if (session) {
          history.push(`/session-created?session_id=${session}`);
        } else {
          alert("Request failed. Please try again");
        }
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
    fetch(`${DEV_API_URL}/join-session`, {
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
        } else {
          history.push("/");
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
      localStorage.clear();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:py-16">
        <div className="container mx-auto p-4 pb-16 md:w-6/12 md:rounded md:border md:bg-white">
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tighter mb-1">
              Set preferences
            </h1>
            <h2 className="text-sm">
              You will be shown movies based on your set preferences
            </h2>
          </header>

          {session_id ? (
            <div className="mb-4 flex rounded-md">
              <div>
                {/* <img
                  src={HyperlinkIcon}
                  width={15}
                  height={15}
                  className="inline mr-3"
                /> */}
              </div>
              <div>
                {sessionCreator
                  ? `${sessionCreator} has invited you to the movie finding session`
                  : null}
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
                className="block ring-1 ring-gray-200 mb-2 w-full py-1 px-2 rounded-sm"
              />
              <div className="font-bold mt-4 mb-2">Genre</div>
              <div className="grid grid-cols-2 gap-1">
                {genreOptions.map((option) => (
                  <label key={option} className="mb-1 block w-full">
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
              {/* dummy Language filter - Replace it with actual language */}
              {/* <div className="font-bold mt-4 mb-2">Language</div>
              <div className="grid grid-cols-2 gap-1">
                {genreOptions.slice(0, 6).map((option) => (
                  <label key={option} className="mb-1 block w-full">
                    <Field
                      type="checkbox"
                      name="genre"
                      value={option}
                      className="mr-1 checked:bg-blue-600 checked:border-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div> */}
              <div className="font-bold mt-4">Year Released</div>
              <div className="text-gray-400 text-sm mt-2 w-full">
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

              <button
                type="submit"
                className="mt-8 bg-gray-700 font-medium text-white block px-4 py-2 mx-auto mb-2 hover:bg-gray-800 focus:outline-none rounded w-full"
              >
                {session_id ? "Join session" : "Create session"}
              </button>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default Filters;
