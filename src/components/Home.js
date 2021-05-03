import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl text-gray-400">
        {"Welcome to Priyanshu 's boilerplate"}
      </h1>
      <ul className="mt-8 list-disc ml-8">
        <li>
          React Router - Click on <span className="font-bold">New Page</span> to
          go to new Page
        </li>
        <li>
          {" "}
          <span className="text-purple-700 text-opacity-75">Tailwind</span> CSS
        </li>
        <li>Live reloading</li>
        <li>
          {" "}
          <span className="text-red-700">Eslint </span>
        </li>
        <li>Prettier</li>
        <li>
          No config Bundler -{" "}
          <span className="text-yellow-700 text-opacity-75">Parcel</span>
        </li>
      </ul>
    </div>
  );
};

export default Home;
