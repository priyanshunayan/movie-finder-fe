import React, { useState } from "react";
import "./SwipeMovie.css";
import TinderCard from "react-tinder-card";

const movies = [
  {
    ImgUrl:
      "https://yts.mx/assets/images/movies/tiko_and_the_shark_1962/medium-cover.jpg",
  },
  {
    ImgUrl:
      "https://yts.mx/assets/images/movies/dont_sting_the_mosquito_1967/medium-cover.jpg",
  },
  {
    ImgUrl:
      "https://yts.mx/assets/images/movies/rita_the_mosquito_1966/medium-cover.jpg",
  },
  {
    ImgUrl:
      "https://yts.mx/assets/images/movies/the_montecarlo_story_1956/medium-cover.jpg",
  },
  {
    ImgUrl:
      "https://yts.mx/assets/images/movies/penelope_2018/medium-cover.jpg",
  },
  {
    ImgUrl: "https://yts.mx/assets/images/movies/sweetie_1989/medium-cover.jpg",
  },
];

const SwipeMovies = () => {
  const movieCards = movies;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <div className="cardContainer">
        {movieCards.map((movie) => (
          <TinderCard
            preventSwipe={["up", "down"]}
            className="swipe"
            key={movie.ImgUrl}
            onSwipe={(dir) => swiped(dir, movie.ImgUrl)}
            onCardLeftScreen={() => outOfFrame(movie.ImgUrl)}
          >
            <div
              style={{ backgroundImage: "url(" + movie.ImgUrl + ")" }}
              className="card"
            >
              {" "}
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 className="text-center mt-4">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="text-center mt-4" />
      )}
    </div>
  );
};

export default SwipeMovies;
