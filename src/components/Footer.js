import React from "react";
var quotes = require("random-movie-quotes");

const Footer = () => {
  return (
    <footer className="text-center text-xs p-4 text-gray-400 bg-gray-50 py-16">
      <p>
        Thanks for stopping by <span className="text-red-600">♥</span>
      </p>
      <p className="mt-1">
        A little thing made by{" "}
        <a
          href="https://twitter.com/priyanshunayan"
          title="Priyanshu on Twitter"
          className="underline hover:no-underline"
        >
          @PriyanshuNayan{" "}
        </a>
        and{" "}
        <a
          href="https://twitter.com/kns008"
          title="Kamal on Twitter"
          className="underline hover:no-underline"
        >
          @kns008
        </a>
      </p>
      <p className="mt-1 md:w-6/12 mx-auto">» {quotes.getQuote()} «</p>
    </footer>
  );
};

export default Footer;
