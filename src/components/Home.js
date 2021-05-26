import React from "react";
import { Link } from "react-router-dom";
import Illustration from "../assets/images/illustration.svg";
import "../assets/css/Home.css";

const Home = () => {
  return (
    <div className="pageBackground">
      <main className="container px-4 lg:px-8 mx-auto min-h-screen flex flex-wrap content-center max-w-5xl">
        <img src={Illustration} className="mb-8 w-48 block" />
        <div>
          <h1 className="text-3xl lg:text-5xl mb-4 lg:mb-6 z-10 tracking-tight">
            <span className="font-bold block lg:mb-2">
              Find movies to watch.
            </span>
            <span>Together.</span>
          </h1>
          <h2 className="text-lg lg:text-2xl mb-6 lg:mb-8 max-w-5xl z-10 tracking-tight lg:leading-relaxed">
            Decide what to watch by starting a movie finding session. Set your
            preferences and find movies your both like, together.
          </h2>
        </div>

        <Link
          to="/filters"
          className="bg-gray-800 px-4 py-2 text-white rounded z-10 font-semibold lg:text-lg"
        >
          Start a session
        </Link>
      </main>
    </div>
  );
};

export default Home;
