import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { DEV_API_URL, SOCKET_URL } from "../config";

const SwipeMovies = ({ session_id, updateMatchedCount }) => {
  // const [timesSwiped, setTimesSwiped] = useState(0);
  // const [totalItems, setTotalItems] = useState(0);
  // const [exhaustedList, setExhaustedList] = useState(false);

  const movies = [];

  const [moviesArray, setMoviesArray] = useState(movies);
  const [loading, setLoading] = useState(true);
  const [detailVisibility, setDetailVisibility] = useState(false);

  const handleDetailClick = () => {
    setDetailVisibility((detailVisibility) => !detailVisibility);
  };

  useEffect(() => {
    window.socket = new WebSocket(`${SOCKET_URL}/matched_movie/${session_id}`);
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
        setLoading(false);
      }
    }
  }, []);

  const likeMovie = (session_id, movie_title) => {
    window.socket.send("liked_movie");
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
      {loading && (
        <div className="grid justify-items-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-spin text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      )}
      <div className="mt-4 relative cardContainer w-full flex justify-center flex-wrap h-96">
        {moviesArray.length > 0 ? (
          moviesArray.map((movie, index) => (
            <TinderCard
              preventSwipe={["up", "down"]}
              className="swipe absolute h-96 z-10"
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
                {detailVisibility && (
                  <div className="bg-gradient-to-b from-transparent to-gray-900 h-full rounded-br-md rounded-bl-md">
                    <p className="absolute text-sm text-white w-full pb-1 h-48 bottom-8 overflow-hidden font-medium rounded-br-md rounded-bl-md overflow-ellipsis p-2">
                      {movie.Overview.slice(0, 280)}...
                    </p>
                    <p className="bottom-0 text-center absolute text-sm text-white w-full pb-1 font-semibold ">
                      IMDB - {movie.IMDB_Rating}
                    </p>
                  </div>
                )}
              </div>
            </TinderCard>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500">
            <span className="block">¯\_(ツ)_/¯</span>
            <span className="block">That's all the movies we got.</span>
            <a
              href="/filters"
              title="Create a new session"
              className="underline hover:no-underline"
            >
              Start over
            </a>{" "}
            by creating a new session
          </p>
        )}
        {moviesArray.length > 0 && (
          <div className="absolute -bottom-16">
            <p className="text-xs text-gray-500 text-center ">
              Swipe right to like a movie, left to dislike.
            </p>
            <p
              className="text-xs text-gray-500 text-center mt-2 underline"
              onClick={handleDetailClick}
            >
              {detailVisibility ? "Hide movie details" : "Show movie details"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeMovies;
