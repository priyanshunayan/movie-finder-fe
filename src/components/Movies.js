import React, { useState, useEffect } from "react";
import MatchedMovies from "./MatchedMovies";
import SwipeMovies from "./SwipeMovie";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Movies() {
  const query = useQuery();
  const session_id = query.get("session_id");
  const [, setTotalMatched] = useState(0);

  const updateMatchedCount = (count) => {
    setTotalMatched(count);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <MatchedMovies
          session_id={session_id}
          updateMatchedCount={updateMatchedCount}
        />
        <SwipeMovies
          session_id={session_id}
          updateMatchedCount={updateMatchedCount}
        />
      </div>
    </div>
  );
}
