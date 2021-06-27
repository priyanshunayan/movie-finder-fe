import React, { useEffect, useState } from "react";
import helperImage from "../assets/images/match-helper.png";
import { DEV_API_URL } from "../config";

const MatchedMovies = ({ session_id }) => {
  const [matchedMovies, setMatchedMovies] = useState([]);

  if (window.matched_movie_socket) {
    window.matched_movie_socket.onmessage = function (message) {
      let data = JSON.parse(message.data);
      if (data.session_id === session_id && data.matched_movie_res) {
        setMatchedMovies(data.data);
      }
    };
  }

  useEffect(() => {
    fetch(`${DEV_API_URL}/matched-movies?session_id=${session_id}`)
      .then((res) => res.json())
      .then((res) => {
        setMatchedMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative">
      <div className="p-2 bg-gray-100 border-b grid grid-flow-col gap-2 max-w-full overflow-x-scroll no-scrollbar h-28 lg:h-32 mb-8 auto-cols-max">
        {matchedMovies.length > 0 ? (
          matchedMovies.map((movie) => (
            <a
              href={`https://www.justwatch.com/us/search?q=${movie.Series_Title}`}
              key={movie.Poster_Link}
              target="_blank"
              rel="noreferrer"
            >
              <div
                style={{ backgroundImage: "url(" + movie.Poster_Link + ")" }}
                className="card shadow-sm bg-white rounded-sm relative w-16 lg:w-20 h-24 lg:h-28 bg-cover ring-1 ring-gray-100"
              >
                {" "}
              </div>
            </a>
          ))
        ) : (
          <div>
            <div className="card shadow-sm animate-pulse bg-gray-300 rounded-sm relative w-16 lg:w-20 h-24 lg:h-28"></div>
            <img src={helperImage} className="absolute w-48 left-16 top-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedMovies;
