import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home";
import { Hero, Heroes, Maya, Artifacts, Etc } from "./Components/components";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import {createHelmet} from "./helpers/helpers.helmet"

render(
  <>
    {createHelmet("Home", "frontpage", "./favicon")}
    <div id="pageContainer">
      <BrowserRouter>
        <NavBar key={"components.js"} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/heroes/" component={Heroes} />
          <Route push={true} path="/heroes/:hero" component={Hero} />
          <Route path="/artifact/:artifact" component={Artifacts} />
          <Route path="/artifacts/" component={Artifacts} />
          <Route path="/etc" component={Etc} />
          <Route path="/Maya" component={Maya} />
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
          src="/GitHub-Mark-Light-32px.png"
          alt="github"
          style={{ border: "none" }}
        />
      </a>
    </footer>
  </>,
  document.getElementById("root")
);
