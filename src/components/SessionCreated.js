import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { DEV_API_URL, SOCKET_URL } from "../config";
import { socket } from "../App";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SessionCreated = () => {
  const query = useQuery();
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [canJoin, setCanJoin] = useState(0);
  const [showCanJoinText, setShowCanJoinText] = useState(false);
  const session_id = query.get("session_id");

  /* Keep calling session_id every 2 seconds to check if started and navigate to movies*/

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/filters?session_id=${session_id}`
    );
    setIsCopied(!isCopied);

    if (!window.can_join_socket) {
      const can_join_socket = new WebSocket(
        `${SOCKET_URL}/can_join/${session_id}`
      );
      can_join_socket.onopen = function () {
        console.log("Can join Socket open.");
      };
      window.can_join_socket = can_join_socket;
    }
    window.can_join_socket.onmessage = function (message) {
      let data = JSON.parse(message.data);
      if (data.refresh && data.session_id === session_id) {
        setRefresh(1);
        history.push(`/movies?session_id=${session_id}`);
      }
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function callCanJoinApi() {
    fetch(`${DEV_API_URL}/has-joined/${session_id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.refresh) {
          setRefresh(1);
          setShowCanJoinText(false);
          history.push(`/movies?session_id=${session_id}`);
        } else {
          setShowCanJoinText(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 text-center pt-8 md:w-6/12">
        <p className="mt-8 mb-8 text-green-600 font-medium">
          ??? Session created
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
          {isCopied ? "??? Link copied" : "Copy link"}
        </button>
        {isCopied && (
          <div className="grid justify-items-center mt-8">
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
            <p className="animate-pulse mt-1">Waiting for them to join...</p>
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Share the link with whom you want to pick movies with. This page
              will automatically refresh, once they join.{" "}
            </p>
            <button
              onClick={callCanJoinApi}
              className="text-gray-500 text-sm mt-4 underline"
            >
              Taking too long? Refresh now
            </button>
            <div className="mt-4 text-sm">
              {showCanJoinText ? "The other person hasn't joined yet ?????????????????" : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCreated;
