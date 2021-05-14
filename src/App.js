import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filters from "./components/Filters";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      {/* <div className="container text-center my-4">
        <Link
          to="/page"
          className="text-blue-800 text-center pr-8 hover:text-blue-400"
        >
          New Page{" "}
        </Link>
        <Link to="/" className="text-blue-800 text-center hover:text-blue-400">
          {" "}
          Home
        </Link>
      </div> */}

      <Switch>
        <Route path="/filters">
          <Filters />
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
