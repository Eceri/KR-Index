import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Relative Imports
import Home from "./home";
import { Hero, Heroes, Maya, Artifacts, Etc } from "./Components/components";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import { createHelmet } from "./helpers/helpers.helmet";

render(
  <>
    {createHelmet("Home", "frontpage", "./favicon")}
    <div id="pageContainer">
      <BrowserRouter>
        <NavBar key={"components.js"} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/heroes/Maya" component={Maya} />
          <Route push={true} path="/heroes/:hero" component={Hero} />
          <Route path="/heroes/" component={Heroes} />
          <Route path="/artifact/:artifact" component={Artifacts} />
          <Route path="/artifacts/" component={Artifacts} />
          <Route path="/etc" component={Etc} />
        </Switch>
      </BrowserRouter>
    </div>
    <footer id={"footer"}>
      <a
        href="https://github.com/Eceri/KR-Index"
        target="_blank"
        rel="noopener noreferrer"
        style={{ alignItems: "center" }}
      >
        <img
          src={`${require("Assets/icons/GitHub-Mark-Light-32px.png")}`}
          alt="github"
          style={{ border: "none" }}
        />
      </a>
    </footer>
  </>,
  document.getElementById("root")
);
