import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import heroImage from "../assets/images/hero.png";
import "../assets/css/Home.css";

const Home = () => {
  return (
    <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div>
              <img className="h-11 w-auto" src={logo} alt="Workflow" />
            </div>
            <div className="mt-12">
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Find movies to watch. Together. <em>Faster.</em>
                </h1>
                <p className="mt-6 text-xl text-gray-500">
                  Decide what to watch by starting a movie finding session. Set
                  your preferences and find movies together, faster.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                className="inline-block rounded-md border border-transparent px-5 py-3 bg-gray-800 text-base font-medium text-white shadow hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 sm:px-10"
                to="/filters"
              >
                Try now
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div>
            <div className="relative lg:-ml-16 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full">
              <img
                className="w-full rounded-md lg:h-full lg:w-auto lg:max-w-none"
                src={heroImage}
                alt="FilmFinder.app Illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
