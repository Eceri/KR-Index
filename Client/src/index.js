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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Heroes" component={Heroes} />
        <Route push={true} path="/heroes/:hero" component={Hero} />
        <Route path="/artifact/:artifact" component={Artifacts} />
        <Route path="/artifacts" component={Artifacts} />
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
