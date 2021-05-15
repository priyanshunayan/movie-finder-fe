import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Badge from "@material-ui/core/Badge";
import Tab from "@material-ui/core/Tab";
import MatchedMovies from "./MatchedMovies";
import SwipeMovies from "./SwipeMovie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
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
    <div className="container w-9/12 mx-auto mt-4 overflow-hidden">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Movie Swapping and Matches"
        className="border-b-1 border-gray-300"
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
      </Tabs>
      <TabPanel value={value} index={0}>
        <SwipeMovies />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchedMovies />
      </TabPanel>
    </div>
  );
}
