import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";

import { HashRouter, Route } from "react-router-dom";

import Home from "./home";

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <div id={"pageContainer"}>
      <Route path="/hero">
        <NavBar key={"components.js"} />
      </Route>
      <Route exact path="/" component={Home} />
      <div id={"footer"}>
        <p>
          Everything is under construction.
        </p>
      </div>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
