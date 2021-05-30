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
      <div className="mt-4 w-full flex justify-center flex-wrap">
        {matchedMovies.length > 0 ? (
          matchedMovies.map((movie) => (
            <div
              key={movie.Poster_Link}
              style={{ backgroundImage: "url(" + movie.Poster_Link + ")" }}
              className="card bg-white rounded-lg shadow-md relative w-32 h-48 bg-cover m-2"
            >
              {" "}
            </div>
          ))
        ) : (
          <div>
            <div className="text-center"> There are no matches yet 🙇🏻‍♂️ </div>
            <div className="text-center pt-4"> Keep swiping 🎸 </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedMovies;
