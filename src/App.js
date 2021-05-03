import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page from "./Page";

const App = () => {
  return (
    <Router>
      <Link to="/page">New Page </Link>
      <Link to="/"> Home</Link>
      <Switch>
        <Route path="/page">
          <Page />
        </Route>
        {/* This should be at the end */}
        <Route path="/">
          <h1>{"Welcome to Priyanshu 's boilerplate"}</h1>
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
