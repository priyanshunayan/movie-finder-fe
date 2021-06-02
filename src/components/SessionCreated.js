import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "./Header";
import { DEV_API_URL } from "../config";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SessionCreated = () => {
  const query = useQuery();
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const session_id = query.get("session_id");

  /* Keep calling session_id every 2 seconds to check if started and navigate to movies*/

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/filters?session_id=${session_id}`
    );
    setIsCopied(!isCopied);
  };

  useEffect(() => {
    function callCanJoinApi() {
      fetch(`${DEV_API_URL}/has-joined/${session_id}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.refresh) {
            setRefresh(1);
            history.push(`/movies?session_id=${session_id}`);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    callCanJoinApi();
    const interval = setInterval(callCanJoinApi, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 text-center pt-8">
        <p className="mt-8 mb-8 text-green-600 font-medium">
          ✓ Session created
        </p>
        <p>Share this link to invite people...</p>
        <div
          type="text"
          className="bg-white block ring-1 p-2 my-4 mx-auto w-full select-all rounded-sm ring-gray-200 truncate text-sm"
          onClick={handleCopy}
        >
          {`${window.location.origin}/filters?session_id=${session_id}`}
        </div>
        <button
          className="bg-gray-800 px-4 py-2 text-white rounded-sm font-medium w-full"
          onClick={handleCopy}
        >
          {isCopied ? "✓ Link copied" : "Copy link"}
        </button>
        {isCopied && (
          <div>
            <p className="mt-8 animate-pulse">Waiting for them to join...</p>
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Share the link with whom you want to pick movies. This page will
              automatically refresh, once they join.{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCreated;
