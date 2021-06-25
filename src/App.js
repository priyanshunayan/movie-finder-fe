import React, { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Filters from "./components/Filters";
import Home from "./components/Home";
import Movies from "./components/Movies";
import SessionCreated from "./components/SessionCreated";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SOCKET_URL } from "./config";

const App = () => {
  useEffect(() => {}, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/filters">
          <Filters />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/session-created">
          <SessionCreated />
        </Route>
        {/* This should be at the end */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

const socket = new WebSocket(`${SOCKET_URL}`);
window.socket = socket;

render(<App />, document.getElementById("root"));
