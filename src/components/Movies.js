import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Badge from "@material-ui/core/Badge";
import Tab from "@material-ui/core/Tab";
import MatchedMovies from "./MatchedMovies";
import SwipeMovies from "./SwipeMovie";
import Header from "./Header";

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
  const Tabclasses = useTabStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <p className="my-4 text-green-800 font-medium text-center text-sm">
        You are swiping with Phil.
      </p>
      <div className="">
        {/* Can we use this tab instead of the one being used in comments? */}
        <div className="mx-4 mt-4 flex justify-center">
          <button className="bg-white inline-block mr-2 text-xs font-semibold border border-gray-600 rounded-full py-2 px-4">
            Swipe
          </button>
          <button className="bg-white inline-block text-xs border rounded-full py-2 px-4">
            Matches{" "}
            <span className="animate-pulse rounded-full bg-green-800 text-white h-4 w-4 inline-flex items-center justify-center font-semibold">
              8
            </span>
          </button>
        </div>

        {/* <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Movie Swapping and Matches"
          className=""
        >
          <Tab
            label="Swipe"
            className={`${Tabclasses.root} ${Tabclasses.wrapper}`}
          />
          <Tab
            label="Matches"
            className={`${Tabclasses.root} ${Tabclasses.wrapper}`}
            icon={<Badge badgeContent={4} color="error" />}
          />
        </Tabs> */}
        <TabPanel value={value} index={0}>
          <SwipeMovies />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MatchedMovies />
        </TabPanel>
      </div>
    </div>
  );
}
