import React, { useEffect, useState } from "react";
import { DEV_API_URL } from "../config";

const MatchedMovies = ({ session_id }) => {
  const [matchedMovies, setMatchedMovies] = useState([]);

  useEffect(() => {
    window.socket.onmessage = function (message) {
      let data = JSON.parse(message.data);
      if (data.session_id === session_id && data.matched_movie_res) {
        setMatchedMovies(data.data);
      }
    };
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
    <div>
      <div className="p-2 bg-gray-100 border-b grid grid-flow-col gap-2 max-w-full overflow-x-scroll no-scrollbar h-28 lg:h-32 mb-8 auto-cols-max">
        {matchedMovies.length > 0 ? (
          matchedMovies.map((movie) => (
            <div
              key={movie.Poster_Link}
              style={{ backgroundImage: "url(" + movie.Poster_Link + ")" }}
              className="card shadow-sm bg-white rounded-sm relative w-16 lg:w-20 h-24 lg:h-28 bg-cover ring-1 ring-gray-100"
            >
              {" "}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 animate-pulse self-center justify-self-center pl-4">
            {" "}
            Your matches will show up here...
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchedMovies;
