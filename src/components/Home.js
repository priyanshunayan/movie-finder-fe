import React from "react";
import "../Home.css";

const Home = () => {
  return (
    <div className="pageBackground">
      <main className="container px-4 lg:px-8 mx-auto min-h-screen flex flex-wrap content-center max-w-5xl">
        <h1 className="text-3xl lg:text-5xl mb-4 lg:mb-6 z-10 text-white">
          <span className="font-bold">Find movies. </span> <br></br>
          <span className="font-light">Together.</span>
        </h1>
        <h2 className="text-lg lg:text-2xl mb-6 lg:mb-8 font-light max-w-5xl z-10 text-white">
          Decide what to watch by starting a movie finding session. Set your
          preferences and find movies your both like, together.
        </h2>
        <a
          href=""
          className="bg-gray-800 p-3 text-white rounded z-10 font-semibold"
        >
          Start now →
        </a>
      </main>
    </div>
  );
};

export default Home;
