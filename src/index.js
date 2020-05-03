import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ExternalRedirect } from "./redirect";
import { heroes } from "./heroes";
import { artifacts } from "./artifacts";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/heroes/:hero" component={heroes} />
        <Route path="/heroes" component={heroes} />
        <Route path="/artifacts/:artifact" component={artifacts} />
        <Route path="/artifacts" component={artifacts} />
        <Route exact path="/" component={ExternalRedirect} />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
