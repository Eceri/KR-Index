import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";

import { BrowserRouter, Route } from "react-router-dom";

import Home from "./home";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div id={"pageContainer"}>
      <Route path="/hero">
        <NavBar key={"components.js"} />
      </Route>
      <Route exact path="/" component={Home} />
      <div id={"footer"}>footer</div>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
