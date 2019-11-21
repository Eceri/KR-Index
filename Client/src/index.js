import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Hero, Heroes, Maya, Artifacts, Etc } from "./Components/components";
import Home from "./home";

ReactDOM.render(
  <div id="pageContainer">
    <BrowserRouter>
      <NavBar key={"components.js"} />
      <Route path="/hero" />
      <Route exact path="/" component={Home} />
      <Switch>
        <Route push={true} path="/hero/:hero" component={Hero} />
        <Route path="/artifact/:artifact" component={Artifacts} />
        <Route path="/artifacts" component={Artifacts} />
        <Route path="/etc" component={Etc} />
        <Route path="/Maya" component={Maya} />
        <Route path="/Heroes" component={Heroes} />
      </Switch>
      <footer id={"footer"}>
        <p>Everything is under construction.</p>
      </footer>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
