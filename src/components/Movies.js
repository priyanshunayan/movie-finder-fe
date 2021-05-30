import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Badge from "@material-ui/core/Badge";
import Tab from "@material-ui/core/Tab";
import MatchedMovies from "./MatchedMovies";
import SwipeMovies from "./SwipeMovie";
import Header from "./Header";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useTabStyles = makeStyles(() => ({
  root: {
    textTransform: "none",
  },
  wrapper: {
    color: "black",
  },
}));

export default function Movies() {
  const query = useQuery();
  const Tabclasses = useTabStyles();
  const [value, setValue] = useState(0);
  const [swipeMoviesActive, setSwipeMoviesActive] = useState(true);
  const [listMoviesActive, setlistMoviesActive] = useState(false);
  const session_id = query.get("session_id");
  const [totalMatched, setTotalMatched] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateMatchedCount = (count) => {
    setTotalMatched(count);
  };

  const swipeClicked = () => {
    setlistMoviesActive(false);
    setSwipeMoviesActive(true);
  };
  const matchesClicked = () => {
    setlistMoviesActive(true);
    setSwipeMoviesActive(false);
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="">
        {/* Can we use this tab instead of the one being used in comments? */}
        <div className="mx-4 mt-4 flex justify-center">
          <button
            className="bg-white inline-block mr-2 text-xs font-semibold border border-gray-600 rounded-full py-2 px-4"
            onClick={swipeClicked}
          >
            Swipe
          </button>
          <button
            className="bg-white inline-block text-xs border rounded-full py-2 px-4"
            onClick={matchesClicked}
          >
            Matches{" "}
            <span className="animate-pulse rounded-full bg-green-800 text-white h-4 w-4 p-2 inline-flex items-center justify-center font-semibold">
              {totalMatched}
            </span>
          </button>
        </div>

        {swipeMoviesActive && (
          <SwipeMovies
            session_id={session_id}
            updateMatchedCount={updateMatchedCount}
          />
        )}
        {listMoviesActive && (
          <MatchedMovies
            session_id={session_id}
            updateMatchedCount={updateMatchedCount}
          />
        )}
      </div>
    </div>
  );
}
