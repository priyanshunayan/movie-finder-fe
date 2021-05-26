import React from "react";
import Header from "./Header";

const SessionCreated = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 text-center pt-8">
        <p className="mt-8 mb-8 text-green-800 font-medium">
          ✓ Session created
        </p>
        <p> Share this link with whom you would like to find movies with. </p>
        <input
          type="text"
          className="block border-2 p-2 my-4 mx-auto w-full select-all rounded max-w-xs"
          value="http://example.unique.url"
        />
        <button className="bg-gray-800 px-4 py-2 text-white rounded font-semibold">
          {" "}
          Copy link{" "}
        </button>
        <p className="mt-8 animate-pulse">Waiting for them to join...</p>
        <p className="mt-2 text-sm text-gray-500">
          {" "}
          This page will automatically refresh, once they join.{" "}
        </p>
      </div>
    </div>
  );
};

export default SessionCreated;
