import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import Home from "./home";

ReactDOM.render(
  <BrowserRouter>
    <div id="pageContainer">
      <div style={{ minHeight: "calc(100vh - 1.5rem)" }}>
        <NavBar key={"components.js"} />
        <Route path="/hero" />
        <Route exact path="/" component={Home} />
        {/* <Route path="/artifacts" component={Artifact} /> */}
      </div>
      <div id={"footer"}>
        <p>Everything is under construction.</p>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
