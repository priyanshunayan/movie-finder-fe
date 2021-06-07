import React, { useEffect, useState } from "react";
import { DEV_API_URL } from "../config";

const MatchedMovies = ({ session_id, updateMatchedCount }) => {
  const [matchedMovies, setMatchedMovies] = useState([]);

  useEffect(() => {
    fetch(`${DEV_API_URL}/matched-movies?session_id=${session_id}`)
      .then((res) => res.json())
      .then((res) => {
        setMatchedMovies(res.data);
        updateMatchedCount(res.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="p-2 bg-gray-100 border-b grid grid-flow-col gap-2 max-w-full overflow-x-scroll h-28 mb-8">
        {matchedMovies.length > 0 ? (
          matchedMovies.map((movie) => (
            <div
              key={movie.Poster_Link}
              style={{ backgroundImage: "url(" + movie.Poster_Link + ")" }}
              className="card shadow-sm bg-white rounded-sm relative w-16 h-24 bg-cover ring-1 ring-gray-100"
            >
              {" "}
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500 animate-pulse self-center">
            {" "}
            Your matches will show up here...
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchedMovies;
