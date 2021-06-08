import React from "react";
import logo from "../assets/images/logo.svg";

const Header = () => {
  return (
    <div className="border-b bg-white bg-opacity-75 sticky top-0 backdrop-filter backdrop-blur-xl backdrop-saturate-150 z-50">
      <div className="container mx-auto p-4">
        <a
          className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-gray-800 flex items-center"
          href="/"
          title="Back to FilmFinder.app home"
        >
          <img src={logo} title="FilmFinder Logo" />
          <span className="ml-1 md:ml-2">FilmFinder.app</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
