import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import classNames from "classnames";
import like from "../like.svg";
import dislike from "../dislike.svg";

const SwipeMovies = () => {
  const [currentIndex, setIndex] = useState(0);
  const [style, setStyle] = useState("rounded mx-auto block");
  const [eventData, setEventData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const imageRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (currentIndex <= moviesArray.length - 2) {
        imageRef.current.classList?.add("translate-left");
        setIndex(currentIndex + 1);
      }
    },
    onSwipedRight: (eventData) => {
      if (currentIndex <= moviesArray.length - 2) {
        imageRef.current.classList?.add("translate-right");
        setIndex(currentIndex + 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    if (hasLoaded) {
      imageRef.current.classList?.remove("translate-left");
      imageRef.current.classList?.remove("translate-right");
    }
  }, [hasLoaded, currentIndex]);

  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    imageRef.current = el;
  };

  const handleLoad = (bool) => {
    setHasLoaded(bool);
  };

  const moviesArray = [
    "https://yts.mx/assets/images/movies/tiko_and_the_shark_1962/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/dont_sting_the_mosquito_1967/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/rita_the_mosquito_1966/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/the_montecarlo_story_1956/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/malcolm_1986/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/rita_la_figlia_americana_1965/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/penelope_2018/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/tout_va_bien_1972/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/sweetie_1989/medium-cover.jpg",
    "https://yts.mx/assets/images/movies/the_underneath_1995/medium-cover.jpg",
  ];

  return (
    <div className="mt-4 overflow-hidden">
      <img
        {...handlers}
        ref={refPassthrough}
        src={moviesArray[currentIndex]}
        className={style}
        width={200}
        height={300}
        onLoad={() => handleLoad(true)}
      />
      <div className="flex mt-8">
        <img src={dislike} width={50} height={50} />
        <img src={like} width={50} height={50} className="ml-auto" />
      </div>
    </div>
  );
};

export default SwipeMovies;
