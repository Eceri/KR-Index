import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home";
import { Hero, Heroes, Maya, Artifacts, Etc } from "./Components/components";
import NavBar from "./navBar";
import "./Components/styles/base.css";

render(
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
      <footer id={"footer"}>
        <p>Everything is under construction.</p>
      </footer>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
