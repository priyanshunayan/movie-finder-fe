import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filters from "./components/Filters";
import Home from "./components/Home";
import Movies from "./components/Movies";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/filters">
          <Filters />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/mo">
          <Movies />
        </Route>
        {/* This should be at the end */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
