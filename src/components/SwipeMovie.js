import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { DEV_API_URL } from "../config";

const SwipeMovies = ({ session_id, updateMatchedCount }) => {
  // const [timesSwiped, setTimesSwiped] = useState(0);
  // const [totalItems, setTotalItems] = useState(0);
  // const [exhaustedList, setExhaustedList] = useState(false);

  const movies = [];

  const [moviesArray, setMoviesArray] = useState(movies);

  useEffect(() => {
    /* Call only when no array in local storage */
    const moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (!moviesFromLocalStorage) {
      fetch(`${DEV_API_URL}/fetch-movies?session_id=${session_id}`)
        .then((res) => res.json())
        .then((res) => {
          const itemsToSplice = res.data.length > 5 ? 5 : res.data.length;
          const splicedArray = res.data.slice(0, itemsToSplice);
          setMoviesArray(splicedArray);
          localStorage.setItem("movies", JSON.stringify(res.data));
          const moviesFromLocalStorage = JSON.parse(
            localStorage.getItem("movies")
          );
          moviesFromLocalStorage.splice(0, itemsToSplice);
          localStorage.setItem(
            "movies",
            JSON.stringify(moviesFromLocalStorage)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (moviesArray.length === 0) {
        const itemsToSplice =
          moviesFromLocalStorage.length > 5 ? 5 : moviesFromLocalStorage.length;
        const splicedArray = moviesFromLocalStorage.slice(
          0,
          -1 * itemsToSplice
        );
        setMoviesArray(splicedArray);
      }
    }
  }, []);

  const likeMovie = (session_id, movie_title) => {
    fetch(`${DEV_API_URL}/like-movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: session_id,
        movie_title: movie_title,
      }),
    }).catch((err) => {
      console.log(err);
    });
  };

  const matchedMovies = () => {
    fetch(`${DEV_API_URL}/matched-movies?session_id=${session_id}`)
      .then((res) => res.json())
      .then((res) => {
        updateMatchedCount(res.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swiped = (direction, nameToDelete, index, movie_title) => {
    moviesArray.splice(index, 1);
    if (moviesArray.length === 0) {
      const moviesFromLocalStorage = JSON.parse(localStorage.getItem("movies"));
      const itemsToSplice =
        moviesFromLocalStorage.length > 5 ? 5 : moviesFromLocalStorage.length;
      const splicedArray = moviesFromLocalStorage.slice(
        index,
        index + itemsToSplice
      );
      moviesFromLocalStorage.splice(index, itemsToSplice);
      localStorage.setItem("movies", JSON.stringify(moviesFromLocalStorage));
      setMoviesArray(splicedArray);
    } else {
      setMoviesArray(moviesArray);
    }
    if (direction === "right") {
      likeMovie(session_id, movie_title);
      matchedMovies();
    }
  };

  return (
    <div>
      <div className="mt-4 relative cardContainer w-full flex justify-center flex-wrap h-96">
        {moviesArray.length > 0 ? (
          moviesArray.map((movie, index) => (
            <TinderCard
              preventSwipe={["up", "down"]}
              className="swipe absolute h-96"
              key={movie.Poster_Link}
              onSwipe={(dir) =>
                swiped(dir, movie.Poster_Link, index, movie.Series_Title)
              }
            >
              <div
                style={{
                  backgroundImage: "url(" + movie.Poster_Link + ")",
                }}
                className="card bg-white rounded-md relative w-64 h-96 bg-cover ring-1 ring-gray-100"
              >
                <p className="bg-gradient-to-b from-transparent to-gray-900 bottom-0 text-center absolute text-sm text-white w-full pb-1 font-medium rounded-br-md rounded-bl-md">
                  IMDB rating - {movie.IMDB_Rating}
                </p>
              </div>
            </TinderCard>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500">
            <span className="block">That is all we got.</span> Create a new
            session by changing your preferences.{" "}
          </p>
        )}
        {moviesArray.length > 0 && (
          <p className="absolute text-xs text-gray-500 text-center -bottom-8">
            Swipe right to like a movie, left to dislike.
          </p>
        )}
      </div>
    </div>
  );
};

export default SwipeMovies;
