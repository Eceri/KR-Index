import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";

import { HashRouter, Route } from "react-router-dom";

import Home from "./home";
import Artifact from "./Components/Artifacts/Artifact";

ReactDOM.render(
  <HashRouter>
    <div id="pageContainer">
      <div style={{ minHeight: "calc(100vh - 1.5rem)" }}>
        <Route path="/hero">
          <NavBar key={"components.js"} />
        </Route>
        <Route exact path="/" component={Home} />
        {/* <Route path="/artifacts" component={Artifact} /> */}
      </div>
      <div id={"footer"}>
        <p>
          Got Suggestions, found a mistake or wanna help out? Message me on
          Discord under Eceri@2547
        </p>
      </div>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
