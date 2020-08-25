import React, { useGlobal, setGlobal, useEffect } from "reactn";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

// Relative Imports
import {
  Artifacts,
  Home,
  Hero,
  Heroes,
  Guides,
  StatCaps,
  PerkCalculator,
} from "Components";
import NavBar from "./NavBar";
import "./Components/styles/base.css";
import "./Components/styles/home.css";
import { Footer } from "Components";
import { createHelmet, ErrorHandler } from "Helpers";
import { ErrorState, INIT_BUILD } from "Constants";

// Amplify Settings
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

setGlobal({
  error: ErrorState,
  build: INIT_BUILD,
  tp: 95,
});

const Page = () => {
  const [error, setError] = useGlobal("error");

  const NotFound = () => {
    return (
      <div style={{ textAlign: "center", marginTop: "8rem" }}>
        <h1 style={{ marginBottom: "3rem" }}>Something went wrong!</h1>
        <NavLink to="/" onClick={() => setError("")}>
          Back to landing page
        </NavLink>
      </div>
    );
  };

  return (
    <>
      {createHelmet("Home", "frontpage", "./favicon")}
      <div id="pageContainer">
        <ErrorHandler />
        <BrowserRouter>
          <NavBar key={"components.js"} setError={setError} />

          <Switch>
            {/* <Route path="/heroes/Maya" component={Maya} /> */}
            <Route push={true} path="/heroes/:hero" component={Hero} />
            <Route path="/heroes" component={Heroes} />
            <Route path="/artifacts" component={Artifacts} />
            <Route path="/caps" component={StatCaps} />
            <Route exact path="/" component={Home} />
            <Route exact path="/guides" component={Guides} />
            <Route path="/perks/:hero?/:build?" component={PerkCalculator} />
            <Route path="/404" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

render(<Page />, document.getElementById("root"));
